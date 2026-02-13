package com.example.ecommerce.services;


import org.springframework.http.ResponseEntity;

import com.example.ecommerce.models.Category;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.CategoryDTO;
import com.example.ecommerce.payload.CategoryResponse;

public interface CategoryService {

    // get all categories :
    public ResponseEntity<CategoryResponse> getAllCategories(
        Integer pageNumber, 
        Integer pageSize, 
        String sortBy, 
        String sortOrder
    );

    // get category by Id:
    public ResponseEntity<Category> getCategoryById(Long categoryId);

    // post category :
    public ResponseEntity<APIResponse> addNewCategory(CategoryDTO newCategoryDto);

    // delete category :
    public ResponseEntity<APIResponse> deleteCategory(Long categoryId);

    // update category :
    public ResponseEntity<APIResponse> updateCategory(Long categoryId, CategoryDTO categorydDto);
}
