package com.example.ecommerce.services;

import java.util.Map;

import com.example.ecommerce.payload.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.UserDTO;
import com.example.ecommerce.repository.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImplt implements  UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CloudinaryService cloudinaryService;


    @Transactional
    @Override
    public ResponseEntity<APIResponse> updateUserInfo(UserDTO userDTO, Long userId) {
        User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "userId", userId));
        if(userDTO.getUsername() !=null) user.setUsername(userDTO.getUsername());
        if(userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());
        if(userDTO.getGender() != null) user.setGender(userDTO.getGender());
        if(userDTO.getPhoneNumber() != null) user.setPhoneNumber(userDTO.getPhoneNumber());
        if(userDTO.getDateOfBirth() != null) user.setDateOfBirth(userDTO.getDateOfBirth());

        userRepo.save(user);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("User updated successeflly.");
        apiResponse.setStatus(true);

        return ResponseEntity.ok().body(apiResponse); 
    }

    @Override
    public ResponseEntity<?> updateUserImage(MultipartFile image, Long userId, String imageUrl) {
        try {
            User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","userId",userId));
            String finalImageUrl;
            if(image != null && !image.isEmpty()){
                Map uploadResult = cloudinaryService.uploadUserImage(image, userId);

                finalImageUrl = uploadResult.get("secure_url").toString();
            }
            else if(imageUrl != null && !imageUrl.isEmpty()){
                finalImageUrl = imageUrl;
            }else {
                APIResponse apiResponse = new APIResponse();
                apiResponse.setMessage("No image provided.");
                apiResponse.setStatus(false);
                return ResponseEntity.badRequest().body(apiResponse);
            }
            user.setImageUrl(finalImageUrl);
            userRepo.save(user);
            APIResponse apiResponse = new APIResponse();
            apiResponse.setMessage("User image updated successfully.");
            apiResponse.setStatus(true);
            return ResponseEntity.ok().body(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());

        }


    }

    @Override
    public ResponseEntity<UserData> getUserProfile(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","userId", userId));
        UserData userData = new UserData();
        userData.setUsername(user.getUsername());
        userData.setEmail(user.getEmail());
        userData.setPhoneNumber(user.getPhoneNumber());
        userData.setImageUrl(user.getImageUrl());
        userData.setGender(user.getGender());
        userData.setDateOfBirth(user.getDateOfBirth());
        userData.setUserAddresses(user.getUserAddresses());
        return ResponseEntity.ok().body(userData);

    }
}



