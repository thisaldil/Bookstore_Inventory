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

    public Optional<Admin> validateCredentials(String username, String password) {
        return adminRepository.findByUsername(username)
                .filter(admin -> admin.getPassword().equals(password));
    }
}
