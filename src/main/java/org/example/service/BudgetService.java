package org.example.service;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import jakarta.ejb.Stateful;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.api.budget.BudgetType;
import org.example.impl.Budget;

import java.util.List;

@Stateful
public class BudgetService implements BudgetServiceLocal {
    private MongoCollection<Budget> collection;

    public BudgetService() {
        collection = MongoDBConfig.getDatabase().getCollection("budgets", Budget.class);
    }

    @Override
    public FindIterable<Budget> getAll() {
        return collection.find();
    }

    @Override
    public Budget get(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    @Override
    public Budget addBudget(Budget budget) {
        collection.insertOne(budget);
        return budget;
    }

    @Override
    public Budget updateBudget(String id, Budget newInfo) {
        UpdateResult result = collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);
        return result.getMatchedCount() == 1 ? newInfo : null;
    }

    @Override
    public boolean deleteBudget(String id) {
        collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
        return false;
    }

    @Override
    public List<Budget> getBudgets(BudgetType type) {
        return List.of();
    }
}


