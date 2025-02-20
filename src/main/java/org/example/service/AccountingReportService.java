package org.example.service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import jakarta.ejb.Stateful;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.impl.AccountingReport;

import java.util.ArrayList;
import java.util.List;


@Stateful
public class AccountingReportService implements AccountingReportServiceLocal{
    private MongoCollection<AccountingReport> collection;

    public AccountingReportService() {
        this.collection = MongoDBConfig.getDatabase().getCollection("financial_reports", AccountingReport.class);
    }

    public void getAll() {

    }

    public AccountingReport getById(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    public AccountingReport create(AccountingReport report) {
        if (report.getId() == null) {
            report.setId(new ObjectId());
        }
        collection.insertOne(report);
        return report;
    }
}
