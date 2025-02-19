package com.ermine.shop.controller;

import com.ermine.shop.DTO.RegistrationRequest;
import com.ermine.shop.DTO.UserDTO;
import com.ermine.shop.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationRequest request) {
        UserDTO user = userService.registerLocalUser(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(user);
    }
}
