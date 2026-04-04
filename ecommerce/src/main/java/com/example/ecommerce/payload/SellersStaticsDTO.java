package com.example.ecommerce.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellersStaticsDTO {
    private int totalSellers;
    private int activeSellers;
    private int inactiveSellers;
    private int pendingApprovalSellers;
}
