package org.example.api.user;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
public class LoginRequest {
    String username;
    String password;
}
