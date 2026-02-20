package com.example.ecommerce.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    public String getImagePathName(String pathRoot,MultipartFile image) throws IOException;
    
} 