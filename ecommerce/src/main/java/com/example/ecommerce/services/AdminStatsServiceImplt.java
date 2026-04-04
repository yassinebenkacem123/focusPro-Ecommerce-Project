package com.example.ecommerce.services;

import com.example.ecommerce.config.SellerStatus;
import com.example.ecommerce.config.VerificationStatus;
import com.example.ecommerce.models.SellerProfile;
import com.example.ecommerce.payload.CategoriesStatsDTO;
import com.example.ecommerce.payload.SellersStaticsDTO;
import com.example.ecommerce.repository.CategoryRepo;
import com.example.ecommerce.repository.SellerProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminStatsServiceImplt implements AdminStatsService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private SellerProfileRepo sellerProfileRepo;

    @Override
    public ResponseEntity<List<CategoriesStatsDTO>> categoriesStats() {
        return ResponseEntity.ok(categoryRepo.findCategoriesStats());
    }

    @Override
    public ResponseEntity<SellersStaticsDTO> sellersStats() {
        SellersStaticsDTO sellersStaticsDTO = new SellersStaticsDTO();
        // 1. getting the all sellers:
        List<SellerProfile> sellerProfiles = sellerProfileRepo.findAll();
        // 4. total sellers:
        sellersStaticsDTO.setTotalSellers(sellerProfiles.size());
        // 2. active sellers:
        long activeSellers =  sellerProfiles.stream()
                .filter(sellerProfile -> sellerProfile.getStatus() == SellerStatus.ACTIVE)
                .count();
        sellersStaticsDTO.setActiveSellers((int) activeSellers);
        // 3. inactive sellers:
        long inactiveSellers = sellerProfiles.stream()
                .filter(sellerProfile -> sellerProfile.getStatus() == SellerStatus.SUSPENDED)
                .count();
        sellersStaticsDTO.setInactiveSellers((int) inactiveSellers);
        // 4. pending approval sellers:
        long pendingApproval = sellerProfiles.stream()
                .filter(sellerProfile -> sellerProfile.getVerificationStatus() == VerificationStatus.PENDING)
                .count();
        sellersStaticsDTO.setPendingApprovalSellers((int) pendingApproval);
        return ResponseEntity.ok(sellersStaticsDTO);
    }
}
