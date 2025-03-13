package org.example.impl;

import jakarta.ejb.EJB;
import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.bson.types.ObjectId;
import org.example.api.audit.AuditCategory;
import org.example.model.AccountingRecord;
import org.example.model.AccountingReport;
import org.example.model.Audit;
import org.example.repository.AuditRepository;
import org.example.service.AccountingRecordServiceLocal;
import org.example.service.AccountingReportServiceLocal;
import org.example.service.AuditServiceLocal;

import java.util.ArrayList;
import java.util.List;

@Stateful
@Local
public class AuditService implements AuditServiceLocal {
    @Inject
    private AuditRepository repository;

    @EJB
    private AccountingRecordServiceLocal recordService;

    @EJB
    private AccountingReportServiceLocal reportService;

    @Override
    public Audit getById(String id) {
        return repository.findById(id);
    }

    @Override
    public Audit getByIdWithDocuments(String id) {
        Audit audit = repository.findById(id);
        if (audit != null && audit.getDocumentsId() != null && !audit.getDocumentsId().isEmpty()) {
            populateDocuments(audit);
        }
        return audit;
    }

    @Override
    public Audit create(Audit audit) {
        return repository.save(audit);
    }

    @Override
    public List<Audit> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Audit> getAllWithDocuments() {
        List<Audit> audits = repository.findAll();
        for (Audit audit : audits) {
            if (audit.getDocumentsId() != null && !audit.getDocumentsId().isEmpty()) {
                populateDocuments(audit);
            }
        }
        return audits;
    }

    @Override
    public Audit update(String id, Audit newInfo) {
        return repository.update(id, newInfo);
    }

    @Override
    public void delete(String id) {
        repository.delete(id);
    }

    /**
     * Populates document references based on audit type
     * @param audit The audit object to populate
     */
    private void populateDocuments(Audit audit) {
        if (audit.getAuditType() == AuditCategory.RECORD_INFO) {
            List<AccountingRecord> records = fetchRecords(audit.getDocumentsId());
            audit.setRecords(records);
        } else if (audit.getAuditType() == AuditCategory.CREDIT_AND_DEBIT_MATCHING) {
            List<AccountingReport> reports = fetchReports(audit.getDocumentsId());
            audit.setReports(reports);
        }
    }

    /**
     * Fetches accounting records by their IDs
     */
    private List<AccountingRecord> fetchRecords(List<ObjectId> ids) {
        List<AccountingRecord> records = new ArrayList<>();
        for (ObjectId id : ids) {
            try {
                AccountingRecord record = recordService.get(id.toString());
                if (record != null) {
                    records.add(record);
                }
            } catch (Exception e) {
                System.err.println("Error fetching record with ID " + id + ": " + e.getMessage());
            }
        }
        return records;
    }

    /**
     * Fetches accounting reports by their IDs
     */
    private List<AccountingReport> fetchReports(List<ObjectId> ids) {
        List<AccountingReport> reports = new ArrayList<>();
        for (ObjectId id : ids) {
            try {
                AccountingReport report = reportService.getById(id.toString());
                if (report != null) {
                    reports.add(report);
                }
            } catch (Exception e) {
                System.err.println("Error fetching report with ID " + id + ": " + e.getMessage());
            }
        }
        return reports;
    }
}