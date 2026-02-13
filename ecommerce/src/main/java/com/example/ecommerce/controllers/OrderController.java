package com.example.ecommerce.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.payload.OrderRequestDTO;
import com.example.ecommerce.services.OrderService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v2")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<?> orderProducts(
        @RequestBody OrderRequestDTO orderRequestDTO, 
        @PathVariable String paymentMethod
    ) {
        
        return orderService.makeOrderService(orderRequestDTO,paymentMethod);
    }

  
    
}
