package com.example.ecommerce.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    private Integer quantity;
    private Double discount;
    private Double productPrice;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="cart_id")
    @JsonIgnore
    private Cart cart;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
    
}
