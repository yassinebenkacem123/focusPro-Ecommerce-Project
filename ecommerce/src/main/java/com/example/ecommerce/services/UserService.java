package com.example.ecommerce.services;

import org.springframework.http.ResponseEntity;

import com.example.ecommerce.payload.UserDTO;

public interface UserService {

    public ResponseEntity<?> updateUserInfo(UserDTO userDTO, Long userId);
    
}
