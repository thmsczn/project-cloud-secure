package com.example.delivcrous.model;

import jakarta.persistence.*;

@Entity
public class PlatCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "plat_commande_sequence")
    @SequenceGenerator(name = "plat_commande_sequence", sequenceName = "plat_commande_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plat_id", nullable = false)
    private Plat plat;

    @ManyToOne
    @JoinColumn(name = "commande_id", nullable = false)
    private Commande commande;

    private int quantite;

    // Getters et Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Plat getPlat() {
        return plat;
    }

    public void setPlat(Plat plat) {
        this.plat = plat;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public PlatCommande(Plat plat, Commande commande, int quantite) {
        this.plat = plat;
        this.commande = commande;
        this.quantite = quantite;
    }

    public PlatCommande(){}
}
