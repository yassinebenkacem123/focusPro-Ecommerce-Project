package com.example.ecommerce.services;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.ProductDTO;
import com.example.ecommerce.payload.ProductResponse;

public interface ProductService {
    // add new product.
    public ResponseEntity<APIResponse> addNewProduct(ProductDTO productDTO, Long categoryId);

    // get all products.
    public ResponseEntity<ProductResponse> getAllProduct(
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String orderBy
    );

    // get product by category.
    public ResponseEntity<ProductResponse> getProductByCategory(
        Long categoryId,
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String orderBy
    );

    // search product by keyword
    public ResponseEntity<ProductResponse> searchForProductByKeyword(
        String keyword,
        Integer pageNumber,
        Integer pageSize,
        String sortBy,
        String orderBy
    );

    // update product 
    public ResponseEntity<APIResponse>  updateProduct(Long productId, ProductDTO product);

    // delete product :
    public ResponseEntity<APIResponse> deleteProductService(Long productId);

    public ResponseEntity<APIResponse> updateProductImageService(Long productId, MultipartFile image)throws IOException;

    

}
