package org.example.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.model.Audit;
import org.example.service.AuditServiceLocal;

import java.util.List;

import static org.example.model.AccountingRecord.RecordBuilder;

@Path("/audit")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuditController {

//    @EJB
//    private AuditServiceLocal auditService;
//
//    @GET
//    public Response getAllAudits(@QueryParam("populate") boolean populate) {
//        List<Audit> audits;
//
//        if (populate) {
//            audits = auditService.getAllWithDocuments();
//        } else {
//            audits = auditService.getAll();
//        }
//
//        Gson gson = RecordBuilder();
//        String json = gson.toJson(audits);
//
//        JsonObject resultData = new JsonObject();
//        resultData.addProperty("status", "success");
//        resultData.add("data", gson.fromJson(json, JsonArray.class));
//
//        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
//    }
//
//    @GET
//    @Path("/{id}")
//    public Response getAuditById(@PathParam("id") String id, @QueryParam("populate") boolean populate) {
//        Audit audit;
//
//        if (populate) {
//            audit = auditService.getByIdWithDocuments(id);
//        } else {
//            audit = auditService.getById(id);
//        }
//
//        if (audit == null) {
//            JsonObject error = new JsonObject();
//            error.addProperty("status", "fail");
//            error.addProperty("error", "Audit not found for id: " + id);
//            return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
//        }
//
//        Gson gson = RecordBuilder();
//        JsonObject resultData = new JsonObject();
//        resultData.addProperty("status", "success");
//        resultData.add("data", gson.fromJson(gson.toJson(audit), JsonObject.class));
//
//        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
//    }
//
//    @POST
//    public Response createAudit(Audit audit) {
//        try {
//            Audit result = auditService.create(audit);
//
//            Gson gson = RecordBuilder();
//            JsonObject response = new JsonObject();
//            response.addProperty("status", "success");
//            response.add("data", gson.fromJson(gson.toJson(result), JsonObject.class));
//
//            return Response.status(Response.Status.CREATED).entity(response.toString()).build();
//        } catch (Exception e) {
//            JsonObject error = new JsonObject();
//            error.addProperty("status", "fail");
//            error.addProperty("error", e.getMessage());
//            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
//        }
//    }
//
//    @PUT
//    @Path("/{id}")
//    public Response updateAudit(@PathParam("id") String id, Audit audit) {
//        try {
//            Audit result = auditService.update(id, audit);
//
//            Gson gson = RecordBuilder();
//            JsonObject response = new JsonObject();
//            response.addProperty("status", "success");
//            response.add("data", gson.fromJson(gson.toJson(result), JsonObject.class));
//
//            return Response.status(Response.Status.OK).entity(response.toString()).build();
//        } catch (Exception e) {
//            JsonObject error = new JsonObject();
//            error.addProperty("status", "fail");
//            error.addProperty("error", e.getMessage());
//            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
//        }
//    }
//
//    @DELETE
//    @Path("/{id}")
//    public Response deleteAudit(@PathParam("id") String id) {
//        try {
//            auditService.delete(id);
//
//            JsonObject response = new JsonObject();
//            response.addProperty("status", "success");
//            response.addProperty("message", "Audit deleted successfully");
//
//            return Response.status(Response.Status.OK).entity(response.toString()).build();
//        } catch (Exception e) {
//            JsonObject error = new JsonObject();
//            error.addProperty("status", "fail");
//            error.addProperty("error", e.getMessage());
//            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
//        }
//    }
}