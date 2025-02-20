package org.example.service;

import jakarta.ejb.Local;
import org.example.impl.AccountingReport;

@Local
public interface AccountingReportServiceLocal {

    AccountingReport getById(String id);

    AccountingReport create(AccountingReport report);
}
