package org.example.service;

import com.mongodb.client.FindIterable;
import jakarta.ejb.Local;
import org.bson.types.ObjectId;
import org.example.model.AccountingReport;

import java.util.Date;
import java.util.List;

@Local
public interface AccountingReportServiceLocal {

    AccountingReport getById(String id);

    AccountingReport createReport(AccountingReport report);

    List<AccountingReport> getAll();

    AccountingReport updateReport(String id, AccountingReport newInfo);
}
