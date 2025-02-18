package com.ermine.shop.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**", "/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .successHandler((request, response, authentication) -> {
                    String jwt = generateJwtToken(authentication);
                    response.sendRedirect("http://localhost:3000/auth/callback?token=" + jwt);
                })
            );
        return http.build();
    }

    private String generateJwtToken(Authentication authentication) {
        String secret = System.getenv("JWT_SECRET");
        if (secret == null) {
            throw new IllegalStateException("Brak zmiennej środowiskowej JWT_SECRET");
        }
        return JWT.create()
                .withSubject(authentication.getName())
                .sign(Algorithm.HMAC256(secret));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
