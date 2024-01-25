package com.example.delivcrous.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @Column(name = "user_id")

    private Long user_id;

    private String username;

    private String email;

    private String password;
    private String nom;
    private String prenom;
    private Double solde_crous;
    private String tel;

    @OneToOne(mappedBy = "utilisateur", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Panier panier;
    private String adresse;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() { return email; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Panier getPanier() {
        return panier;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public Double getSolde_crous() {
        return solde_crous;
    }

    public void setSolde_crous(Double solde_crous) {
        this.solde_crous = solde_crous;
    }

    public void setTel(String tel) { this.tel = tel; }

    public String getTel() { return tel; }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    
    public String getAdresse() {return this.adresse; }
    public Utilisateur(String username, String email, String password, String nom, String prenom, Double solde_crous, String tel, String adresse) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.solde_crous = solde_crous;
        this.tel = tel;
        this.adresse = adresse;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public Utilisateur(){}
}
