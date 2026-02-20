package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.PasswordResetToken;
import com.example.ecommerce.models.User;

@Repository
public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, Long>{

    PasswordResetToken findByUser(User user);

    PasswordResetToken findByToken(String token);
    
}
