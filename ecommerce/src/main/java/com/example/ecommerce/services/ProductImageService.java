package com.example.ecommerce.services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.ProductImageDTO;

public interface ProductImageService {

    ResponseEntity<ProductImageDTO> addImageToProductService(Long productId, MultipartFile imageProductDTO);

    ResponseEntity<List<ProductImageDTO>> getProductImagesService(Long productId);

    ResponseEntity<APIResponse> deleteImageService(Long imageId);

    ResponseEntity<ProductImageDTO> updateImageProductService(Long imageId, MultipartFile newProductImage);

    
} 