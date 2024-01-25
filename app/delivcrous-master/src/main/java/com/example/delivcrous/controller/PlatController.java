package com.example.delivcrous.controller;

import com.example.delivcrous.model.Plat;
import com.example.delivcrous.service.PlatService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("api/plats")
public class PlatController {

    @Inject
    private PlatService platService;

    @GET
    @Path("/getplats")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Plat> getAllPlats() {
        return platService.getAllPlats();
    }

    @POST
    @Path("postplat")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createPlat(Plat plat) {
        platService.createPlat(plat);
    }
}
