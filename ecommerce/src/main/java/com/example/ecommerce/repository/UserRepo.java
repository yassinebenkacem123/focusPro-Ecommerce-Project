package com.example.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {


    boolean existsByEmail(String email);


    boolean existsByUsername(String username);

    User findByUsername(String username);


    User findByEmail(String email);


    User findByProviderId(String providerId);



    
} 
