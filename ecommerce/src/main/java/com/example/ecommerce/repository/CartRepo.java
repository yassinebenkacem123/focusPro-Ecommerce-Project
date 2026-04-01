package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.ecommerce.models.Cart;

public interface CartRepo extends JpaRepository<Cart, Long>{
   @Query("select c from Cart c where c.user.email = ?1")
    Cart findByUserEmail(String email);
   
   @Query("select c from Cart c JOIN FETCH c.cartItems ci JOIN FETCH ci.product p WHERE p.productId = ?1")
   List<Cart> findCartsByProductId(Long productId);
    
}