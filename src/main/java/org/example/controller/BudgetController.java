package org.example.controller;

import com.google.gson.*;
import com.mongodb.client.FindIterable;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.impl.Budget;
//import org.example.impl.BudgetPredictResult;
//import org.example.impl.BudgetType;
import org.example.service.BudgetServiceLocal;

import java.util.ArrayList;
import java.util.List;

import static org.example.impl.Budget.BudgetBuilder;

import java.util.ArrayList;
import java.util.List;

@Path("/budget")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BudgetController {

    @EJB
    private BudgetServiceLocal budgetService;

    private Gson gson = new Gson();

    @GET
    @Path("/all")
    public Response getAllBudgets() {
        try {
            FindIterable<Budget> budgets = budgetService.getAll();
            List<Budget> budgetList = new ArrayList<>();
            for (Budget budget : budgets) {
                budgetList.add(budget);
            }

            JsonObject result = new JsonObject();
            result.addProperty("status", "success");
            result.add("data", gson.toJsonTree(budgetList));

            return Response.status(Response.Status.OK).entity(result.toString()).build();
        } catch (Exception ex) {
            return handleException(ex, "Failed to retrieve budgets.");
        }
    }

    @GET
    @Path("/{id}")
    public Response getBudgetById(@PathParam("id") String id) {
        try {
            Budget budget = budgetService.get(id);
            if (budget == null) {
                return buildErrorResponse("Budget not found for id: " + id, Response.Status.NOT_FOUND);
            }

            JsonObject result = new JsonObject();
            result.addProperty("status", "success");
            result.add("data", gson.toJsonTree(budget));

            return Response.status(Response.Status.OK).entity(result.toString()).build();
        } catch (Exception ex) {
            return handleException(ex, "Failed to retrieve budget.");
        }
    }

    @POST
    @Path("/add")
    public Response addBudget(Budget budget) {
        try {
            Budget addedBudget = budgetService.addBudget(budget);
            JsonObject result = new JsonObject();
            result.addProperty("status", "success");
            result.add("data", gson.toJsonTree(addedBudget));

            return Response.status(Response.Status.CREATED).entity(result.toString()).build();
        } catch (Exception ex) {
            return handleException(ex, "Failed to add budget.");
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateBudget(@PathParam("id") String id, Budget updatedBudget) {
        try {
            Budget result = budgetService.updateBudget(id, updatedBudget);
            if (result == null) {
                return buildErrorResponse("Budget not found for id: " + id, Response.Status.NOT_FOUND);
            }

            JsonObject response = new JsonObject();
            response.addProperty("status", "success");
            response.add("data", gson.toJsonTree(result));

            return Response.status(Response.Status.OK).entity(response.toString()).build();
        } catch (Exception ex) {
            return handleException(ex, "Failed to update budget.");
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteBudget(@PathParam("id") String id) {
        try {
            boolean deleted = budgetService.deleteBudget(id);
            if (!deleted) {
                return buildErrorResponse("Budget not found for id: " + id, Response.Status.NOT_FOUND);
            }

            JsonObject response = new JsonObject();
            response.addProperty("status", "success");
            response.addProperty("message", "Budget deleted successfully.");

            return Response.status(Response.Status.OK).entity(response.toString()).build();
        } catch (Exception ex) {
            return handleException(ex, "Failed to delete budget.");
        }
    }

    // Helper methods for error handling
    private Response handleException(Exception ex, String message) {
        ex.printStackTrace();
        return buildErrorResponse(message + " " + ex.getMessage(), Response.Status.BAD_REQUEST);
    }

    private Response buildErrorResponse(String errorMessage, Response.Status status) {
        JsonObject error = new JsonObject();
        error.addProperty("status", "fail");
        error.addProperty("error", errorMessage);
        return Response.status(status).entity(error.toString()).build();
    }
}
