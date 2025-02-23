package org.example.controller;

import com.google.gson.*;
import com.mongodb.client.FindIterable;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.api.accounting.AccountingTypes;
import org.example.impl.AccountingRecord;
import org.example.impl.AccountingReport;
import org.example.service.AccountingRecordServiceLocal;
import org.example.service.AccountingReportServiceLocal;

import java.util.ArrayList;
import java.util.List;

import static org.example.impl.AccountingRecord.RecordBuilder;

@Path("/accounting")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountingController {

    @EJB
    private AccountingRecordServiceLocal recordService;
    @EJB
    private AccountingReportServiceLocal reportService;

    @GET
    @Path("/record")
    public Response getRecordList() {
        FindIterable<AccountingRecord> records = recordService.getAll();
        List<AccountingRecord> recordList = new ArrayList<>();
        for (AccountingRecord record : records) {
            recordList.add(record);
        }

        Gson gson = RecordBuilder();
        String json = gson.toJson(recordList);

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "status");
        resultData.add("data", gson.fromJson(json, JsonArray.class));

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }

    @GET
    @Path("/record/{id}")
    public Response getRecordById(@PathParam("id") String id) {
        AccountingRecord record = recordService.get(id);
        Gson gson = RecordBuilder();

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "status");

        resultData.add("data", gson.fromJson(gson.toJson(record), JsonObject.class));
        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/record")
    public Response addRecord(AccountingRecord record) {

        try {
            AccountingRecord result = recordService.addRecord(record);
            System.out.println("Result: " + result);
        } catch (Exception ex) {
            System.out.println("Exception: " + ex);
            ex.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An unexpected error has occurred while trying to add record.");
            error.addProperty("stack-trace", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
        Gson gson = RecordBuilder();

        JsonObject status = new JsonObject();
        status.addProperty("status", "success");
        status.addProperty("data",gson.toJson(record));

        return Response.status(Response.Status.OK).entity(status.toString()).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/record/{id}")
    public Response updateRecord(@PathParam("id") String id, AccountingRecord newInfo) {
        try {
            AccountingRecord updatedRecord = recordService.updateRecord(id, newInfo);

            if (updatedRecord == null) {
                JsonObject error = new JsonObject();
                error.addProperty("status", "fail");
                error.addProperty("error", "Record not found for id: " + id);
                return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
            }

            Gson gson = RecordBuilder();
            JsonObject status = new JsonObject();
            status.addProperty("status", "success");
            status.addProperty("data", gson.toJson(updatedRecord));

            return Response.status(Response.Status.OK).entity(status.toString()).build();
        } catch (Exception ex) {
            ex.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An unexpected error occurred while trying to update record.");
            error.addProperty("stack-trace", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    } 

    @GET
    @Path("/category")
    public Response getAllCategory() {
        List<JsonObject> categories = new ArrayList<>();
        for (AccountingTypes type : AccountingTypes.values()) {
            JsonObject typeObject = new JsonObject();
            typeObject.addProperty("id", type.getStandardId());
            typeObject.addProperty("name", type.getName());
            typeObject.addProperty("equation", type.getEquation());
            categories.add(typeObject);
        }

        Gson resultGson = new Gson();
        String result = resultGson.toJson(categories);
        return Response.status(Response.Status.OK).entity(result).build();
    }

    @GET
    @Path("/report/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        try {
            AccountingReport report = reportService.getById(id);
            if (report == null) {
                JsonObject error = new JsonObject();
                error.addProperty("status", "false");
                error.addProperty("error", "ProfitReport not found for id: " + id);
                return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
            }
            Gson gson = new Gson();
            return Response.ok(gson.toJson(report)).build();
        } catch (Exception ex) {
            JsonObject error = new JsonObject();
            error.addProperty("status", "false");
            error.addProperty("error", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    }
    @GET
    @Path("/report")
    public Response getReportList() {
        FindIterable<AccountingReport> reports = reportService.getAll();
        List<AccountingReport> reportList = new ArrayList<>();
        for (AccountingReport report : reports) {
            reportList.add(report);
        }

        Gson gson = RecordBuilder();
        String json = gson.toJson(reportList);

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "status");
        resultData.add("data", gson.fromJson(json, JsonArray.class));

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/report")
    public Response addReport(AccountingReport report) {

        try {
            AccountingReport result = reportService.create(report);
            System.out.println("Result: " + result);
        } catch (Exception ex) {
            System.out.println("Exception: " + ex);
            ex.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An unexpected error has occurred while trying to add record.");
            error.addProperty("stack-trace", ex.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
        Gson gson = RecordBuilder();

        JsonObject status = new JsonObject();
        status.addProperty("status", "success");
        status.addProperty("data",gson.toJson(report));

        return Response.status(Response.Status.OK).entity(status.toString()).build();
    }}
