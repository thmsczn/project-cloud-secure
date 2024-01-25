package com.example.delivcrous.model;

import jakarta.persistence.*;

@Entity
public class PlatPanier {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "plat_panier_sequence")
    @SequenceGenerator(name = "plat_panier_sequence", sequenceName = "plat_panier_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plat_id", nullable = false)
    private Plat plat;

    @ManyToOne
    @JoinColumn(name = "panier_id", nullable = false)
    private Panier panier;

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

    public Panier getPanier() {
        return panier;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public PlatPanier(Plat plat, Panier panier, int quantite) {
        this.plat = plat;
        this.panier = panier;
        this.quantite = quantite;
    }

    public PlatPanier(){}
}
