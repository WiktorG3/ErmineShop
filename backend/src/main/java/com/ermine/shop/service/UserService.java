package com.ermine.shop.service;

import com.ermine.shop.DTO.UserDTO;
import com.ermine.shop.model.AuthProvider;
import com.ermine.shop.model.User;
import com.ermine.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserDTO registerLocalUser(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }

        User user = User.builder()
            .email(email)
            .password(passwordEncoder.encode(password))
            .provider(AuthProvider.LOCAL)
            .build();

        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Transactional
    public UserDTO processOAuth2User(String email, AuthProvider provider, String providerId) {
        Optional<User> existingUser = userRepository.findByProviderAndProviderId(provider, providerId);
        if(existingUser.isPresent()) {
            return mapToDTO(existingUser.get());
        }
        existingUser = userRepository.findByEmail(email);
        if(existingUser.isPresent()) {
            User user = existingUser.get();
            user.setProvider(provider);
            user.setProviderId(providerId);
            return mapToDTO(userRepository.save(user));
        }
        User newUser = User.builder()
                .email(email)
                .provider(provider)
                .providerId(providerId)
                .build();
        return mapToDTO(userRepository.save(newUser));
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .provider(user.getProvider())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
