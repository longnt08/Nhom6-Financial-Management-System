package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.Investment;

@ApplicationScoped
public class InvestmentRepository {

    private final MongoCollection<Investment> collection;

    public InvestmentRepository() {
        this.collection = MongoDBConfig.getDatabase().getCollection("investment_records", Investment.class);
    }

    public FindIterable<Investment> findAll() {
        return collection.find();
    }

    public Investment findById(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    public Investment save(Investment record) {
        collection.insertOne(record);
        return record;
    }

    public Investment update(String id, Investment newInfo) {
        collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);
        return newInfo;
    }

    public void delete(String id) {
        collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }
}

