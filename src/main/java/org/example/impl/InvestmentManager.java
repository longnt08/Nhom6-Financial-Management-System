package org.example.impl;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.Investment;

import java.util.ArrayList;
import java.util.List;

public class InvestmentManager {
    private final MongoCollection<Investment> collection;

    public InvestmentManager() {
        this.collection = MongoDBConfig.getDatabase().getCollection("investments", Investment.class);
    }

    public List<Investment> getAllInvestments() {
        return collection.find().into(new ArrayList<>());
    }

    public Investment getInvestmentById(ObjectId id) {
        return collection.find(Filters.eq("_id", id)).first();
    }

    public void addInvestment(Investment investment) {
        collection.insertOne(investment);
    }

    public boolean updateInvestment(ObjectId id, Investment newInfo) {
        return collection.replaceOne(Filters.eq("_id", id), newInfo).getMatchedCount() > 0;
    }

    public void deleteInvestment(ObjectId id) {
        collection.deleteOne(Filters.eq("_id", id));
    }
}
