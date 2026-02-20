package com.example.ecommerce.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ecommerce.exceptions.APIException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
  import com.example.ecommerce.payload.APIResponse;
import com.example.ecommerce.payload.CartDTO;
import com.example.ecommerce.payload.ProductDTO;
import com.example.ecommerce.repository.CartItemRepo;
import com.example.ecommerce.repository.CartRepo;
import com.example.ecommerce.repository.ProductRepo;
import com.example.ecommerce.repository.UserRepo;
import com.example.ecommerce.utils.AuthUtils;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired 
    CartRepo cartRepo;

    @Autowired
    UserRepo userRepo;


    @Autowired
    AuthUtils authUtils;

    @Autowired 
    ModelMapper modelMapper;

    @Autowired 
    ProductRepo productRepo;


    @Autowired
    CartItemRepo cartItemRepo;


    @Override
    public ResponseEntity<?> addProductToCartService(Long productId, Integer quantity) {
        // create user cart:
        Cart cart = createNewCart();
        
        // check if the product exist or not
        Product productToadd = productRepo.findById(productId).orElseThrow(
            ()-> new ResourceNotFoundException("Product","Product",productId)
        );

        // check if the product already added.
        CartItem cartItem = cartItemRepo.findByCartIdAndProductId(cart.getCartId(),productId);

        if(cartItem != null){
            throw new APIException("Product With the name "+productToadd.getProductName()+" Already exist.");
        }
        if(productToadd.getQuantity() == 0){
            APIResponse apiResponse = new APIResponse();
            apiResponse.setMessage("This product is not available right now");
            apiResponse.setStatus(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }else if(productToadd.getQuantity() < quantity){
            throw new APIException("the quantity of the product on the sock "+productToadd.getQuantity()+" less than the quantity provided");
        }else{
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setDiscount(productToadd.getDiscounte());
            newCartItem.setProduct(productToadd);
            newCartItem.setQuantity(quantity);
            newCartItem.setProductPrice(productToadd.getSpecialPrice());  
            cartItemRepo.save(newCartItem);
            productToadd.setQuantity(productToadd.getQuantity() - quantity);
            productRepo.save(productToadd);
           
            cart.setTotalPrice(cart.getTotalPrice() + (newCartItem.getQuantity()*productToadd.getSpecialPrice()));
            cartRepo.save(cart);
            APIResponse apiResponse = new APIResponse();
            apiResponse.setMessage("Product added To Successfly.");
            apiResponse.setStatus(true);
            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
        
        }
    }


    // create a new cart
    private Cart createNewCart() {
        Cart existedCart = cartRepo.findByUserEmail(authUtils.loggedInEmail());
        if(existedCart == null)
        {
            Cart cart = new Cart();
            cart.setTotalPrice(0.00);
            cart.setUser(authUtils.loggedInUser());
            return cart;
        }
        return existedCart;
    }


    // get all carts 
    @Override
    public ResponseEntity<List<CartDTO>> getAllCartsService() {
        List<Cart> carts = cartRepo.findAll();
        if(carts.isEmpty()){
            throw new ResourceNotFoundException("No cart created yet.");
        }
        List<CartDTO> cartDTOs = carts.stream().map(cart -> {

            List<ProductDTO> productDTOs = cart.getCartItems().stream().map(cartItem -> 
                modelMapper.map(cartItem.getProduct(), ProductDTO.class)
            ).collect(Collectors.toList());
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            cartDTO.setProducts(productDTOs);
            return cartDTO;
        }
        ).collect(Collectors.toList());
        return new ResponseEntity<>(cartDTOs, HttpStatus.FOUND);
    }


    // get user carts :
    @Override
    public ResponseEntity<CartDTO> getUserCartsService() {
        String email = authUtils.loggedInEmail();
        String username = authUtils.loggedInUser().getUsername();
        Cart userCart = cartRepo.findByUserEmail(email);

        if(userCart == null){
            throw new ResourceNotFoundException("The user "+username+" has no cart yet.");
        }

        CartDTO cartDTO = modelMapper.map(userCart,CartDTO.class);
        List<ProductDTO> productDTOs = userCart.getCartItems().stream().map(item -> 
            modelMapper.map(item.getProduct(), ProductDTO.class)
        ).collect(Collectors.toList());

        cartDTO.setProducts(productDTOs);
        return new ResponseEntity<>(cartDTO,HttpStatus.OK);
    }


    // update user's cart quantity : 
    @Override
    @Transactional // if we are doing sensitive updates.
    public ResponseEntity<CartDTO> updateCartItemQuantity(Long productId, Integer quantity) {
        
        String emailId = authUtils.loggedInEmail();
        Cart userCart = cartRepo.findByUserEmail(emailId);
        Long cartId  = userCart.getCartId();

        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantity() == 0) {
            throw new APIException(product.getProductName() + " is not available");
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Please, make an order of the " + product.getProductName()
                    + " less than or equal to the quantity " + product.getQuantity() + ".");
        }

        CartItem cartItem = cartItemRepo.findByCartIdAndProductId(cartId, productId);

        if (cartItem == null) {
            throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        // Calculate new quantity
        int newQuantity = cartItem.getQuantity() + quantity;

        // Validation to prevent negative quantities
        if (newQuantity < 0) {
            throw new APIException("The resulting quantity cannot be negative.");
        }

        if (newQuantity == 0){
            deleteProductFromCartSerivce(cartId, productId);
        } else {
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscounte());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepo.save(cart);
        }

        CartItem updatedItem = cartItemRepo.save(cartItem);
        if(updatedItem.getQuantity() == 0){
            cartItemRepo.deleteById(updatedItem.getCartItemId());
        }


        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<CartItem> cartItems = cart.getCartItems();

        Stream<ProductDTO> productStream = cartItems.stream().map(item -> {
            ProductDTO prd = modelMapper.map(item.getProduct(), ProductDTO.class);
            prd.setQuantity(item.getQuantity());
            return prd;
        });


        cartDTO.setProducts(productStream.toList());

        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    @Transactional
    @Override
    public ResponseEntity<APIResponse> deleteProductFromCartSerivce(Long cartId, Long productId) {
        Cart cart = cartRepo.findById(cartId).orElseThrow(()->
        new ResourceNotFoundException("Cart", "CartId", cartId));

        CartItem cartItem = cartItemRepo.findByCartIdAndProductId(cartId, productId);
        if(cartItem == null){
            throw new ResourceNotFoundException("Product", "PorductId", productId);
        }

        cart.setTotalPrice(cart.getTotalPrice() - 
            (cartItem.getProductPrice()*cartItem.getQuantity())
        );

        cartItemRepo.deleteCartItemByProductIdAndCartId(cartId, productId);
        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(true);
        apiResponse.setMessage("Product "+ cartItem.getProduct().getProductName()+" removed rom the cart.");
        return new ResponseEntity<>(apiResponse,HttpStatus.OK);
    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepo.findById(cartId)
            .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepo.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItem cartItem = cartItemRepo.findByCartIdAndProductId(cartId, productId);

        if(cartItem == null){
            throw new APIException("Product "+product.getProductName()+" Not available in the cart.");
        }

        // 1000 - 100*2 = 800
        double cartPrice = cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity());

        // get the updated product special price for example 200.
        cartItem.setProductPrice(product.getSpecialPrice());

        // 800 + 200*quantity the new cart total price.
        cart.setTotalPrice(cartPrice + (cartItem.getProductPrice() * cartItem.getQuantity()));
        cartItem = cartItemRepo.save(cartItem);
    }


}

