package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.example.impl.AccountingReport;

@Local
public interface AccountingReportServiceLocal {

    AccountingReport getById(String id);

    AccountingReport create(AccountingReport report);

    FindIterable<AccountingReport> getAll();
}
