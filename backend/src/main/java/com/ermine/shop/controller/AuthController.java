package com.ermine.shop.controller;

import com.ermine.shop.DTO.LoginRequest;
import com.ermine.shop.DTO.RegistrationRequest;
import com.ermine.shop.DTO.UserDTO;
import com.ermine.shop.security.JwtUtil;
import com.ermine.shop.service.CustomUserDetailsService;
import com.ermine.shop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationRequest request) {
        UserDTO user = userService.registerLocalUser(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        UserDTO user = userService.getUserByEmail(loginRequest.getEmail());
        String token = jwtUtil.generateToken(loginRequest.getEmail());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(user);
    }
}
