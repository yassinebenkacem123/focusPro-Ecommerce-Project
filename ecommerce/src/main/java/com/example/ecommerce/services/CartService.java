package com.example.ecommerce.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.CartDTO;

import jakarta.transaction.Transactional;

public interface CartService {

    ResponseEntity<?> addProductToCartService(Long productId, Integer quantity);

    ResponseEntity<List<CartDTO>> getAllCartsService();

    ResponseEntity<CartDTO> getUserCartsService();

    @Transactional
    ResponseEntity<CartDTO> updateCartItemQuantity(Long productId, Integer quantity);

    ResponseEntity<APIResponse> deleteProductFromCartSerivce(Long cartId, Long productIdLong);

    void updateProductInCarts(Long cartId, Long productId);

    
}