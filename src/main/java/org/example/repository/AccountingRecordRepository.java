package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.AccountingRecord;

@ApplicationScoped
public class AccountingRecordRepository {

    private final MongoCollection<AccountingRecord> collection;
    public FindIterable<AccountingRecord> findAll() {
        return collection.find();
    }

    public AccountingRecordRepository() {
        this.collection = MongoDBConfig.getDatabase().getCollection("accounting_records", AccountingRecord.class);
    }

    public AccountingRecord findById(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    public AccountingRecord save(AccountingRecord record) {
        collection.insertOne(record);
        return record;
    }

    public AccountingRecord update(String id, AccountingRecord newInfo) {
        collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);
        return newInfo;
    }

    public void delete(String id) {
        collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }
}
