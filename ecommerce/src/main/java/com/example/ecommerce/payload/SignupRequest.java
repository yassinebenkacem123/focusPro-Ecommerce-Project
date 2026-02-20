package com.example.ecommerce.payload;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    @NotBlank(message = "username required.")
    @Size(min = 6, max=30, message = "Name must be between 6 and 30")
    private String username;

    @NotBlank(message = "Email required.")
    @Email(message = "Your email isn't valid.")
    private String email;
    
    @NotBlank(message = "Password required.")
    @Size(min = 6, max=50, message = "the password must be between 6 and 30")
    private String password;


    private Set<String> role;
    
}
