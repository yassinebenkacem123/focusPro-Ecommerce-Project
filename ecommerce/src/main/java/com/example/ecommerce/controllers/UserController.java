package com.example.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.payload.UserDTO;
import com.example.ecommerce.services.UserService;
import com.example.ecommerce.utils.AuthUtils;

@RestController
@RequestMapping("/api/v2")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private AuthUtils authUtils;
    // update the user account :
    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO){
        return userService.updateUserInfo(userDTO, authUtils.loggedInUserId());   
    }
    
    
}