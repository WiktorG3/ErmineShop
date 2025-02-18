package com.ermine.shop.DTO;

import com.ermine.shop.model.AuthProvider;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class UserDTO {
    private UUID id;
    private String email;
    private AuthProvider provider;
    private Instant createdAt;
}
