package com.taskpulse.service;

import com.taskpulse.dto.AuthDto.*;
import com.taskpulse.model.User;
import com.taskpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().trim().length() < 4) {
            throw new RuntimeException("Password must be at least 4 characters");
        }

        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new RuntimeException("Username '" + request.getUsername() + "' is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new RuntimeException("Email '" + request.getEmail() + "' is already registered");
        }

        User user = new User(request.getUsername().trim(), request.getEmail().trim(), request.getPassword());
        User savedUser = userRepository.save(user);

        return new AuthResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail(), "Registration successful!");
    }

    public AuthResponse loginUser(LoginRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        Optional<User> userOpt = userRepository.findByUsername(request.getUsername().trim());
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(request.getUsername().trim());
        }

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid username/email or password");
        }

        User user = userOpt.get();
        return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), "Login successful!");
    }
}
