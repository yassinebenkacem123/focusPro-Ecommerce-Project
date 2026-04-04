package com.example.ecommerce.controllers;

import com.example.ecommerce.config.AppConstants;
import com.example.ecommerce.models.SellerProfile;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.SellerDTO;
import com.example.ecommerce.payload.SellerResponse;
import com.example.ecommerce.repository.SellerProfileRepo;
import com.example.ecommerce.repository.UserRepo;
import com.example.ecommerce.services.SellerService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;

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
    public ResponseEntity<?> addSeller(@Valid @RequestBody SellerDTO sellerDTO){
        return sellerService.addNewSellerByAdmin(sellerDTO);

    }
    // 2. getting sellers information :
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<SellerResponse> getSellers(
        @RequestParam(
                name="keyword",
                required = false,
                defaultValue = ""
        )
        String keyword,
        @RequestParam(
                name = "status",
                required = false,
                defaultValue = ""
        ) String status,
        @RequestParam(
                name="pageSize",
                required = false,
                defaultValue = AppConstants.PAGE_SIZE
        ) Integer pageSize,
        @RequestParam(
                name="pageNumber",
                required = false,
                defaultValue = AppConstants.PAGE_NUMBER
        )
        Integer pageNumber,
        @RequestParam(
                name="sortBy",
                required = false,
                defaultValue = "sellerId"
        ) String sortBy,
        @RequestParam(
                name="sortOrder",
                required = false,
                defaultValue = AppConstants.SORT_DIR
        ) String sortOrder){
        return sellerService.getSellerByAdmin(pageNumber, pageSize, sortBy, sortOrder, keyword, status);
    }

    // 3. get seller profile :

    // 4. get seller activities :

    // 5. get seller products :


    // 6. get seller orders :

    // 7. make the seller able to add products :

}
