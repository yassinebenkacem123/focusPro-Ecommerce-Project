package com.example.ecommerce.models;

import com.example.ecommerce.config.ActivityType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="seller_activities")
public class SellerActivities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long activityId;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;
}
