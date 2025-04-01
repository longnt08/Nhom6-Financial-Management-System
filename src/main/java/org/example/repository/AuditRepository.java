package org.example.repository;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import jakarta.enterprise.context.ApplicationScoped;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.example.MongoDBConfig;
import org.example.model.Audit;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ApplicationScoped
public class AuditRepository {
    private final MongoCollection<Audit> collection;
    MongoCollection<Document> auditDocuments = MongoDBConfig.getDatabase().getCollection("audits");

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
        return collection.find(Filters.eq("_id", new ObjectId(id))).first();
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

    public Document findByIdWithRelations(String id) {
        Bson match = Filters.eq("_id", new ObjectId(id));

        List<Bson> pipeline = Arrays.asList(
                Aggregates.match(match),
                Aggregates.lookup("accounting_records", "records_id", "_id", "records"),
                Aggregates.lookup("financial_reports", "reports_id", "_id", "reports")
        );

        var result = auditDocuments.aggregate(pipeline).first();
        return result;
    }

    public List<Document> findAllWithRelations() {
        List<Bson> pipeline = Arrays.asList(
                Aggregates.lookup("accounting_records", "records_id", "_id", "records"),
                Aggregates.lookup("financial_reports", "reports_id", "_id", "reports")
        );

        return auditDocuments.aggregate(pipeline).into(new ArrayList<>());
    }
}
