package com.example.ecommerce.services;
import com.example.ecommerce.exceptions.APIException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.SellerDTO;
import com.example.ecommerce.repository.AddressRepo;
import com.example.ecommerce.repository.RoleRepo;
import com.example.ecommerce.repository.SellerProfileRepo;
import com.example.ecommerce.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SellerServiceImplt implements  SellerService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private SellerProfileRepo sellerProfileRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Transactional
    @Override
    public ResponseEntity<?> addNewSellerByAdmin(SellerDTO sellerDTO) {
        // check if the email already exist or the name :
        if(userRepo.existsByEmail(sellerDTO.getEmail())){
            throw new APIException("Email already exist");
        }
        if (userRepo.existsByUsername(sellerDTO.getSellerName())){
            throw  new APIException("Username already exist");
        }
        
        // 1. Create and save the User
        User user = new User();
        user.setUsername(sellerDTO.getSellerName());
        user.setEmail(sellerDTO.getEmail());
        user.setPassword(encoder.encode(sellerDTO.getPassword()));
        user.setPhoneNumber(sellerDTO.getPhoneNumber());

        Set<Role> roles = new HashSet<>();
        Role sellerRole = roleRepo.findByRoleName(AppRole.ROLE_SELLER);
        Role userRole = roleRepo.findByRoleName(AppRole.ROLE_USER);
        roles.add(sellerRole);
        roles.add(userRole);
        user.setUserRoles(roles);

        User savedUser = userRepo.save(user);

        // 2. Create and save Address
        Address address = new Address();
        address.setBuildingName(sellerDTO.getBuildingName());
        address.setStreet(sellerDTO.getStreet());
        address.setCity(sellerDTO.getCity());
        address.setState(sellerDTO.getState());
        address.setPincode(sellerDTO.getPincode());
        address.setCountry(sellerDTO.getCountry());
        address.setUser(savedUser);
        addressRepo.save(address);

        // Update user's address list (optional but good for consistency)
        List<Address> sellerAddresses = new ArrayList<>();
        sellerAddresses.add(address);
        savedUser.setUserAddresses(sellerAddresses);

        // 3. Create and save SellerProfile
        SellerProfile sellerProfile = new SellerProfile();
        sellerProfile.setUser(savedUser);
        sellerProfile.setStatus(sellerDTO.getStatus());
        sellerProfile.setStoreName(sellerDTO.getStoreName());
        sellerProfile.setPaymentMethod(sellerDTO.getPaymentMethod());
        sellerProfile.setVerificationStatus(sellerDTO.getVerificationStatus());
        sellerProfileRepo.save(sellerProfile);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(true);
        apiResponse.setMessage("Seller added successfully");
        return ResponseEntity.ok(apiResponse);
    }
}
