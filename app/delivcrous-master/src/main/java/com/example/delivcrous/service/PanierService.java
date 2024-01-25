package com.example.delivcrous.service;

import com.example.delivcrous.model.Commande;
import com.example.delivcrous.repository.UtilisateurRepository;
import com.example.delivcrous.model.Panier;
import com.example.delivcrous.model.Utilisateur;
import com.example.delivcrous.repository.PanierRepository;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanierService {

    @Inject
    private PanierRepository panierRepository;

    @Inject
    private UtilisateurRepository utilisateurRepository;

    public List<Panier> getAllPaniers() {
        return panierRepository.findAll();
    }
    public Panier findByUserId(Long user_id) {
        return panierRepository.findByUserId(user_id);
    }
    public void createPanier(Panier panier, Long user_id) {
        // Trouver l'utilisateur associé
        Utilisateur utilisateur = utilisateurRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Sauvegarder le panier
        panierRepository.save(panier);
    }


}
