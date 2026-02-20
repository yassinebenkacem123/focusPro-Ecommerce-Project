package com.example.ecommerce.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Address;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.AddressDTO;
import com.example.ecommerce.repository.AddressRepo;
import com.example.ecommerce.repository.UserRepo;
import com.example.ecommerce.utils.AuthUtils;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    AuthUtils authUtils;

    @Autowired
    AddressRepo addressRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper modelMapper;
    @Override
    public ResponseEntity<APIResponse> addNewAddressService(AddressDTO addressDTO) {
        User user = authUtils.loggedInUser();
        Address address = modelMapper.map(addressDTO, Address.class);
        address.setUser(user);
        addressRepo.save(address);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Address Added.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse ,HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<AddressDTO>> getAllAdresses() {
        List<Address> addresses =  addressRepo.findAll();
        if(addresses.isEmpty()){
            throw new ResourceNotFoundException("There's no address created yet.");
        }
        List<AddressDTO> addressDTOs = addresses.stream()
            .map(address-> modelMapper.map(address, AddressDTO.class))
            .collect(Collectors.toList());
           
        return new ResponseEntity<>(addressDTOs,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AddressDTO> getAddress(Long addressId) {
        Address address = addressRepo.findById(addressId)
            .orElseThrow(()-> new ResourceNotFoundException("Address","Address",addressId));

        AddressDTO addressDTO = modelMapper.map(address, AddressDTO.class);
        return new ResponseEntity<>(addressDTO,HttpStatus.FOUND);
    }


    @Override
    public ResponseEntity<List<AddressDTO>> getUserAddressesService() {
        User user = authUtils.loggedInUser();
        Long userId = user.getUserId();
        List<Address> userAddresses = addressRepo.findUserAddresses(userId);
        if(userAddresses.isEmpty()){
            throw new ResourceNotFoundException("The User "+user.getUsername()+" has no address yet.");
        }
        List<AddressDTO> userAddressDTOs = userAddresses.stream()
            .map(address ->modelMapper.map(address, AddressDTO.class)).collect(Collectors.toList());
        
        return new ResponseEntity<>(userAddressDTOs,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<APIResponse> deleteAddressService(Long addressId) {
        Address address = addressRepo.findById(addressId)
            .orElseThrow(()->new ResourceNotFoundException("Address","AddressId", addressId));
        

        // i think, i need to break the relation between user -> address first.(yp)
        User user = address.getUser();
        user.getUserAddresses().removeIf((add)-> add.getAddressId().equals(addressId));
        userRepo.save(user);

        addressRepo.delete(address);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Address deleted successfly.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AddressDTO> updateAddressService(Long addressId, AddressDTO addressDTO) {
        Address address = addressRepo.findById(addressId)
            .orElseThrow(()-> new ResourceNotFoundException("Address","AddressId",addressId));
    
        address.setBuildingName(addressDTO.getBuildingName());
        address.setCity(addressDTO.getCity());
        address.setCountry(addressDTO.getCountry());
        address.setPincode(addressDTO.getPincode());
        address.setState(addressDTO.getState());
        address.setStreet(addressDTO.getStreet());
        
        addressRepo.save(address);
        // we need to update the user's addresses as well: 
        User user = address.getUser();
        
        user.getUserAddresses().removeIf((addrs)->addrs.getAddressId().equals(addressId));
        user.getUserAddresses().add(address);
        userRepo.save(user);
        AddressDTO newAddressDTO = modelMapper.map(address, AddressDTO.class);
        return new ResponseEntity<>(newAddressDTO,HttpStatus.OK);
    }
}
