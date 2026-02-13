package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.models.Address;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long>{

    @Query("SELECT a FROM Address a where a.user.userId = ?1")
    List<Address> findUserAddresses(Long userId);

    
}