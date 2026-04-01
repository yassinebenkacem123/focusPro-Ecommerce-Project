package com.example.ecommerce.payload;

import com.example.ecommerce.config.Gender;
import com.example.ecommerce.models.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserData {
    private  String username;
    private  String email;
    private String phoneNumber;
    private  String imageUrl;
    private Gender gender;
    private Date dateOfBirth;
    private List<Address> userAddresses;
}
