package com.example.ecommerce.services;

import java.util.List;

import com.example.ecommerce.payload.AddressResponse;
import org.springframework.http.ResponseEntity;

import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.AddressDTO;

public interface AddressService {

    ResponseEntity<APIResponse> addNewAddressService(AddressDTO addressDTO);

    ResponseEntity<List<AddressDTO>> getAllAdresses();

    ResponseEntity<AddressDTO> getAddress(Long addressId);

    ResponseEntity<List<AddressResponse>> getUserAddressesService();

    ResponseEntity<APIResponse> deleteAddressService(Long addressId);

    ResponseEntity<AddressDTO> updateAddressService(Long addressId, AddressDTO addressDTO);

    
}
