package com.example.delivcrous.service;

import com.example.delivcrous.model.Commande;
import com.example.delivcrous.model.Utilisateur;
import com.example.delivcrous.repository.CommandeRepository;
import com.example.delivcrous.repository.UtilisateurRepository;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeService {

    @Inject
    private CommandeRepository commandeRepository;

    @Inject
    private UtilisateurRepository utilisateurRepository;

    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    public void createCommande(Commande commande, Long user_id) {
        Utilisateur utilisateur = utilisateurRepository.findById(user_id).orElseThrow(
                ()  -> new RuntimeException("Utilisateur non trouvé")
        );
        commande.setUtilisateur(utilisateur);
        commandeRepository.save(commande);
    }

    public List<Commande> findByUserId(Long user_id) {
        return commandeRepository.findByUserId(user_id);
    }
}
