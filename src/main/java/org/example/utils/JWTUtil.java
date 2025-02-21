package org.example.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.model.User;

import java.util.Date;

public class JWTUtil {
    private static final String SECRET_KEY = "your_secret_key";

    public static String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 giờ
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
