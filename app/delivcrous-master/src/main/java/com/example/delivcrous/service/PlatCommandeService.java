package com.example.delivcrous.service;

import com.example.delivcrous.model.Commande;
import com.example.delivcrous.model.Plat;
import com.example.delivcrous.model.PlatCommande;
import com.example.delivcrous.repository.*;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlatCommandeService {

    @Inject
    private PlatCommandeRepository platCommandeRepository;

    @Inject
    private CommandeRepository commandeRepository;

    @Inject
    private PlatRepository platRepository;

    public List<PlatCommande> getAllPlatCommandes() {
        return platCommandeRepository.findAll();
    }

    public void createPlatCommande(PlatCommande platCommande,Long commande_id, Long plat_id) {
        System.out.println("command_id: " + commande_id); // Logging user ID
        Commande commande = commandeRepository.findById(commande_id).orElseThrow(
                ()  -> new RuntimeException("Utilisateur non trouvé")
        );
        System.out.println("plat_id : " + plat_id); // Logging plat ID
        Plat plat = platRepository.findById(plat_id).orElseThrow(
                () -> new RuntimeException("Plat non trouvé")
        );
        platCommande.setCommande(commande);
        platCommande.setPlat(plat);
        platCommandeRepository.save(platCommande);
    }
}
