package com.example.ecommerce.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.exceptions.APIException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.CartDTO;
import com.example.ecommerce.payload.ProductDTO;
import com.example.ecommerce.payload.ProductResponse;
import com.example.ecommerce.repository.CartRepo;
import com.example.ecommerce.repository.CategoryRepo;
import com.example.ecommerce.repository.ProductRepo;

@Service
public class ProductServiceImplt implements ProductService {
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private FileService fileService;

    @Autowired
    private CartService cartService;

    @Value("${project.imagePath}")
    private String pathRoot;

    @Autowired
    private CartRepo cartRepo;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    // add new product.
    @Override
    public ResponseEntity<APIResponse> addNewProduct(ProductDTO productDTO, Long categoryId) {
        Category existedCategory = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "CategoryId", categoryId));

        // converting productDTO to product class.
        Product productToAdd = modelMapper.map(productDTO, Product.class);
        Product existProduct = productRepo.findByProductName(productDTO.getProductName());
        if (existProduct != null) {
            throw new APIException("Product With the name: " + existProduct.getProductName() + " already exist.");
        }
        productToAdd.setCategory(existedCategory);
        Double specialPrice = productDTO.getPrice() - (productDTO.getPrice() * productDTO.getDiscounte() * 0.01);
        productToAdd.setSpecialPrice(specialPrice);
        productToAdd.setProductMainImage("default.png");

        productRepo.save(productToAdd);

        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Product added successfly.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    // get all products.
    @Override
    public ResponseEntity<ProductResponse> getAllProduct(
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String orderBy,
            String keyword,
            String category) {
        // specification to add next.
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();
        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder
                    .like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
        }
        if (category != null) {
            String normalizedCategory = category.trim();
            if (!normalizedCategory.isEmpty()
                    && !normalizedCategory.equalsIgnoreCase("all")
                    && !normalizedCategory.equalsIgnoreCase("all categories")) {
                String categoryLower = normalizedCategory.toLowerCase();
                spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("category").get("categoryName")),
                        categoryLower));
            }
        }

        Sort sortByAndOrder = orderBy.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        ;

        Pageable productPageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepo.findAll(spec, productPageDetails);

        List<Product> products = productPage.getContent();
        // verifying if there's any products.
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("There's no product added Until now.");
        }
        List<ProductDTO> productsDtos = products.stream().map((product) -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTO.setProductImage(constructImageBaseUrl(product.getProductMainImage()));
            return productDTO;

        }).toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productsDtos);
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setTheLast(productPage.isLast());
        productResponse.setPageSize(pageSize);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    // get product by category :
    @Override
    public ResponseEntity<ProductResponse> getProductByCategory(
            Long categoryId,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String orderBy) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "CategoryId", categoryId));
        Sort sortByAndOrder = orderBy.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> productPage = productRepo.findByCategoryOrderByPriceAsc(category, pageDetails);

        List<Product> products = productPage.getContent();

        // verifying if there's any products.
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("There's no product added Until now.");
        }

        List<ProductDTO> productsDtos = products.stream().map((product) -> modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();

        productResponse.setContent(productsDtos);
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setPageSize(pageSize);
        productResponse.setTheLast(productPage.isLast());
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    // search product by keyword
    @Override
    public ResponseEntity<ProductResponse> searchForProductByKeyword(
            String keyword,
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String orderBy) {

        // logic for pagination and sorting :
        Sort sortByAndOrder = orderBy.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> productPage = productRepo.findByProductNameLikeIgnoreCase('%' + keyword + '%', pageDetails);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products were found matching this keyword");
        }
        List<ProductDTO> productDTOs = products.stream().map((product) -> modelMapper.map(product, ProductDTO.class))
                .toList();
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    // update product
    @Override
    public ResponseEntity<APIResponse> updateProduct(Long productId, ProductDTO productDto) {
        Product productToUpdate = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        productToUpdate.setProductName(productDto.getProductName());
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setPrice(productDto.getPrice());
        productToUpdate.setProductMainImage(productDto.getProductImage());
        productToUpdate.setQuantity(productDto.getQuantity());
        productToUpdate.setDiscounte(productDto.getDiscounte());
        productToUpdate.setSpecialPrice(productDto.getSpecialPrice());

        productRepo.save(productToUpdate);

        List<Cart> carts = cartRepo.findCartsByProductId(productId);

        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            List<ProductDTO> products = cart.getCartItems().stream()
                    .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());
            cartDTO.setProducts(products);
            return cartDTO;
        }).collect(Collectors.toList());

        cartDTOs.forEach(cart -> cartService.updateProductInCarts(cart.getCartId(), productId));
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Product updated successfly");
        apiResponse.setStatus(true);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // delete product :
    @Override
    public ResponseEntity<APIResponse> deleteProductService(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "ProductId", productId));

        List<Cart> carts = cartRepo.findCartsByProductId(productId);
        carts.forEach(cart -> cartService.deleteProductFromCartSerivce(cart.getCartId(), productId));

        productRepo.delete(product);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Product deleted Successfly.");
        apiResponse.setStatus(true);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // update product :
    @Override
    public ResponseEntity<APIResponse> updateProductImageService(Long productId, MultipartFile image)
            throws IOException {
        Product productToUpdate = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Porduct", "PorductId", productId));

        String imagePathName = fileService.getImagePathName(pathRoot, image);

        productToUpdate.setProductMainImage(imagePathName);

        // save the new updated product :
        productRepo.save(productToUpdate);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setMessage("Product Image updated successfly.");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // method to construct image base url :
    public String constructImageBaseUrl(String imageName) {
        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageName : imageBaseUrl + "/" + imageName;
    }

}
