package com.example.ecommerce.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.ecommerce.exceptions.APIException;


@Service
public class CloudinaryServiceImplt implements CloudinaryService{

    @Autowired 
    private Cloudinary cloudinary;

    @Override
    public Map uploadProductImage(MultipartFile file, String productName){
        try{
            String folderName = "products/" + productName.toLowerCase().replace(" ", "-");
            return cloudinary.uploader().upload(
                file.getBytes(),
                Map.of(
                    "folder",folderName,
                    "resource_type","image"
                )
            );
            

        }catch(IOException e){
            throw new APIException("Failed to upload image to Cloudinary: " + e.getMessage().toString());

        }

    }

    @Override
    public void deleteImageFromCloudaniry(String publicId) {
        try{
            cloudinary.uploader().destroy(publicId, Map.of());
        }catch(IOException e){
            throw new APIException("Failded to delete image from Cloudinary:  "+e.getMessage());
        }
    }
}
