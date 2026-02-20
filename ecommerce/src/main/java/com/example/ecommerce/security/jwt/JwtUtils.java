package com.example.ecommerce.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import com.example.ecommerce.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
    // the logger for debugging :
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // variables
    @Value("${spring.app.jwtExpirationTimeMs}")
    private int jwtExpirationTimeMs;
    @Value("${spring.app.jwtSecretKey}")
    private String jwtSecretKey;

    @Value("${spring.app.jwtCookie}")
    private String jwtCookie;

    // get jwt from header :
    // public String getJwtFromHeader(HttpServletRequest request) {
    //     String bearerToken = request.getHeader("Authorization");
    //     logger.debug("Authorization Token: {}", bearerToken);
    //     if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
    //         return bearerToken.substring(7);
    //     }
    //     return null;
    // }

    // get jwt from cookies :
    public String getJwtFromCookies(HttpServletRequest request){
        Cookie cookies = WebUtils.getCookie(request, jwtCookie);
        if(cookies != null)
        {
            return cookies.getValue();
        }else {
            return null;
        }
    }


    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetails){
        String jwt = this.generateTokenFromUserName(userDetails.getUsername());
        ResponseCookie cookie = ResponseCookie.from(jwtCookie,jwt)
            .path("/api")
            .httpOnly(false)
            .maxAge(24*60*60)
            .build();

        return cookie;
    }
   
    public ResponseCookie getCleanCookie(){
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null)
            .path("/api")
            .build();
        return cookie;
    }

    // generate jwt token from username :
    public String generateTokenFromUserName(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + jwtExpirationTimeMs))
                .signWith(key())
                .compact();
    }

    // get username from jwt token :
    public String getUserNameFromJwt(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // generate secret key
    private SecretKey key() {
        byte[] keyBytes = jwtSecretKey.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("spring.app.jwtSecretKey must be at least 32 characters for HS256");
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // validate jwt token
    public boolean validateJwtToken(String token) {
        try {
            System.out.print("Validate");
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(token);
            return true;

        } catch (ExpiredJwtException e) {
            logger.error("Jwt is expired : {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalide Jwt format : {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Jwt token is unsupported : {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Jwt claims string is empty :  {}", e.getMessage());
        }
        return false;
    }

}
