package com.example.delivcrous.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "commande_sequence")
    @SequenceGenerator(name = "commande_sequence", sequenceName = "commande_sequence", allocationSize = 1)
    private Long commande_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Utilisateur utilisateur;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "commande_plat",
            joinColumns = @JoinColumn(name = "commande_id"),
            inverseJoinColumns = @JoinColumn(name = "plat_id")
    )
    private List<Plat> plats;


    private String adresse_livraison;
    private String status;
    private Date date_commande;

    // Getters et Setters

    public List<Plat> getPlats() {
        return plats;
    }

    public void setPlats(List<Plat> plats) {
        this.plats = plats;
    }

    public Long getCommande_id() {
        return commande_id;
    }

    public void setCommande_id(Long commande_id) {
        this.commande_id = commande_id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public String getAdresse_livraison() {
        return adresse_livraison;
    }

    public void setAdresse_livraison(String adresse_livraison) {
        this.adresse_livraison = adresse_livraison;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate_commande() {
        return date_commande;
    }

    public void setDate_commande(Date date_commande) {
        this.date_commande = date_commande;
    }

    public Commande(Utilisateur utilisateur, String adresse_livraison, String status, Date date_commande) {
        this.utilisateur = utilisateur;
        this.adresse_livraison = adresse_livraison;
        this.status = status;
        this.date_commande = date_commande;
    }

    public Commande(){

    }
}
