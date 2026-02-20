package com.example.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.services.CartService;

@RestController
@RequestMapping("/api/v2")
public class CartController {


    @Autowired 
    CartService cartService;


    // add product to a cart by authenticated user :
    @PostMapping("/cart/product/{productId}/quantity/{quantity}")
    public ResponseEntity<?> addProductToCart(
        @PathVariable Long productId,
        @PathVariable Integer quantity
    ){
        return cartService.addProductToCartService(productId, quantity);
    }

    // get all  carts :
    @GetMapping("/admin/carts")
    public ResponseEntity<?> getAllCarts(){
        return cartService.getAllCartsService();
    }

    // fetching user cart :
    @GetMapping("/carts/user")
    public ResponseEntity<?> getUserCarts(){
        return cartService.getUserCartsService();

    }

    // updating the cartItem quantity : (test (no))
    @PutMapping("/updateCart/product/{productId}/quantity/{operation}")
    public ResponseEntity<?> updateCartProduct(
        @PathVariable Long productId, 
        @PathVariable String operation
    ){
        Integer quantity = operation.equalsIgnoreCase("delete") ? -1 : 1 ;
        
        return cartService.updateCartItemQuantity(productId, quantity);
    }


    // delete product from cart :
    @DeleteMapping("/cart/{cartId}/product/{productId}")
    public ResponseEntity<?> deleteProductFromCart(
        @PathVariable Long cartId,
        @PathVariable Long productId
    ){
        return cartService.deleteProductFromCartSerivce(cartId,productId);
    }

}
