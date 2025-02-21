package org.example.api.user;

import org.example.model.User;

public interface UserService {
    User register(String username, String password, String email, String role);
    User login(String username, String password);
}
