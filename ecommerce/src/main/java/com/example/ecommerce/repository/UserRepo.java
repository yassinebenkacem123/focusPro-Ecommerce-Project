package com.example.ecommerce.repository;


import com.example.ecommerce.models.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.User;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {


    boolean existsByEmail(String email);


    boolean existsByUsername(String username);

    User findByUsername(String username);


    User findByEmail(String email);


    User findByProviderId(String providerId);


    List<User> findAllByUserRoles_RoleName(AppRole appRole);
} 
