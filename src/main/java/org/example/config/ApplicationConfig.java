package org.example.config;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.example.controller.*;
import org.example.filter.CorsFilter;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        
        // Register controllers
        classes.add(AccountingController.class);
        classes.add(AuditController.class);
        classes.add(BudgetController.class);
        classes.add(InvestmentController.class);
        classes.add(UserController.class);
        
        // Register filters
        classes.add(CorsFilter.class);
        
        return classes;
    }
}
