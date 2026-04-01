package com.example.ecommerce.repository;

import com.example.ecommerce.payload.CategoriesStatsDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.models.Category;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category,Long>{

    Category findByCategoryName(String categoryName);

    @Query("""
        SELECT new com.example.ecommerce.payload.CategoriesStatsDTO(
            c.categoryId,
            c.categoryName,
            COUNT(DISTINCT p.productId),
            AVG(p.discount),
            COUNT(DISTINCT w.orderItemId)
        )
        FROM Category c
        LEFT JOIN c.categoryProducts p
        LEFT JOIN p.orderItems w
        GROUP BY c.categoryId, c.categoryName
        ORDER BY c.categoryName
    """)
    List<CategoriesStatsDTO> findCategoriesStats();
}
