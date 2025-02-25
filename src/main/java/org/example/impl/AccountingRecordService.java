package org.example.impl;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.example.model.AccountingRecord;
import org.example.repository.AccountingRecordRepository;
import org.example.service.AccountingRecordServiceLocal;


@Stateful
@Local
public class AccountingRecordService implements AccountingRecordServiceLocal {
    @Inject
    private AccountingRecordRepository repository;

    @Override
    public FindIterable<AccountingRecord> getAll() {
        return repository.findAll();
    }

    @Override
    public AccountingRecord get(String id) {
        return repository.findById(id);
    }

    @Override
    public AccountingRecord addRecord(AccountingRecord record) {
        return repository.save(record);
    }

    @Override
    public AccountingRecord updateRecord(String id, AccountingRecord newInfo) {
        return repository.update(id, newInfo);
    }

    @Override
    public void deleteRecord(String id) {
        repository.delete(id);
    }



}
