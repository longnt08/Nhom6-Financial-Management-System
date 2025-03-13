package org.example.service;

import jakarta.ejb.Local;
import org.example.model.AccountingReport;

import java.util.List;

@Local
public interface AccountingReportServiceLocal {

    AccountingReport getById(String id);

    AccountingReport createReport(AccountingReport report);

    List<AccountingReport> getAll();

    AccountingReport updateReport(String id, AccountingReport newInfo);
}
