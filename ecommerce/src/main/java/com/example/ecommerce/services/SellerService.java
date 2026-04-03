package com.example.ecommerce.services;

import com.example.ecommerce.payload.SellerDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface SellerService {
    ResponseEntity<?> addNewSellerByAdmin(@Valid SellerDTO sellerDTO);
}
