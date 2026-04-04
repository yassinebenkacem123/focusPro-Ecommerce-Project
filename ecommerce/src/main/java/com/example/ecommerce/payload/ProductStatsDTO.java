package com.example.ecommerce.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductStatsDTO {
    private int totalProducts;
    private double totalInventoryValue;
    private int productsInStock;
    private int productsOutOfStock;
}
