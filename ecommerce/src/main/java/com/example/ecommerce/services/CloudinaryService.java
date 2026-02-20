package com.example.ecommerce.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    
    public Map<String, String> uploadProductImage(MultipartFile file, String productName);

    public void deleteImageFromCloudaniry(String publicId);

}
