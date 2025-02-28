package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.AccountingReport;

@ApplicationScoped
public class AccountingReportRepository {
    private final MongoCollection<AccountingReport> collection;

    public AccountingReportRepository() {
        this.collection = MongoDBConfig.getDatabase().getCollection("financial_reports", AccountingReport.class);
    }
    public FindIterable<AccountingReport> getAll() {
        return collection.find();
    }

    public AccountingReport findById(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    public AccountingReport save(AccountingReport report) {
        collection.insertOne(report);
        return report;
    }
}
