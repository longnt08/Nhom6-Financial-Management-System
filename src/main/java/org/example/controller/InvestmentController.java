package org.example.controller;

import com.google.gson.*;
import com.mongodb.client.FindIterable;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.model.Investment;
import org.example.service.InvestmentServiceLocal;

import java.util.ArrayList;
import java.util.List;

import static org.example.model.Investment.InvestmentBuilder;

@Path("/investment")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InvestmentController {

    @EJB
    private InvestmentServiceLocal investmentService;

    // xu ly cors
    @OPTIONS
    @Path("{path : .*}")
    public Response options() {
        return Response.ok().build();
    }

    @GET
    @Path("/record")
    public Response getInvestmentList() {
        FindIterable<Investment> records = investmentService.getAll();
        List<Investment> recordList = new ArrayList<>();
        for (Investment record : records) {
            recordList.add(record);
        }

        Gson gson = InvestmentBuilder();
        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "success");
        resultData.add("data", gson.toJsonTree(recordList));

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }

    @GET
    @Path("/record/{id}")
    public Response getInvestmentById(@PathParam("id") String id) {
        Investment record = investmentService.get(id);
        Gson gson = InvestmentBuilder();

        JsonObject resultData = new JsonObject();
        resultData.addProperty("status", "success");
        resultData.add("data", gson.toJsonTree(record));

        return Response.status(Response.Status.OK).entity(resultData.toString()).build();
    }

    @POST
    @Path("/record")
    public Response addInvestment(Investment record) {
        try {
            Investment result = investmentService.addInvestment(record);
        } catch (Exception ex) {
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An error occurred while adding the investment.");
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }

        Gson gson = InvestmentBuilder();
        JsonObject status = new JsonObject();
        status.addProperty("status", "success");
        status.add("data", gson.toJsonTree(record));

        return Response.status(Response.Status.OK).entity(status.toString()).build();
    }

    @PUT
    @Path("/record/{id}")
    public Response updateInvestment(@PathParam("id") String id, Investment newInfo) {
        try {
            Investment updatedRecord = investmentService.updateInvestment(id, newInfo);
            if (updatedRecord == null) {
                JsonObject error = new JsonObject();
                error.addProperty("status", "fail");
                error.addProperty("error", "Investment record not found for id: " + id);
                return Response.status(Response.Status.NOT_FOUND).entity(error.toString()).build();
            }

            Gson gson = InvestmentBuilder();
            JsonObject status = new JsonObject();
            status.addProperty("status", "success");
            status.add("data", gson.toJsonTree(updatedRecord));

            return Response.status(Response.Status.OK).entity(status.toString()).build();
        } catch (Exception ex) {
            JsonObject error = new JsonObject();
            error.addProperty("status", "fail");
            error.addProperty("error", "An error occurred while updating the investment.");
            return Response.status(Response.Status.BAD_REQUEST).entity(error.toString()).build();
        }
    }

    @DELETE
    @Path("/record/{id}")
    public Response deleteInvestment(@PathParam("id") String id) {
        investmentService.deleteInvestment(id);
        JsonObject response = new JsonObject();
        response.addProperty("status", "success");
        response.addProperty("message", "Investment record deleted.");
        return Response.status(Response.Status.OK).entity(response.toString()).build();
    }
}
