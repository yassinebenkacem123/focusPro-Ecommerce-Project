package com.example.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.AddressDTO;
import com.example.ecommerce.services.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2")
public class AddressController {
   

    @Autowired
    AddressService addressService;

    //add new address:
    @PostMapping("/address/user")
    public ResponseEntity<APIResponse> addNewAddress(@Valid @RequestBody AddressDTO addressDTO){
        return addressService.addNewAddressService(addressDTO);
    }

    // get all addresses :
    @GetMapping("/getAddresses")
    public ResponseEntity<List<AddressDTO>> getAllAddresses(){
        return addressService.getAllAdresses();
    }

    // get address by ID :
    @GetMapping("/getAddress/{addressId}")
    public ResponseEntity<AddressDTO> getAddress(@PathVariable Long addressId){
        return addressService.getAddress(addressId);
    }

    // get User addresses : 
    @GetMapping("/getAddresses/user")
    public ResponseEntity<List<AddressDTO>>getUserAddresses(){
        return addressService.getUserAddressesService();
    }


    // update address : 
    @PutMapping("/updateAddress/{addressId}")
    public ResponseEntity<AddressDTO> updateExistedAddress(
        @PathVariable Long addressId, 
        @RequestBody AddressDTO addressDTO
    ){
        return addressService.updateAddressService(addressId,addressDTO);
    }

    // delete address :
    @DeleteMapping("/deleteAddress/{addressId}")
    public ResponseEntity<APIResponse> deleteAddress(@PathVariable Long addressId){
        return addressService.deleteAddressService(addressId);
    }
}
