package org.example.impl;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.example.model.AccountingReport;
import org.example.repository.AccountingReportRepository;
import org.example.service.AccountingReportServiceLocal;


@Stateful
@Local
public class AccountingReportService implements AccountingReportServiceLocal {

    @Inject
    private AccountingReportRepository repository;

    @Override
    public FindIterable<AccountingReport> getAll() {
        return repository.getAll();
    }

    @Override
    public AccountingReport getById(String id) {
        return repository.findById(id);
    }

    @Override
    public AccountingReport create(AccountingReport report) {
        return repository.save(report);
    }
}
