package com.example.Bookstore_Inventory;

import com.example.Bookstore_Inventory.model.Admin;
import com.example.Bookstore_Inventory.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreInventoryApplication implements CommandLineRunner {

	@Autowired
	private AdminRepository adminRepository;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreInventoryApplication.class, args);
	}

	@Override
	public void run(String... args) {
		adminRepository.save(new Admin(null, "admin", "admin123"));
	}
}
