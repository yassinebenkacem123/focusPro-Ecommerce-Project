package com.example.ecommerce.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordDTO {
    @Size(min=4, message = "password should contain at least 4 caracters.")
    @NotBlank
    private String newPassword;
}