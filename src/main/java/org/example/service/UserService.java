package org.example.service;

import org.example.model.User;

public interface UserService {
    User register(String username, String password, String email, String role);
    boolean checkRegister(String username, String password, String email, String role);
    User authenticate(String username, String password);
    User login(String username, String password);
}
