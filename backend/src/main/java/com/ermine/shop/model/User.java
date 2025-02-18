package com.ermine.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name="password")
    private String password;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Column(name="provider_id")
    private String providerId;

    @ElementCollection(fetch=FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<Role> roles = Set.of(Role.ROLE_USER);

    @Builder.Default
    private boolean enabled = true;

    @CreationTimestamp
    @Column(name="created_at", updatable = false)
    private Instant createdAt;
}

