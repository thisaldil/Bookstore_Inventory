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
		String encodedPassword = passwordEncoder.encode("admin123");

		if (adminRepository.findByUsername("admin") == null) {
			Admin admin = new Admin(
					"admin@gmail.com",
					"Admin User",
					"https://example.com/image.jpg",
					"admin",
					encodedPassword
			);
			adminRepository.save(admin);

			System.out.println("✅ Admin inserted with username: admin, encoded password: " + encodedPassword);
		}
	}


}
