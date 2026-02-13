package com.example.ecommerce.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductImage;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.ProductImageDTO;
import com.example.ecommerce.repository.ProductImageRepo;
import com.example.ecommerce.repository.ProductRepo;

@Service
public class ProductImageServiceImplt implements ProductImageService{
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private FileService fileService;
    
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ProductImageRepo productImageRepo;


    @Autowired
    private  ModelMapper modelMapper;


    
    // add product's images service :
    @Override
    public ResponseEntity<ProductImageDTO> addImageToProductService(Long productId, MultipartFile imageProduct) {
        //checking if the product exist :
        Product product = productRepo.findById(productId).orElseThrow(
            ()-> new ResourceNotFoundException("Product","ProductId",productId)
        );
        Map<String, String> uploadResult = cloudinaryService.uploadProductImage(imageProduct, product.getProductName());
        ProductImage productImage = new ProductImage();
        productImage.setImageUrl(uploadResult.get("secure_url").toString());
        productImage.setProduct(product);
        productImage.setPublicId(uploadResult.get("public_id").toString());
        ProductImage savedProductImage  =  productImageRepo.save(productImage);

        ProductImageDTO productImageDTO = new ProductImageDTO();
        productImageDTO.setImageId(savedProductImage.getImageId());
        productImageDTO.setImageUrl(savedProductImage.getImageUrl());
        productImageDTO.setPublicId(savedProductImage.getPublicId());
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Product Image added successfully");
        apiResponse.setStatus(true);
        productImageDTO.setApiResponse(apiResponse);
        return new ResponseEntity<>(productImageDTO, HttpStatus.CREATED);
    }

    // get product's images service :
    @Override
    public ResponseEntity<List<ProductImageDTO>> getProductImagesService(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(
            ()-> new ResourceNotFoundException("Porduct","ProductId",productId)
        );
        List<ProductImage> productImages = productImageRepo.findByProductId(productId);
        // System.out.println(productImages);
        if(productImages == null){

            throw new ResourceNotFoundException("the Product "+product.getProductName()+" doesn't contain any pictures yet.");
        }
        List<ProductImageDTO> productImageDTOs = productImages.stream()
            .map((productImage)-> modelMapper.map(productImage, ProductImageDTO.class))
            .collect(Collectors.toList());
        APIResponse apiResponse = new APIResponse();
       

        return ResponseEntity.ok().body(productImageDTOs);
    }
    // delete image :
    @Override
    public ResponseEntity<APIResponse> deleteImageService(Long imageId) {
        ProductImage productImage = productImageRepo.findById(imageId)
            .orElseThrow(()-> new ResourceNotFoundException("Image","imageId",imageId)
        );

        productImageRepo.delete(productImage);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(true);
        apiResponse.setMessage("Product image deleted successfly.");
        
        return ResponseEntity.ok().body(apiResponse);
    }

    // update product service :
    @Override
    public ResponseEntity<ProductImageDTO> updateImageProductService(Long imageId, MultipartFile newProductImage) {
   
        ProductImage imageToUpdate = productImageRepo.findById(imageId)
            .orElseThrow(()-> new ResourceNotFoundException("ProductImage","productImageId", imageId)); 
        if(!newProductImage.isEmpty()){
            cloudinaryService.deleteImageFromCloudaniry(imageToUpdate.getPublicId());
        
            Map<String, String > uploadResult = cloudinaryService.uploadProductImage(
                newProductImage,
                imageToUpdate.getProduct().getProductName()
            );
            imageToUpdate.setImageUrl(uploadResult.get("secure_url").toString());
            imageToUpdate.setPublicId(uploadResult.get("public_id").toString());
        }

        ProductImage newSavedImage = productImageRepo.save(imageToUpdate);

        ProductImageDTO imageDTO = modelMapper.map(newSavedImage, ProductImageDTO.class);

        return ResponseEntity.ok().body(imageDTO);
    }
    
}
