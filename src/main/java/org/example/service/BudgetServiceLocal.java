package org.example.service;

import jakarta.ejb.Local;
import org.example.api.budget.BudgetType;
import org.example.model.Budget;

import java.util.List;

@Local
public interface BudgetServiceLocal {
    List<Budget> getAll();

    Budget get(String id);

    Budget addBudget(Budget budget);

    Budget updateBudget(String id, Budget newInfo);

    boolean deleteBudget(String id);

    List<Budget> getBudgets(BudgetType type);
}
