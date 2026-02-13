package com.example.ecommerce.controllers;

import org.springframework.http.HttpHeaders;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.ecommerce.exceptions.APIException;
import com.example.ecommerce.models.AppRole;
import com.example.ecommerce.models.PasswordResetToken;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.LoginRequest;
import com.example.ecommerce.payload.LoginResponse;
import com.example.ecommerce.payload.ResetPasswordDTO;
import com.example.ecommerce.payload.SignupRequest;
import com.example.ecommerce.repository.PasswordResetTokenRepo;
import com.example.ecommerce.repository.RoleRepo;
import com.example.ecommerce.repository.UserRepo;
import com.example.ecommerce.security.jwt.JwtUtils;
import com.example.ecommerce.security.services.UserDetailsImpl;
import com.example.ecommerce.services.EmailService;

import jakarta.validation.Valid;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/v2/auth")
public class AuthController {

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepo;

    @Value("${frontend-url}")
    private String frontendUrl;

    @PostMapping("/login")
    public ResponseEntity<?> loginMedthod(@RequestBody @Valid LoginRequest loginRequest) {
        Authentication authentication;
        try {
            User user = userRepo.findByEmail(loginRequest.getEmail());
            if (user == null) {
                throw new APIException("No User with this email.");
            }
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            loginRequest.getPassword()));

        } catch (AuthenticationException e) {
            APIResponse apiResponse = new APIResponse();
            apiResponse.setMessage("Password incorrect.");
            apiResponse.setStatus(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie responseCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
        LoginResponse loginResponse = new LoginResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(loginResponse);

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupRequest signupRequest) {

        if (userRepo.existsByUsername(signupRequest.getUsername())) {
            throw new APIException("User name Already used");
        }
        if (userRepo.existsByEmail(signupRequest.getEmail())) {
            throw new APIException("Email Already used");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(encoder.encode(signupRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByRoleName(AppRole.ROLE_USER);
        roles.add(userRole);
        user.setUserRoles(roles);
        userRepo.save(user);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("user registered successfly.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // getting using data :
    @GetMapping("/user")
    public ResponseEntity<?> currentUserName(Authentication authentication) {
        if (authentication != null) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            LoginResponse loginResponse = new LoginResponse(
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        }
        return null;
    }

    // logout
    @PostMapping("/logout")
    public ResponseEntity<?> logoutMethod() {
        ResponseCookie cookie = jwtUtils.getCleanCookie();
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("You've been logout.");
        apiResponse.setStatus(true);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(apiResponse);
    }

    // forget password :
    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam(name="email") String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new APIException("No user with this email.");
        }
        PasswordResetToken passwordResetToken = passwordResetTokenRepo.findByUser(user);
        if(passwordResetToken == null){
            passwordResetToken = new  PasswordResetToken();
        }
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        String token = jwtUtils.generateTokenFromUserName(userDetails.getUsername());
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpireDate(LocalDateTime.now().plusMinutes(15));

        passwordResetTokenRepo.save(passwordResetToken);

        String resetLink = frontendUrl + "/auth?mode=reset&token=" + token;
        emailService.sendEmail(user.getEmail(),
         "Reset Your Password",
            "Hello " + user.getUsername() + ",\n\n"
            + "We received a request to reset your password. "
            + "Click the link below to reset it (valid for 15 minutes):\n"
            + resetLink + "\n\n"
            + "If you didn’t request a password reset, please ignore this email.");
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Password reset link has been sent to your email.");
        apiResponse.setStatus(true);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


    // reset password :
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestBody ResetPasswordDTO resetPasswordDTO) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepo.findByToken(token);
        if (passwordResetToken == null || passwordResetToken.getExpireDate().isBefore(LocalDateTime.now())) {
            throw new APIException("Invalid or expired token.");
        }

        User user = passwordResetToken.getUser();
        user.setPassword(encoder.encode(resetPasswordDTO.getNewPassword()));
        userRepo.save(user);
        passwordResetTokenRepo.delete(passwordResetToken);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Password has been reset successfully.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);


    }
    // google auth2.0

    @GetMapping("/oauth2/google/url")
    public ResponseEntity<?> getGoogleOAuth2Url(){
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();
        String googleOAuth2Url = baseUrl + "/oauth2/authorization/google";
          
        Map<String, Object> response = new HashMap<>();
        response.put("url", googleOAuth2Url);
        response.put("method", "GET");
        response.put("description", "Redirect user to this URL to initiate Google OAuth2 login");
        response.put("note", "After successful authentication, JWT token will be stored in HTTP-only cookie");
        
        return ResponseEntity.ok(response);
    
    
    
    }
    

}
