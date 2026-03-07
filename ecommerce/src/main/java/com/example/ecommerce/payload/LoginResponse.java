package com.example.ecommerce.payload;

import java.util.List;

import com.example.ecommerce.config.Provider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    private Provider provider;
    private String imageUrl;

}