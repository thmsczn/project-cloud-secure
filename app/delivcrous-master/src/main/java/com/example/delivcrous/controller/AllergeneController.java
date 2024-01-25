package com.example.delivcrous.controller;

import com.example.delivcrous.model.Allergene;
import com.example.delivcrous.service.AllergeneService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/allergenes/")
public class AllergeneController {

    @Inject
    private AllergeneService allergeneService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Allergene> getAllAllergenes() {
        return allergeneService.getAllAllergenes();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createAllergene(Allergene allergene) {
        allergeneService.createAllergene(allergene);
    }
}
