package com.example.ecommerce;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.ecommerce.models.AppRole;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.repository.RoleRepo;
@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}
	
    @Bean
    CommandLineRunner seedRoles(RoleRepo roleRepo) {
        return args -> {
            for (AppRole appRole : AppRole.values()) {
                // requires existsByRoleName OR findByRoleName
                if (!roleRepo.existsByRoleName(appRole)) {
                    Role r = new Role();
                    r.setRoleName(appRole);
                    roleRepo.save(r);
                }
            }
        };
	}

}
