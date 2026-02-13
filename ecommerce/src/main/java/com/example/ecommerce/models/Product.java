package com.example.ecommerce.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="products")
public class Product {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @NotBlank(message = "You must provide a product name.")
    @Size(min=2, message = "Product name must contain at least 2 caracters.")
    private String productName;
    
    private String productMainImage;
        
    @Size(min=10,max = 150, message = "Description size must be between 10 and 150.")
    private String description;
    

    @NotNull(message = "You must provide a quantity for the product.")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer quantity;
    private Double price;
    private Double specialPrice;
    private Double discounte;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private Category category;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="seller_id")
    private User user;

    @OneToMany(mappedBy = "product", 
        cascade = 
        {CascadeType.MERGE, 
        CascadeType.PERSIST}, 
        fetch = FetchType.EAGER)
    private List<CartItem> cartItems;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItems = new ArrayList<>();


    @OneToMany(mappedBy = "product", 
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE, 
            CascadeType.REMOVE
        }

    )
    private List<ProductImage> productImages = new ArrayList<>();
}
