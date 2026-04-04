package com.example.ecommerce.services;

import com.example.ecommerce.payload.CategoriesStatsDTO;
import com.example.ecommerce.payload.SellersStaticsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminStatsService {
    ResponseEntity<List<CategoriesStatsDTO>>categoriesStats();

    ResponseEntity<SellersStaticsDTO> sellersStats();
}
