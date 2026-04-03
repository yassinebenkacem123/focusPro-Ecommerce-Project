package com.example.ecommerce.payload;

import com.example.ecommerce.config.PayementMethod;
import com.example.ecommerce.config.SellerStatus;
import com.example.ecommerce.config.VerificationStatus;
import com.example.ecommerce.models.Address;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDTO {
    
    @NotBlank(message = "Username is required")
    @Size(min = 6, max = 30, message = "Username must be between 6 and 30 characters")
    private String sellerName;
    @NotBlank(message = "Store name is required")
    @Size(min = 2, max = 100, message = "Store name must be between 2 and 100 characters")
    private String storeName;
    

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Phone number should be valid")
    private String phoneNumber;


    private String buildingName;
    private String pincode;
    private String state;
    private String street;

    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;
    
    @Size(max = 100, message = "Country must not exceed 100 characters")
    private String country;
    
    private SellerStatus status;
    
    private VerificationStatus verificationStatus;
    
    private PayementMethod paymentMethod;

    @NotBlank(message = "password is required")
    private String password;
}
