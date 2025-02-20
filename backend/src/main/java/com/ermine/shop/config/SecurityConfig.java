package com.ermine.shop.config;

import com.ermine.shop.security.JwtUtil;
import com.ermine.shop.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtUtil jwtUtil;
    private final CustomOAuth2UserService customOAuth2UserService;
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**", "/auth/**", "/api/auth/register", "/api/auth/login").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .loginPage("/login")
                    .loginProcessingUrl("/auth/login")
                    .successHandler((request, response, authentication) -> {
                        String email = authentication.getName();
                        String jwt = jwtUtil.generateToken(email);
                        response.sendRedirect("http://localhost:5173/home?token=" + jwt);
                    })
            )
            .oauth2Login(oauth -> {
                oauth.userInfoEndpoint(userInfo ->
                        userInfo.userService(customOAuth2UserService)
                );
                oauth.authorizationEndpoint(authorization ->
                        authorization.baseUri("/oauth2/authorization")
                );
                oauth.redirectionEndpoint(redirection ->
                        redirection.baseUri("/login/oauth2/code/*")
                );
                oauth.successHandler((request, response, authentication) -> {
                    String email = authentication.getName();
                    String jwt = jwtUtil.generateToken(email);
                    response.addHeader("Authorization", "Bearer " + jwt);
                    response.sendRedirect("http://localhost:5173/auth/callback?token=" + jwt);
                });
                oauth.failureHandler((request, response, exception) -> {
                    logger.error("OAuth2 authentication failed: " + exception.getMessage());
                    response.sendRedirect("http://localhost:5173/login?error=oauth_failed");
                });
            });
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
