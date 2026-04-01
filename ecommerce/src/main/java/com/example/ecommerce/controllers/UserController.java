package com.example.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    // update user image
    @PutMapping("/user/image")
    public ResponseEntity<?> updateUserImage(
        @RequestParam(name="image", required=false) MultipartFile image,
        @RequestParam(name="imageUrl", required=false) String imageUrl
    ){
        return userService.updateUserImage(image, authUtils.loggedInUserId(), imageUrl);
    }
    // get user profile info
    @GetMapping("/user/profile")
    public ResponseEntity<?> getUserProfile(){
        return userService.getUserProfile(authUtils.loggedInUserId());
    }
    
}