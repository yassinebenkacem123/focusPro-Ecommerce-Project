package com.example.ecommerce.services;
import com.example.ecommerce.config.SellerStatus;
import com.example.ecommerce.exceptions.APIException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.SellerDTO;
import com.example.ecommerce.payload.SellerInfo;
import com.example.ecommerce.payload.SellerResponse;
import com.example.ecommerce.repository.AddressRepo;
import com.example.ecommerce.repository.RoleRepo;
import com.example.ecommerce.repository.SellerProfileRepo;
import com.example.ecommerce.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    @Autowired
    private ModelMapper modelMapper;


    // add new seller by the admin
    @Transactional
    @Override
    public ResponseEntity<?> addNewSellerByAdmin(SellerDTO sellerDTO) {
        if (userRepo.existsByUsername(sellerDTO.getSellerName())) {
            throw new APIException("User name Already used");
        }
        if (userRepo.existsByEmail(sellerDTO.getEmail())) {
            throw new APIException("Email Already used");
        }

        User savedUser = new User();
        savedUser.setUsername(sellerDTO.getSellerName());
        savedUser.setEmail(sellerDTO.getEmail());
        savedUser.setPassword(encoder.encode(sellerDTO.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role sellerRole = roleRepo.findByRoleName(AppRole.ROLE_SELLER);
        roles.add(sellerRole);
        Role userRole = roleRepo.findByRoleName(AppRole.ROLE_USER);
        roles.add(userRole);
        savedUser.setUserRoles(roles);

        if (sellerDTO.getPhoneNumber() != null) {
            savedUser.setPhoneNumber(sellerDTO.getPhoneNumber());
        }
        userRepo.save(savedUser);

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

        // Update user's seller profile
        savedUser.setSellerProfile(sellerProfile);
        userRepo.save(savedUser);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(true);
        apiResponse.setMessage("Seller added successfully");
        return ResponseEntity.ok(apiResponse);
    }

    // get all sellers :
    @Transactional
    @Override
    public ResponseEntity<SellerResponse> getSellerByAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String status) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        SellerStatus sellerStatus = null;
        if (status != null && !status.isEmpty()) {
            try {
                sellerStatus = SellerStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                // If status is invalid, we could either throw an error or just ignore it.
                // Here we'll ignore it and filter by status = null which might return nothing if status was expected.
            }
        }

        Page<SellerProfile> sellerProfiles = sellerProfileRepo.findByStatusAndKeyword(sellerStatus, keyword, pageDetails);

        List<SellerInfo> sellerInfoList = sellerProfiles.getContent().stream().map(sellerProfile -> {
            SellerInfo sellerInfo = new SellerInfo();
            sellerInfo.setSellerId(sellerProfile.getSellerId());
            sellerInfo.setSellerName(sellerProfile.getUser().getUsername());
            sellerInfo.setSellerEmail(sellerProfile.getUser().getEmail());
            sellerInfo.setShopName(sellerProfile.getStoreName());
            sellerInfo.setSellerStatus(sellerProfile.getStatus());
            sellerInfo.setSellerRating(sellerProfile.getRating());
            sellerInfo.setSellerSales(sellerProfile.getTotalSales());
            sellerInfo.setTotalProducts(sellerProfile.getSellerProducts().size());
            return sellerInfo;
        }).collect(Collectors.toList());

        SellerResponse sellerResponse = new SellerResponse();
        sellerResponse.setContent(sellerInfoList);
        sellerResponse.setPageNumber(sellerProfiles.getNumber());
        sellerResponse.setPageSize(sellerProfiles.getSize());
        sellerResponse.setTotalElements(sellerProfiles.getTotalElements());
        sellerResponse.setTotalPages(sellerProfiles.getTotalPages());
        sellerResponse.setTheLast(sellerProfiles.isLast());

        return ResponseEntity.ok(sellerResponse);
    }
}
