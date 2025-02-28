package org.example.service;

import jakarta.ejb.Local;
import org.example.model.AccountingRecord;

import java.util.List;


@Local
public interface AccountingRecordServiceLocal {

    AccountingRecord addRecord(AccountingRecord record);
    AccountingRecord get(String id);
    List<AccountingRecord> getAll();
    AccountingRecord updateRecord(String id, AccountingRecord newRecord);
    void deleteRecord(String id);

}
