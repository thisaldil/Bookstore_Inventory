package com.example.Bookstore_Inventory;

import com.example.Bookstore_Inventory.model.Admin;
import com.example.Bookstore_Inventory.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BookstoreInventoryApplication implements CommandLineRunner {

	@Autowired
	private AdminRepository adminRepository;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreInventoryApplication.class, args);
	}

	@Override
	public void run(String... args) {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		String username = System.getenv("ADMIN_USERNAME");
		String rawPassword = System.getenv("ADMIN_PASSWORD");
		String email = System.getenv("ADMIN_EMAIL");
		String name = System.getenv("ADMIN_NAME");
		String image = System.getenv("ADMIN_IMAGE");

		if (username == null || rawPassword == null) {
			System.err.println("❌ ADMIN_USERNAME or ADMIN_PASSWORD is not set in environment variables.");
			return;
		}

		String encodedPassword = passwordEncoder.encode(rawPassword);

		if (adminRepository.findByUsername(username) == null) {
			Admin admin = new Admin(
					email,
					name,
					image,
					username,
					encodedPassword
			);
			adminRepository.save(admin);
			System.out.println("✅ Admin created: " + username);
		} else {
			System.out.println("ℹ️ Admin already exists: " + username);
		}
	}
}
