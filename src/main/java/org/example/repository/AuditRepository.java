package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.Audit;
import org.example.model.Audit;

import java.util.ArrayList;
import java.util.List;

public class AuditRepository {
    private final MongoCollection<Audit> collection;
    public List<Audit> findAll() {
        FindIterable<Audit> audits = collection.find();
        List<Audit> auditList = new ArrayList<>();
        for (Audit audit : audits) {
            auditList.add(audit);
        }
        return auditList;
    }

    public AuditRepository() {
        this.collection = MongoDBConfig.getDatabase().getCollection("audits",Audit.class);
    }

    public Audit findById(String id) {
        Audit audit = collection.find(Filters.eq("_id", new ObjectId(id))).first();
        return audit;
    }

    public Audit save(Audit audit) {
        collection.insertOne(audit);
        return audit;
    }

    public Audit update(String id, Audit newInfo) {
        collection.replaceOne(Filters.eq("_id", new ObjectId(id)), newInfo);
        return newInfo;
    }

    public void delete(String id) {
        collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }
}
