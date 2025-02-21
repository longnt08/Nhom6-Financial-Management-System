package org.example.model;

import org.bson.types.ObjectId;
import java.util.Date;
import lombok.Data;

@Data
public class User {
    private ObjectId _id;
    private String username;
    private String password;
    private String role;
    private String email;
    private Date createdAt;

    public User() {
        this.createdAt = new Date();
    }

    public void setId(ObjectId id) {
        this._id = id;
    }
}
