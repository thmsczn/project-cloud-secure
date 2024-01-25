package com.example.delivcrous.controller;

import com.example.delivcrous.model.Commande;
import com.example.delivcrous.service.CommandeService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("api/commandes")
public class CommandeController {

    @Inject
    private CommandeService commandeService;

    @GET
    @Path("/getallcommandes")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Commande> getAllCommandes() {
        return commandeService.getAllCommandes();
    }

    @GET
    @Path("/getcommande")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Commande> getCommandeByUser_id(@QueryParam("user_id") Long user_id) { return commandeService.findByUserId(user_id); }

    @POST
    @Path("/createcommande")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createCommande(Commande commande, @QueryParam("user_id") Long user_id) {
        commandeService.createCommande(commande, user_id);
    }
}
