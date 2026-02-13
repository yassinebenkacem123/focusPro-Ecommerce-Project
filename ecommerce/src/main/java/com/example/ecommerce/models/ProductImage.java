package com.example.ecommerce.models;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="image_id", nullable = false)
    private Long imageId;

    @Column(name="image_url", nullable = false)
    private String imageUrl;

    @Column(name="public_id", nullable = false)
    private String publicId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // i must add the ID product.=> DTO's.
    @JsonIgnore
    private Product product;
}