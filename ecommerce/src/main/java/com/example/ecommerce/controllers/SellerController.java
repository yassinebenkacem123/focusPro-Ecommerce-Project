package com.example.ecommerce.controllers;

import com.example.ecommerce.payload.SellerDTO;
import com.example.ecommerce.repository.SellerProfileRepo;
import com.example.ecommerce.repository.UserRepo;
import com.example.ecommerce.services.SellerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/api/v2/seller")
public class SellerController {

    // imports and autowired services
    @Autowired
    private SellerService sellerService;

    @Autowired
    private SellerProfileRepo sellerProfileRepo;

    @Autowired
    private UserRepo userRepo;

    // 1. add seller by the admin :
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/add")
    public ResponseEntity<?> addSeller(@Valid  SellerDTO sellerDTO){
        return sellerService.addNewSellerByAdmin(sellerDTO);

    }
    // 2. update seller profile :

    // 3. get seller profile :

    // 4. get seller activities :

    // 5. get seller products :

    // 6. get seller orders :

    // 7. make the seller able to add products :

}
