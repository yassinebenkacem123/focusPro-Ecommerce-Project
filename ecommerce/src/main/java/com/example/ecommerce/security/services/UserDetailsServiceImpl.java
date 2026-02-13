package com.example.ecommerce.security.services;

import com.example.ecommerce.config.Provider;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.ecommerce.models.AppRole;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repository.RoleRepo;
import com.example.ecommerce.repository.UserRepo;
import java.util.UUID;

import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("the user with the name " + username + " not found");
        }

        return UserDetailsImpl.build(user);
    }

    @Transactional
    public User processOAuthUser(String email, String name, String imageUrl, String providerId) {
        User existingUser = userRepo.findByEmail(email);
        if (existingUser != null) {

            if (existingUser.getProvider() == null || existingUser.getProvider() == Provider.LOCAL) {
                existingUser.setProvider(Provider.GOOGLE);
                existingUser.setProviderId(providerId);
                if (imageUrl != null) {
                    existingUser.setImageUrl(imageUrl);
                }
                userRepo.save(existingUser);
            }

            return existingUser;

        } else {
            if (providerId != null) {
                User userByProvider = userRepo.findByProviderId(providerId);
                if (userByProvider != null) {
                    userByProvider.setEmail(email);
                    userRepo.save(userByProvider);
                    return userByProvider;
                }
            }

            User newUser = new User();
            newUser.setEmail(email);

            String username = generateUsername(email, name);
            newUser.setUsername(username);
            newUser.setProvider(Provider.GOOGLE);
            newUser.setProviderId(providerId);

            newUser.setPassword(UUID.randomUUID().toString()); // Set a random password for OAuth users
            if (imageUrl != null) {
                newUser.setImageUrl(imageUrl);
            }

            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepo.findByRoleName(AppRole.ROLE_USER);
            roles.add(userRole);
            newUser.setUserRoles(roles);
            return userRepo.save(newUser);

        }
    }

    private String generateUsername(String email, String name) {
        String baseUsername;

        if (name != null && !name.trim().isEmpty()) {
            // Use name if available, remove spaces and special characters
            baseUsername = name.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        } else {
            baseUsername = email.split("@")[0];
        }

        // Ensure username is at least 4 characters
        if (baseUsername.length() < 4) {
            baseUsername = baseUsername + "user";
        }

        String username = baseUsername;
        int counter = 1;

        // Check if username exists, append number if needed
        while (userRepo.findByUsername(username) != null) {
            username = baseUsername + counter;
            counter++;
        }

        return username;
    }

}
