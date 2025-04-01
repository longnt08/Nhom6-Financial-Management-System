package org.example.impl;

import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.example.api.accounting.AccountingTypes;
import org.example.model.AccountingRecord;
import org.example.model.AccountingReport;
import org.example.repository.AccountingRecordRepository;
import org.example.repository.AccountingReportRepository;
import org.example.service.AccountingReportServiceLocal;

import java.time.Instant;
import java.util.*;


@Stateful
@Local
public class AccountingReportService implements AccountingReportServiceLocal {

    @Inject
    private AccountingReportRepository repository;
    @Inject
    private AccountingRecordRepository recordRepository;

    @Override
    public List<AccountingReport> getAll() {
        return repository.getAll();
    }

    @Override
    public AccountingReport getById(String id) {
        return repository.findById(id);
    }

    @Override
    public AccountingReport createReport(AccountingReport report) {
        Date startDate = report.getStartDate(), endDate = report.getEndDate();

        List<AccountingRecord> records = recordRepository.getByDateRange(startDate, endDate);

        List<AccountingReport.ReportContent> content = createReportContent(records);

        report.setDate_created(Date.from(Instant.now()));
        report.setContent(content);

        return repository.save(report);
    }

    @Override
    public AccountingReport updateReport(String id, AccountingReport newInfo) {
        Date startDate = newInfo.getStartDate(), endDate = newInfo.getEndDate();

        List<AccountingRecord> records = recordRepository.getByDateRange(startDate, endDate);
        List<AccountingReport.ReportContent> content = createReportContent(records);
        newInfo.setContent(content);
        return repository.update(id, newInfo);
    }

    @Override
    public void deleteReport(String id) {
        repository.delete(id);
    }

    //helper method cho create va update
    private List<AccountingReport.ReportContent> createReportContent(List<AccountingRecord> records) {
        List<AccountingReport.ReportContent> content = new ArrayList<>();
        Map<Integer, Double> categoryAmounts = new HashMap<>();

        //tinh amount theo category khong co equations
        for (AccountingRecord record : records) {
            AccountingTypes category = record.getCategory();
            int categoryId = category.getStandardId();

            if ((categoryId >= 1 && categoryId <= 10) || categoryId == 21 || categoryId == 31) {
                categoryAmounts.put(categoryId,
                        categoryAmounts.getOrDefault(categoryId, 0.0) + (record.getCredit() - record.getDebit()));
            } else {
                categoryAmounts.put(categoryId,
                        categoryAmounts.getOrDefault(categoryId, 0.0) + (record.getDebit() - record.getCredit()));
            }
        }
        //co equations
        for (AccountingTypes type : AccountingTypes.values()) {
            if (type.getEquation() != null && !type.getEquation().isEmpty()) {
                int standardId = type.getStandardId();
                categoryAmounts.put(standardId, calculateFromEquation(type.getEquation(), categoryAmounts));
            }
        }

        // tao content
        for (AccountingTypes type : AccountingTypes.values()) {
            double amount = categoryAmounts.getOrDefault(type.getStandardId(), 0.0);
            content.add(new AccountingReport.ReportContent(type.getName(), amount));
        }

        return content;
    }

    private double calculateFromEquation(String equation, Map<Integer, Double> categoryAmounts) {
        //tach equation trong AccountingTypes ra de tinh
        String[] parts = equation.split("\\s+");
        double result = 0.0;
        String operator = "+";

        for (String part : parts) {
            if ("+".equals(part) || "-".equals(part)) {
                operator = part;
            } else {
                int standardId = Integer.parseInt(part);
                double value = categoryAmounts.getOrDefault(standardId, 0.0);

                if ("+".equals(operator)) {
                    result += value;
                } else {
                    result -= value;
                }
            }
        }
        return result;
    }
}
