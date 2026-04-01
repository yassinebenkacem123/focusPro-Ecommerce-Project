package com.example.ecommerce.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriesStatsDTO {
    private long categoryId;
    private String categoryName;
    private Long numberProducts;
    private Double rating;
    private Long numberSellingProducts;
}
