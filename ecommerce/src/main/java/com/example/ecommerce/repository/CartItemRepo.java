package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.ecommerce.models.CartItem;

public interface CartItemRepo  extends JpaRepository<CartItem, Long>{

    @Query("select ci from CartItem ci where ci.cart.cartId = ?1 and  ci.product.productId = ?2")
    CartItem findByCartIdAndProductId(Long cartId, Long productId);

    @Modifying
    @Query("delete from CartItem ci where ci.cart.cartId = ?1 and  ci.product.productId = ?2")
    void deleteCartItemByProductIdAndCartId(Long cartId, Long productId);
    
}
