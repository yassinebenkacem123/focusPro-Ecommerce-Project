package com.example.ecommerce.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;


    @OneToOne(mappedBy = "payment", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Order order;


    @NotBlank
    @Size(min = 4, message = "Payment method must contain at least 4 characters.")
    private String paymentMethod;


    private String pgPaymentId; //payment gateway.!!
    private String pgStatus;
    private String pgResponseMessage;
    private String pgName;
    
    // custom constructor that allows us to create a constructor without the payment info.
    public Payment(
        Long paymentId, 
        String pgPaymentId, 
        String pgStatus, 
        String pgResponseMessage, 
        String pgName
    ){
        this.paymentId = paymentId;
        this.pgName = pgName;
        this.pgResponseMessage = pgResponseMessage;
        this.pgStatus = pgStatus;
        this.pgPaymentId = pgPaymentId;

    }
}
