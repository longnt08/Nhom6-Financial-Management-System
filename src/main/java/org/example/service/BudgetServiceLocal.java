package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.example.impl.Budget;
import org.example.impl.BudgetType;

import java.util.List;

@Local
public interface BudgetServiceLocal {
    FindIterable<Budget> getAll();
    Budget get(String id);
    Budget addBudget(Budget budget);
    Budget updateBudget(String id, Budget newInfo);
    boolean deleteBudget(String id);

    List<Budget> getBudgets(BudgetType type);
}
