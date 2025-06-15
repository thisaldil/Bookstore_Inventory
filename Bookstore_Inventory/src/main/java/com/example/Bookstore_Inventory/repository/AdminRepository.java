package com.example.Bookstore_Inventory.repository;

import com.example.Bookstore_Inventory.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
    Admin findByUsername(String username); // Added
}
