package com.example.ecommerce.services;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Address;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.OrderItem;
import com.example.ecommerce.models.Payment;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.payload.OrderDTO;
import com.example.ecommerce.payload.OrderItemDTO;
import com.example.ecommerce.payload.OrderRequestDTO;
import com.example.ecommerce.payload.ProductDTO;
import com.example.ecommerce.repository.AddressRepo;
import com.example.ecommerce.repository.CartRepo;
import com.example.ecommerce.repository.OrderItemRepo;
import com.example.ecommerce.repository.OrderRepo;
import com.example.ecommerce.repository.PaymentRepo;
import com.example.ecommerce.repository.ProductRepo;
import com.example.ecommerce.utils.AuthUtils;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    AuthUtils authUtils;

    @Autowired 
    CartRepo cartRepo;

    @Autowired
    AddressRepo addressRepo;

    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    OrderRepo orderRepo;
    @Autowired
    OrderItemRepo orderItemRepo;

    @Autowired 
    ModelMapper modelMapper;

    @Autowired
    ProductRepo productRepo;

    @Autowired
    CartService cartService;

    @Transactional
    @Override
    public ResponseEntity<OrderDTO> makeOrderService(
        OrderRequestDTO orderRequestDTO, 
        String paymentMethod
    ) {
        User user = authUtils.loggedInUser();
        Cart cart = cartRepo.findByUserEmail(user.getEmail());
        if(cart == null){
            throw new ResourceNotFoundException("The cart is Empty.");
        }
        Order order = new Order();
        order.setEmail(user.getEmail());
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setStatus("Passed.");

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(paymentMethod);
        payment.setPgName(orderRequestDTO.getPgName());
        payment.setPgPaymentId(orderRequestDTO.getPgPaymentId());
        payment.setPgStatus(orderRequestDTO.getPgStatus());
        payment.setPgResponseMessage(orderRequestDTO.getPgResponseMessage());

        paymentRepo.save(payment);
        order.setPayment(payment);
        Address address = new Address();

        address = addressRepo.findById(orderRequestDTO.getAddressId())
            .orElseThrow(()-> new ResourceNotFoundException("Address","AddressId",orderRequestDTO.getAddressId()));
    
        order.setAddress(address);
        Order savedOrder = orderRepo.save(order);

        List<CartItem> cartItems = cart.getCartItems();
        if(cartItems.isEmpty()){
            throw new ResourceNotFoundException("The cart is empty.");
        }

        List<OrderItem> orderItems = cartItems.stream().map(cartItem ->{
            OrderItem orderItem = new OrderItem();
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(savedOrder);
            return orderItem;
        }).collect(Collectors.toList());

        orderItems = orderItemRepo.saveAll(orderItems);
        //update the stock :
        cartItems.forEach(item -> {
            int quantity = item.getQuantity();
            Product product = item.getProduct();
            product.setQuantity(product.getQuantity() - quantity);
            productRepo.save(product);
            cartService.deleteProductFromCartSerivce(cart.getCartId(), item.getProduct().getProductId());

        });
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item-> 
            {   OrderItemDTO itemDTO = new OrderItemDTO();
                itemDTO = modelMapper.map(item, OrderItemDTO.class);
                itemDTO.setProductDTO(modelMapper.map(item.getProduct(),ProductDTO.class));
                orderDTO.getOrderItems().add(itemDTO);
            });
        orderDTO.setAddressId(orderRequestDTO.getAddressId());
        return new ResponseEntity<>(orderDTO,HttpStatus.CREATED);
    }
}
