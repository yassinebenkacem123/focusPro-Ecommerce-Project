package com.example.ecommerce.services;

import com.example.ecommerce.models.SellerProfile;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.SellerDTO;
import com.example.ecommerce.payload.SellerResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SellerService {
    ResponseEntity<?> addNewSellerByAdmin(@Valid SellerDTO sellerDTO);

    ResponseEntity<SellerResponse> getSellerByAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String status);

    ResponseEntity<?> deleteSeller(Long sellerID);

    ResponseEntity<?> updateSeller(Long sellerID, @Valid SellerDTO sellerDTO);
}
