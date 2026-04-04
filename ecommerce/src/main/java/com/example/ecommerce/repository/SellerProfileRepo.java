package com.example.ecommerce.repository;

import com.example.ecommerce.config.SellerStatus;
import com.example.ecommerce.models.SellerProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SellerProfileRepo extends JpaRepository<SellerProfile, Long> {
    @Query("SELECT s FROM SellerProfile s WHERE " +
            "(:status IS NULL OR s.status = :status) AND " +
            "(s.storeName LIKE %:keyword% OR s.user.username LIKE %:keyword% OR s.user.email LIKE %:keyword%)")
    Page<SellerProfile> findByStatusAndKeyword(@Param("status") SellerStatus status, @Param("keyword") String keyword, Pageable pageable);
}
