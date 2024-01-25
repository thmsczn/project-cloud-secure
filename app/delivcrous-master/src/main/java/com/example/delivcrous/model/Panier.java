package com.example.delivcrous.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "panier_sequence")
    @SequenceGenerator(name = "panier_sequence", sequenceName = "panier_sequence", allocationSize = 1)
    private Long panier_id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonBackReference
    private Utilisateur utilisateur;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "panier_id")
    private List<Plat> plats;


    // Getters et Setters

    public List<Plat> getPlats() {
        return plats;
    }

    public void setPlats(List<Plat> plats) {
        this.plats = plats;
    }
    public Long getPanier_id() {
        return panier_id;
    }

    public void setPanier_id(Long panier_id) {
        this.panier_id = panier_id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Panier(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Panier() {}
}
