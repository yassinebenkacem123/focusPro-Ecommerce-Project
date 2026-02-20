package com.example.ecommerce.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long categoryId;
    
    @NotBlank(message="You must provide a category Name.")
    @Size(min=3, message = "The category name must contains at least 3 caracters.")
    private String categoryName;
}
