package com.example.Bookstore_Inventory.Controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") // allow your frontend to access
public class UserController {

    @GetMapping("/profile")
    public Map<String, Object> userProfile(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes(); // returns user info like name, email, picture
    }
}
