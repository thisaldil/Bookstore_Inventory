package com.example.Bookstore_Inventory.service;

import com.example.Bookstore_Inventory.model.Admin;
import com.example.Bookstore_Inventory.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin saveOrUpdateGoogleUser(String email, String name, String picture) {
        Optional<Admin> existingUser = adminRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            Admin user = existingUser.get();
            user.setName(name);
            user.setPicture(picture);
            return adminRepository.save(user);
        } else {
            Admin newUser = new Admin();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPicture(picture);
            return adminRepository.save(newUser);
        }
    }
}
