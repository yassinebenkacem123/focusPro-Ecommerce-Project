package com.example.ecommerce.security.services;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import com.example.ecommerce.models.User;
import com.example.ecommerce.security.jwt.JwtUtils;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;

@Data
@Service
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImplt;

    
    @Autowired
    private JwtUtils jwtUtils;

    @Value("${frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();
        Map<String, Object> attributes = oauthUser.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String imageUrl = (String) attributes.get("picture");
        String providerId = (String) attributes.get("sub");

        User user = userDetailsServiceImplt.processOAuthUser(email, name, imageUrl, providerId);

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        response.addHeader("Set-Cookie", jwtCookie.toString());

        String redirectUrl = frontendUrl + "/auth?oauth2=success";
        String username = user.getUsername();
        if (username != null && !username.isBlank()) {
            redirectUrl += "&username=" + URLEncoder.encode(username, StandardCharsets.UTF_8);
        }
        response.sendRedirect(redirectUrl);
    }

}
