package org.example.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bson.Document;
import org.example.model.Audit;
import org.example.service.AuditServiceLocal;

import java.util.List;

import static org.example.model.AccountingRecord.RecordBuilder;

@Path("/audit")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuditController {
    @EJB
    private AuditServiceLocal auditService;

    // xu ly cors
    @OPTIONS
    @Path("{path : .*}")
    public Response options() {
        return Response.ok().build();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        try {
            Document audit = auditService.get(id);
            if (audit == null) {
                JsonObject error = new JsonObject();
                error.addProperty("status", "false");
                error.addProperty("error", "ProfitAudit not found for id: " + id);
                return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
            }
            Gson gson = RecordBuilder();
            return Response.ok(gson.toJson(audit)).build();
        } catch (Exception ex) {
            JsonObject error = new JsonObject();
            error.addProperty("status", "false");
            error.addProperty("error", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    }
    @GET
    @Path("/")
    public Response getAuditList() {

        List<Document> auditList = auditService.getAll();

        Gson gson = RecordBuilder();
        String json = gson.toJson(auditList);

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "status");
        resultData.add("data", gson.fromJson(json, JsonArray.class));

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/")
    public Response addAudit(Audit audit) {
        try {
            Audit result = auditService.addAudit(audit);
            Gson gson = RecordBuilder();

            JsonObject status = new JsonObject();
            status.addProperty("status", "success");
            status.addProperty("data",gson.toJson(result));

            return Response.status(Response.Status.OK).entity(status.toString()).build();
        } catch (Exception ex) {
            System.out.println("Exception: " + ex);
            ex.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An unexpected error has occurred while trying to add record.");
            error.addProperty("stack-trace", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateAudit(@PathParam("id") String id, Audit newAudit) {
        try {
            Audit result = auditService.updateAudit(id, newAudit);

            if (result == null) {
                JsonObject error = new JsonObject();
                error.addProperty("status", "fail");
                error.addProperty("error", "Audit not found for id: " + id);
                return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
            }

            Gson gson = RecordBuilder();
            JsonObject response = new JsonObject();
            response.addProperty("status", "success");
            response.add("data", gson.fromJson(gson.toJson(result), JsonObject.class));

            return Response.status(Response.Status.OK).entity(response.toString()).build();
        } catch (Exception ex) {
            ex.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An unexpected error occurred while trying to update audit.");
            error.addProperty("stack-trace", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    }
    @DELETE
    @Path("/{id}")
    public Response deleteAudit(@PathParam("id") String id) {
        auditService.deleteAudit(id);

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "status");
        resultData.addProperty("result", "Audit deleted successfully");

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }


}
