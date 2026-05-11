package com.example.StudentManagement.controller;

import com.example.StudentManagement.dto.AuthRequest;
import com.example.StudentManagement.dto.AuthResponse;
import com.example.StudentManagement.entity.AppUser;
import com.example.StudentManagement.repository.AppUserRepository;
import com.example.StudentManagement.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            AppUserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        AppUser user = repository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getRole(),
                user.getUsername()
        );
    }

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody AppUser user) {

        boolean exists = repository.findByUsername(user.getUsername()).isPresent();

        if (exists) {
            return "Username already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        repository.save(user);

        return "User Registered Successfully";
    }
}