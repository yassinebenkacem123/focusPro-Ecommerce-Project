package com.example.ecommerce.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.config.AppConstants;
import com.example.ecommerce.payload.ProductDTO;
import com.example.ecommerce.services.ProductService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController

@RequestMapping("/api/v2")
public class ProductController {

    @Autowired
    ProductService productService;

    // add a new product : 
    @PostMapping("/admin/categories/{categoryId}/addProduct")
    public ResponseEntity<?> addNewProduct(
        @RequestBody @Valid ProductDTO productDTO, 
        @PathVariable(name = "categoryId") Long categoryId
    ){
        return productService.addNewProduct(productDTO, categoryId);
    }

    // get all products : 
    @GetMapping("/public/getAllProducts")
    public ResponseEntity<?> getAllProducts(
        @RequestParam(
            name="pageSize",
            required = false,
            defaultValue = AppConstants.PAGE_SIZE
        ) Integer pageSize,
        @RequestParam(
            name="pageNumber",
            required = false,
            defaultValue = AppConstants.PAGE_NUMBER
        ) Integer pageNumber,
        @RequestParam(
            name="sortBy",
            required = false,
            defaultValue = "productId"
        ) String sortBy,
        @RequestParam(
            name="sortOrder",
            required = false,
            defaultValue = AppConstants.SORT_DIR
        ) String sortOrder
    ){
        return productService.getAllProduct(pageNumber, pageSize, sortBy, sortOrder);
    }
    

    // get product by category :
    @GetMapping("/public/getProductByCategory/{categoryId}")
    public ResponseEntity<?> getProductByCategory(
        @PathVariable Long categoryId,
        @RequestParam(
            name="pageSize",
            required = false,
            defaultValue = AppConstants.PAGE_SIZE
        ) Integer pageSize,
        @RequestParam(
            name="pageNumber",
            required = false,
            defaultValue = AppConstants.PAGE_NUMBER
        ) Integer pageNumber,
        @RequestParam(
            name="sortBy",
            required = false,
            defaultValue = "productId"
        ) String sortBy,
        @RequestParam(
            name="sortOrder",
            required = false,
            defaultValue = AppConstants.SORT_DIR
        ) String sortOrder
    ){
        return productService.getProductByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
    }

    // get product by keyword :
    @GetMapping("/public/product/keyword/{keyword}")
    public ResponseEntity<?> getProductByKeyword(
        @PathVariable String keyword,
        @RequestParam(
            name="pageSize",
            required = false,
            defaultValue = AppConstants.PAGE_SIZE
        ) Integer pageSize,
        @RequestParam(
            name="pageNumber",
            required = false,
            defaultValue = AppConstants.PAGE_NUMBER
        ) Integer pageNumber,
        @RequestParam(
            name="sortBy",
            required = false,
            defaultValue = "productId"
        ) String sortBy,
        @RequestParam(
            name="sortOrder",
            required = false,
            defaultValue = AppConstants.SORT_DIR
        ) String sortOrder
    ){
        return productService.searchForProductByKeyword(keyword, pageNumber, pageSize, sortBy, sortOrder);

    }

    // update product : 
    @PutMapping("/admin/updateProduct/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO product) {
        return productService.updateProduct(productId, product);
    }

    // delete product :
    @DeleteMapping("/admin/deleteProduct/{productId}")
    public ResponseEntity<?> deletedProduct(@PathVariable Long productId){
        return productService.deleteProductService(productId);
    }

    // update product image : 
    @PutMapping("/admin/updateProduct/image/{productId}")
    public ResponseEntity<?> updateProductImage(
        @PathVariable Long productId, 
        @RequestParam(name="image") MultipartFile image
    ) throws IOException{
        return productService.updateProductImageService(productId, image) ;
    }

    
}

