package org.example.impl;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import jakarta.ejb.Stateful;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.api.budget.BudgetType;
import org.example.model.Budget;
import org.example.service.BudgetServiceLocal;

import java.util.ArrayList;
import java.util.List;

@Stateful
public class BudgetService implements BudgetServiceLocal {
    private MongoCollection<Budget> collection;

    public BudgetService() {
        collection = MongoDBConfig.getDatabase().getCollection("budgets", Budget.class);
    }

    @Override
    public List<Budget> getAll() {
        return collection.find().into(new ArrayList<>()); // Chuyển FindIterable thành List
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
        DeleteResult result = collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
        return result.getDeletedCount() > 0; // Trả về true nếu xóa thành công
    }

    @Override
    public List<Budget> getBudgets(BudgetType type) {
        return collection.find(Filters.eq("type", type)).into(new ArrayList<>());
    }
}


