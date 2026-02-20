package com.example.ecommerce.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.payload.APIResponse;

@RestController
public class TestController {
    
    @GetMapping("/")
    public ResponseEntity<APIResponse> testServer(){
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Server is running.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse,HttpStatus.OK);
    }
}
