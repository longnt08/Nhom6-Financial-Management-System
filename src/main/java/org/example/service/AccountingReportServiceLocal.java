package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.example.model.AccountingReport;

import java.util.List;

@Local
public interface AccountingReportServiceLocal {

    AccountingReport getById(String id);

    AccountingReport create(AccountingReport report);

    List<AccountingReport> getAll();
}
