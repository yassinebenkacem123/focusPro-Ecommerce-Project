package com.example.ecommerce.controllers;

import com.example.ecommerce.payload.CategoriesStatsDTO;
import com.example.ecommerce.payload.ProductStatsDTO;
import com.example.ecommerce.payload.SellersStaticsDTO;
import com.example.ecommerce.services.AdminStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v2/admin/stats")
public class AdminStatsController {

    @Autowired
    private AdminStatsService adminStatsService;

    @GetMapping("/categories")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CategoriesStatsDTO>> getCategoriesStats(){
        return adminStatsService.categoriesStats();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/sellers")
    public ResponseEntity<SellersStaticsDTO> getSellersStats(){
        return adminStatsService.sellersStats();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/products")
    public ResponseEntity<ProductStatsDTO> getProductsStats(){
        return adminStatsService.productStats();

    }
}
