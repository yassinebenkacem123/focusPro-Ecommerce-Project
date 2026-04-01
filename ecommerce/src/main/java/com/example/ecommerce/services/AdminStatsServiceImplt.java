package com.example.ecommerce.services;

import com.example.ecommerce.payload.CategoriesStatsDTO;
import com.example.ecommerce.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminStatsServiceImplt implements AdminStatsService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public ResponseEntity<List<CategoriesStatsDTO>> categoriesStats() {
        return ResponseEntity.ok(categoryRepo.findCategoriesStats());
    }
}
