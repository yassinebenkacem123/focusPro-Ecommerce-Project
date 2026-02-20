package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.models.Category;

public interface CategoryRepo extends JpaRepository<Category,Long>{

    Category findByCategoryName(String categoryName);

}
