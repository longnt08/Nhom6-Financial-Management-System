package org.example.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.AccountingRecord;
import org.example.model.User;

import static com.mongodb.client.model.Filters.eq;

public class UserRepository {
    private final MongoCollection<Document> userCollection;

    public UserRepository() {
        this.userCollection = MongoDBConfig.getDatabase().getCollection("users", Document.class);

    }

    public User save(User user) {
        Document doc = new Document()
                .append("username", user.getUsername())
                .append("password", user.getPassword())
                .append("email", user.getEmail())
                .append("role", user.getRole())
                .append("createdAt", user.getCreatedAt());

        userCollection.insertOne(doc);
        user.setId(doc.getObjectId("_id"));
        return user;
    }

    public User findByUsername(String username) {
        Document doc = userCollection.find(eq("username", username)).first();
        if (doc == null) return null;

        User user = new User();
        user.setId(doc.getObjectId("_id"));
        user.setUsername(doc.getString("username"));
        user.setPassword(doc.getString("password"));
        user.setEmail(doc.getString("email"));
        user.setRole(doc.getString("role"));
        user.setCreatedAt(doc.getDate("createdAt"));

        return user;
    }
}
