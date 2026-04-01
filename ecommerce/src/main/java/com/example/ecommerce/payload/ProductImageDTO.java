package com.example.ecommerce.payload;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageDTO {
    private Long imageId;
    private String imageUrl;
    private String publicId;
    private APIResponse apiResponse;
}
