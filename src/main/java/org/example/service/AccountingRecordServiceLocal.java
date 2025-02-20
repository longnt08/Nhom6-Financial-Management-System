package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.example.impl.AccountingRecord;


@Local
public interface AccountingRecordServiceLocal {

    AccountingRecord addRecord(AccountingRecord record);
    AccountingRecord get(String id);
    FindIterable<AccountingRecord> getAll();
    AccountingRecord updateRecord(String id, AccountingRecord newRecord);
    void deleteRecord(String id);

}
