package com.example.delivcrous.service;

import com.example.delivcrous.model.Panier;
import com.example.delivcrous.model.Plat;
import com.example.delivcrous.model.PlatPanier;
import com.example.delivcrous.repository.PanierRepository;
import com.example.delivcrous.repository.PlatPanierRepository;
import com.example.delivcrous.repository.PlatRepository;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlatPanierService {

    @Inject
    private PlatPanierRepository platPanierRepository;

    @Inject
    private PlatRepository platRepository;

    @Inject
    private PanierRepository panierRepository;

    public List<PlatPanier> getAllPlatPaniers() {
        return platPanierRepository.findAll();
    }

    public void createPlatPanier(PlatPanier platPanier, Long plat_id, Long panier_id) {
        System.out.println("plat_id : " + plat_id);
        Plat plat = platRepository.findById(plat_id).orElseThrow(
                () -> new RuntimeException("plat non trouvé")
        );
        System.out.println("panier_id : " + panier_id);
        Panier panier = panierRepository.findById(panier_id).orElseThrow(
                () -> new RuntimeException("panier non trouvé")
        );
        platPanier.setPlat(plat);
        platPanier.setPanier(panier);
        platPanierRepository.save(platPanier);
    }
}
