package org.example.impl;

import jakarta.ejb.Stateless;
import org.example.service.UserService;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.utils.HashUtil;

@Stateless
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository = new UserRepository();

    @Override
    public User register(String username, String password, String email, String role) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already exists!");
        }

        String hashedPassword = HashUtil.hashPassword(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setEmail(email);
        user.setRole(role);

        return userRepository.save(user);
    }

    @Override
    public boolean checkRegister(String username, String password, String email, String role) {
        if (userRepository.findByUsername(email) != null) {
            return false;
        }

        return true;
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !HashUtil.verifyPassword(password, user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }

    @Override
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !HashUtil.verifyPassword(password, user.getPassword())) {
            return null;
        }
        return user;
    }

}
