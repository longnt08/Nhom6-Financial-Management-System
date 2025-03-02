package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.example.model.Investment;

@Local
public interface InvestmentServiceLocal {
    FindIterable<Investment> getAll();
    Investment get(String id);
    Investment addInvestment(Investment record);
    Investment updateInvestment(String id, Investment newInfo);
    void deleteInvestment(String id);
}

