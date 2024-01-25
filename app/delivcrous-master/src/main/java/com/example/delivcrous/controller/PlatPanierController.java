package com.example.delivcrous.controller;

import com.example.delivcrous.model.PlatPanier;
import com.example.delivcrous.service.PlatPanierService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("api/plat_paniers")
public class PlatPanierController {

    @Inject
    private PlatPanierService platPanierService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<PlatPanier> getAllPlatPaniers() {
        return platPanierService.getAllPlatPaniers();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createPlatPanier(PlatPanier platPanier, @QueryParam("plat_id") Long plat_id, @QueryParam("panier_id") Long panier_id) {
        platPanierService.createPlatPanier(platPanier, plat_id, panier_id);
    }
}
