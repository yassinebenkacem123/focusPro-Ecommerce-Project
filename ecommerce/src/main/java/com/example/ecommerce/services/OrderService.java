package com.example.ecommerce.services;

import org.springframework.http.ResponseEntity;

import com.example.ecommerce.payload.OrderDTO;
import com.example.ecommerce.payload.OrderRequestDTO;

import jakarta.transaction.Transactional;

public interface OrderService {

    @Transactional
    ResponseEntity<OrderDTO> makeOrderService(OrderRequestDTO orderRequestDTO, String paymentMethod);

    
}