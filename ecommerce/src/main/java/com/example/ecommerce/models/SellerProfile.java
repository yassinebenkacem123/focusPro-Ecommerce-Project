package com.example.ecommerce.models;


import com.example.ecommerce.config.PayementMethod;
import com.example.ecommerce.config.SellerStatus;
import com.example.ecommerce.config.VerificationStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "seller_profiles",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"storeName"})
})
public class SellerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellerId;
    private String storeName;

    @OneToOne
    @JoinColumn(name="user_id", nullable = false, unique = true)
    private User user;


    @Enumerated(EnumType.STRING)
    private SellerStatus status = SellerStatus.ACTIVE;

    // verification status :
    private VerificationStatus verificationStatus;

    @Enumerated(EnumType.STRING)
    private PayementMethod paymentMethod;

    private  double rating = 0.0;

    private int totalReviews = 0;

    private Long totalSales = 0L;


    @ToString.Exclude
    @OneToMany(
        mappedBy = "sellerProfile",
        cascade = {CascadeType.MERGE, CascadeType.PERSIST},
        orphanRemoval = true
    )
    @JsonIgnore
    private Set<Product> sellerProducts = new HashSet<>();

    private Date approvalDate;

}
