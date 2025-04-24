package org.example.impl;

import jakarta.ejb.EJB;
import jakarta.ejb.Local;
import jakarta.ejb.Stateful;
import jakarta.inject.Inject;
import org.bson.Document;
import org.example.model.Audit;
import org.example.repository.AuditRepository;
import org.example.service.AuditServiceLocal;

import java.util.List;

@Stateful
@Local
public class AuditService implements AuditServiceLocal {

    @Inject
    private AuditRepository repository;

    @Override
    public List<Document> getAll() {
        return repository.findAllWithRelations();
    }

    @Override
    public Document get(String id) {
        return repository.findByIdWithRelations(id);
    }

    @Override
    public Audit addAudit(Audit audit) {
        return repository.save(audit);
    }

    @Override
    public Audit updateAudit(String id, Audit newInfo) {
        return repository.update(id, newInfo);
    }

    @Override
    public void deleteAudit(String id) {
        repository.delete(id);
    }
}