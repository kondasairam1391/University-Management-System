package com.example.StudentManagement.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "mysupersecretkeymysupersecretkey123456";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes()
            );

    public String generateToken(
            String username) {

        return Jwts.builder()

                .subject(username)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(key)

                .compact();
    }

    public String extractUsername(
            String token) {

        Claims claims =
                Jwts.parser()

                        .verifyWith(key)

                        .build()

                        .parseSignedClaims(token)

                        .getPayload();

        return claims.getSubject();
    }
}