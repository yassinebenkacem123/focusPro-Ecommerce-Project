package com.example.ecommerce.payload;

import com.example.ecommerce.config.SellerStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerInfo {
    private Long sellerId;
    private String sellerName;
    private String sellerEmail;
    private String  shopName;
    private SellerStatus sellerStatus;
    private double sellerRating;
    private Long sellerSales;
    private int totalProducts;
}
