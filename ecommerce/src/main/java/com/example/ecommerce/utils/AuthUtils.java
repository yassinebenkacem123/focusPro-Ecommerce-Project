package com.example.ecommerce.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.ecommerce.models.User;
import com.example.ecommerce.repository.UserRepo;

@Component
public class AuthUtils {
    @Autowired 
    UserRepo userRepo;

    public String loggedInEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(authentication.getName());
        if(user == null){
            throw new  UsernameNotFoundException("User Not Found");
        }
        return user.getEmail();
    }

    public User loggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(authentication.getName());
        if(user == null){
            throw new  UsernameNotFoundException("User Not Found");
        }
        return user;

    }

    public Long loggedInUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(authentication.getName());
        if(user == null){
            throw new  UsernameNotFoundException("User Not Found");
        }
        return user.getUserId();
    }
}
