package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.models.AppRole;
import com.example.ecommerce.models.Role;

public interface RoleRepo extends JpaRepository<Role, Long>{


    Role findByRoleName(AppRole roleUser);

    boolean existsByRoleName(AppRole appRole);
    
}
