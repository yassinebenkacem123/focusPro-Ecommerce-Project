package com.example.ecommerce.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "You must provide an user email.")
    @Email(message = "Your email isn't valid.")
    private String email;
    
    @NotBlank(message = "You must provide a password.")
    private String password;
    
}
