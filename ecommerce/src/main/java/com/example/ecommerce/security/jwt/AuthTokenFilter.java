package com.example.ecommerce.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.ecommerce.security.services.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class AuthTokenFilter extends OncePerRequestFilter{

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, 
            HttpServletResponse response, 
            FilterChain filterChain)
            throws ServletException, IOException {

        try{
            logger.debug("Getting the jwt from the header");
            String token = jwtUtils.getJwtFromCookies(request);
            if(token != null && jwtUtils.validateJwtToken(token)){
                String username = jwtUtils.getUserNameFromJwt(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                // now we need to create authentifaction object.
                UsernamePasswordAuthenticationToken authentification = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
                authentification.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authentification);
                logger.debug("roles from jwt {}", userDetails.getAuthorities());
            }
        }catch(Exception e){
            logger.error("Token is Not valid {}", e.getMessage());
        }filterChain.doFilter(request, response);
    }

    
}
