package org.example.controller;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.service.UserService;
import org.example.impl.UserServiceImpl;
import org.example.model.User;
import org.example.utils.JWTUtil;
import jakarta.ws.rs.OPTIONS;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {
    private final UserService userService = new UserServiceImpl();


    // xu ly cors
    @OPTIONS
    @Path("{path : .*}")
    public Response options() {
        return Response.ok().build();
    }

    @POST
    @Path("/register")
    public Response register(User user) {
        try {
            User newUser = userService.register(user.getUsername(), user.getPassword(), user.getEmail(), user.getRole());
            return Response.ok(newUser).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    public Response login(User user) {
        try {
            User loggedInUser = userService.login(user.getUsername(), user.getPassword());
            String token = JWTUtil.generateToken(loggedInUser);
            return Response.ok("{\"token\":\"" + token + "\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }
}
