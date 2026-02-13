package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {

    
} 