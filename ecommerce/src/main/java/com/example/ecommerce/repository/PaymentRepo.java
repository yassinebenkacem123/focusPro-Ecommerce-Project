package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.Payment;
@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    
}
