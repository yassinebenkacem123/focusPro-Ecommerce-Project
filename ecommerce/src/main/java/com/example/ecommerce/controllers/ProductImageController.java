package com.example.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.services.ProductImageService;


@RestController
@RequestMapping("/api/v2")
public class ProductImageController {
    
    @Autowired
    ProductImageService productImageService;
    
    // add image to the product : 
    @PostMapping("/product/{productId}/image")
    public ResponseEntity<?> addImageToProduct(
        @PathVariable Long productId, 
        @RequestParam MultipartFile productImage
    ){

        return productImageService.addImageToProductService(productId, productImage); 
    }

    

    // get the product images :
    @GetMapping("/product/{productId}/images")
    public ResponseEntity<?> getProductImages(@PathVariable Long productId){
        return productImageService.getProductImagesService(productId);
    }

    
    
    // put the product's image :
    @PutMapping("/product/image/{imageId}")
    public ResponseEntity<?> updateImageProduct(
        @PathVariable Long imageId, 
        @RequestParam(name = "newProductImage") MultipartFile newProductImage
    ){

        return productImageService.updateImageProductService(imageId, newProductImage); 
    }

    // delete product image :
    @DeleteMapping("/product/image/{imageId}")
    public ResponseEntity<APIResponse> deleteImage(@PathVariable Long imageId){
        return productImageService.deleteImageService(imageId);

    }


    
}
