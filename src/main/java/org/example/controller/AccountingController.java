package org.example.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mongodb.client.FindIterable;
import jakarta.ejb.EJB;
import jakarta.json.Json;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.api.accounting.AccountingTypes;
import org.example.impl.AccountingRecord;
import org.example.service.AccountingRecordServiceLocal;

import java.util.ArrayList;
import java.util.List;

@Path("/accounting")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccountingController {
    
    @EJB
    private AccountingRecordServiceLocal recordService;

    public void setRecordService(AccountingRecordServiceLocal recordService) {
        this.recordService = recordService;
    }

    @GET
    @Path("/record")
    public Response getRecordList() {
        FindIterable<AccountingRecord> records = recordService.getAll();
        JsonArray recordsArray  = new JsonArray();
        for (AccountingRecord record : records) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("id", record.getId().toHexString());
            jsonObject.addProperty("user_id", record.getUser_id().toHexString());
            jsonObject.addProperty("date", record.getDate().toString());
//            jsonObject.addProperty("reference_date", record.getReference_date().toString());
            jsonObject.addProperty("debit", record.getDebit());
            jsonObject.addProperty("credit", record.getCredit());
            jsonObject.addProperty("description", record.getDescription());
//            jsonObject.addProperty("category", record.getCategory().name());
            recordsArray.add(jsonObject);
        }

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "success");
        resultData.add("data", recordsArray);

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
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

        Gson resultGson= new Gson();
        String result = resultGson.toJson(categories);
        return Response.status(Response.Status.OK).entity(result).build();
    }
}
