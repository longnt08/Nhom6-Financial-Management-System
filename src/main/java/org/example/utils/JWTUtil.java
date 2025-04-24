package org.example.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.model.User;

import java.util.Date;

public class JWTUtil {

    public static String generateToken(User user) {
        String result = Jwts.builder()
                .setId(user.get_id().toString())
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 giờ
                .compact();
        System.out.println(result + "user");
        return result;
    }
}
