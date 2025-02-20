package com.ermine.shop.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ermine.shop.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**", "/auth/**", "/api/auth/register").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .loginPage("/login")
                    .loginProcessingUrl("/auth/login")
                    .successHandler((request, response, authentication) -> {
                        String email = authentication.getName();
                        String jwt = generateJwtToken(email);
                        response.sendRedirect("http://localhost:3000/dashboard?token=" + jwt);
                    })
            )
            .oauth2Login(oauth -> {
                oauth.userInfoEndpoint(userInfo ->
                        userInfo.userService(customOAuth2UserService)
                );
                oauth.successHandler((request, response, authentication) -> {
                    String email = authentication.getName();
                    String jwt = generateJwtToken(email);
                    response.sendRedirect("http://localhost:3000/auth/callback?token=" + jwt);
                });
            });
        return http.build();
    }

    private String generateJwtToken(String email) {
        String secret = System.getenv("JWT_SECRET");
        if (secret == null) {
            throw new IllegalStateException("Brak zmiennej środowiskowej JWT_SECRET");
        }
        return JWT.create()
                .withSubject(email)
                .sign(Algorithm.HMAC256(secret));
    }
}
