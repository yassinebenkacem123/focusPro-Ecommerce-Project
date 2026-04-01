package com.example.ecommerce.services;

import com.example.ecommerce.payload.CategoriesStatsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminStatsService {
    ResponseEntity<List<CategoriesStatsDTO>>categoriesStats();
}
