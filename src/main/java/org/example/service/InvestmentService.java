package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.example.model.Investment;
import org.example.repository.InvestmentRepository;

@Stateful
@Local
public class InvestmentService implements InvestmentServiceLocal {
    @Inject
    private InvestmentRepository repository;

    @Override
    public FindIterable<Investment> getAll() {
        return repository.findAll();
    }

    @Override
    public Investment get(String id) {
        return repository.findById(id);
    }

    @Override
    public Investment addInvestment(Investment record) {
        return repository.save(record);
    }

    @Override
    public Investment updateInvestment(String id, Investment newInfo) {
        return repository.update(id, newInfo);
    }

    @Override
    public void deleteInvestment(String id) {
        repository.delete(id);
    }
}

