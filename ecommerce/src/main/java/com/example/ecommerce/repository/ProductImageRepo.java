package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.ProductImage;

@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage, Long> {

    @Query("Select pi from ProductImage pi where pi.product.productId = ?1")
    List<ProductImage> findByProductId(Long productId);
    
}
