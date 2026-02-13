package com.example.ecommerce.payload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    
    private Long productId;
    @NotBlank(message = "You must provide a product name.")
    @Size(min=2, message = "Product name must contain at least 2 caracters.")
    private String productName;

    private String productImage;
        
    @Size(min=10,max = 150, message = "Description size must be between 10 and 150.")
    private String description;
    
    @Min(value = 1, message = "Quantity must be at least 1.")    
    private Integer quantity;
    private Double price;
    private Double specialPrice;
    private Double discounte;

}
