package org.example.service;

import jakarta.ejb.Local;
import org.bson.Document;
import org.example.model.Audit;

import java.util.List;

@Local
public interface AuditServiceLocal {
     List<Document> getAll();
     Document get(String id);
     Audit addAudit(Audit audit);
     Audit updateAudit(String id, Audit newInfo);
     void deleteAudit(String id);
    }