package org.example.service;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import jakarta.ejb.Stateful;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.impl.AccountingRecord;


@Stateful
public class AccountingRecordService implements AccountingRecordServiceLocal{
    private MongoCollection<AccountingRecord> collection;

    public AccountingRecordService() {
        collection = MongoDBConfig.getDatabase().getCollection("accounting_records", AccountingRecord.class);
    }


    @Override
    public FindIterable<AccountingRecord> getAll() {
        return collection.find();
    }

    @Override
    public AccountingRecord get(String id) {
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
    }

    @Override
    public AccountingRecord addRecord(AccountingRecord record) {
        collection.insertOne(record);
        return record;
    }

    @Override
    public AccountingRecord updateRecord(String id, AccountingRecord newInfo) {
        UpdateResult result = collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);

        if (result.getMatchedCount() == 1) {
            return newInfo;
        } else {
            return null;
        }
    }

    @Override
    public void deleteRecord(String id) {
        collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }



}
