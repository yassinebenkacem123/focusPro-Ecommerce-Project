package com.example.ecommerce.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemDTO {
    private Long cartItemId;
    private Integer quantity;
    private Double discounte;
    private Double price;
    private CartDTO cart; // as ids.
    private ProductDTO product; // as refrence.
}
