package com.example.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    
}
