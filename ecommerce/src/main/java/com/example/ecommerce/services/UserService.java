package com.example.ecommerce.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.payload.UserDTO;

public interface UserService {

    public ResponseEntity<?> updateUserInfo(UserDTO userDTO, Long userId);

    public ResponseEntity<?> updateUserImage(MultipartFile image, Long userId, String imageUrl);

    ResponseEntity<?> getUserProfile(Long userId);
}
