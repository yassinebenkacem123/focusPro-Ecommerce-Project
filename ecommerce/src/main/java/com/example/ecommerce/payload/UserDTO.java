package com.example.ecommerce.payload;

import java.util.Date;

import com.example.ecommerce.config.Gender;

import  lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    
    private String username;
    private String email;
    private Date dateOfBirth;
    private String phoneNumber;
    private Gender gender;
}
