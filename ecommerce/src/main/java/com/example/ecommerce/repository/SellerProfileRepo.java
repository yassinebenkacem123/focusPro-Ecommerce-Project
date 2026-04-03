package com.example.ecommerce.repository;

import com.example.ecommerce.models.SellerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerProfileRepo extends JpaRepository<SellerProfile, Long> {
}
