package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.AccountingReport;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class AccountingReportRepository {
    private final MongoCollection<AccountingReport> collection;

    public AccountingReportRepository() {
        this.collection = MongoDBConfig.getDatabase().getCollection("financial_reports", AccountingReport.class);
    }
    public List<AccountingReport> getAll() {
        FindIterable<AccountingReport> reports = collection.find();
        List<AccountingReport> reportList = new ArrayList<>();
        for (AccountingReport report : reports) {
            reportList.add(report);
        }

        return reportList;
    }

    public AccountingReport findById(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    public AccountingReport save(AccountingReport report) {
        collection.insertOne(report);
        return report;
    }

    public AccountingReport update(String id, AccountingReport newInfo) {
        collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);
        return newInfo;
    }
}
