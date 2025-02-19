package org.example;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/")
public class DefaultRoute{
    @GET
    @Produces("text/plain")
    public String ServerCheck() {
        return "Server chay thanh cong";
    }
}
