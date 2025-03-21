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
}