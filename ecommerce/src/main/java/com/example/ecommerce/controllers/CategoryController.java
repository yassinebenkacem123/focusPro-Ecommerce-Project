package com.example.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.config.AppConstants;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.CategoryDTO;
import com.example.ecommerce.services.CategoryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v2")
public class CategoryController {

    @GetMapping("/test")
    public ResponseEntity<APIResponse> testServer(){
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Server is running.");
        apiResponse.setStatus(true);
        return ResponseEntity.ok().body(apiResponse);
    }

    // Calling the category service :
    @Autowired
    private CategoryService categoryService;

    // get all categories :
    @GetMapping("/public/categories")
    public ResponseEntity<?> getAllCategories(
        @RequestParam(
            name="pageSize", 
            defaultValue = AppConstants.PAGE_SIZE,
            required = false) Integer pageSize,
        @RequestParam(
            name="pageNumber",
            defaultValue = AppConstants.PAGE_NUMBER,
            required = false) Integer pageNumber,
        @RequestParam(
            name="sortBy",
            defaultValue = AppConstants.SORT_BY,
            required = false
        ) String sortBy,
        @RequestParam(
            name="sortOrder",
            defaultValue = AppConstants.SORT_DIR,
            required = false
        ) String sortOrder
    ) {
        return categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
    }

    // getting category By Id:
    @GetMapping("/public/category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    // add Category :
    @PostMapping("/admin/addCategory")
    public ResponseEntity<?> addCategory(@Valid @RequestBody CategoryDTO newCategoryDTO) {
        return categoryService.addNewCategory(newCategoryDTO);
    }

    // delete category :
    @DeleteMapping("/admin/deleteCategory/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }

    // update category :
    @PutMapping("/admin/updateCategory/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id,@Valid @RequestBody CategoryDTO categoryToUpdateDto) {
        return categoryService.updateCategory(id, categoryToUpdateDto);
    }
}
