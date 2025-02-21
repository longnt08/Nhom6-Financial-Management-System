package org.example.utils;

import org.mindrot.jbcrypt.BCrypt;

public class HashUtil {
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean verifyPassword(String password, String hashed) {
        return BCrypt.checkpw(password, hashed);
    }
}
