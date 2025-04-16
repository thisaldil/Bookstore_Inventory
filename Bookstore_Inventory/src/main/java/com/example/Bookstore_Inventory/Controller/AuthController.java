package com.example.Bookstore_Inventory.controller;

import com.example.Bookstore_Inventory.security.JwtUtil;
import com.example.Bookstore_Inventory.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // or 3001 if needed
public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return adminService.validateCredentials(username, password)
                .map(admin -> {
                    String token = jwtUtil.generateToken(username);
                    Map<String, String> response = new HashMap<>();
                    response.put("token", token);
                    return response;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    }
}
