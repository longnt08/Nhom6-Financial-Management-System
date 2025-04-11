package org.example.api.budget;


public enum BudgetType {
    HUMAN_RESOURCES,
    TECHNOLOGY,
    R_AND_D,
    MARKETING,
    OPERATION,
    FOOD,
    INVESTMENT;

    public static BudgetType parse(String type) {
        for(BudgetType budgetType : values()) {
            if(budgetType.toString().equalsIgnoreCase(type)) return budgetType;
        }
        throw new IllegalArgumentException("There is no BudgetType whose name is '" + type + "'");
    }
}

