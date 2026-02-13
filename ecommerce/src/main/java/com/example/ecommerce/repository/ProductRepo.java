package com.example.ecommerce.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>{

    Page<Product> findByCategoryOrderByPriceAsc(Category category, Pageable pageDetails);

    Page<Product> findByProductNameLikeIgnoreCase(String string, Pageable pageDetails);

    Product findByProductName(String productName);

  
} 