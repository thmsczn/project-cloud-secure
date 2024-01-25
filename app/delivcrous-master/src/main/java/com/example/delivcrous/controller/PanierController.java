package com.example.delivcrous.controller;

import com.example.delivcrous.model.Panier;
import com.example.delivcrous.service.PanierService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/paniers")
public class PanierController {

    @Inject
    private PanierService panierService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Panier> getAllPaniers() {
        return panierService.getAllPaniers();
    }

    @GET
    @Path("/getpanier")
    @Produces(MediaType.APPLICATION_JSON)
    public Panier getPanierByUser_id(@QueryParam("user_id") Long user_id) { return panierService.findByUserId(user_id); }

    @POST
    @Path("/createpanier")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createPanier(Panier panier, @QueryParam("user_id") Long user_id) {
        panierService.createPanier(panier, user_id);
    }
}
