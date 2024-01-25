package com.example.delivcrous.model;

import jakarta.persistence.*;

@Entity
public class Allergene {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "allergene_sequence")
    @SequenceGenerator(name = "allergene_sequence", sequenceName = "allergene_sequence", allocationSize = 1)
    private Long allergene_id;
    private String nom;

    // Getters et setters


    public Long getAllergene_id() {
        return allergene_id;
    }

    public void setAllergene_id(Long allergene_id) {
        this.allergene_id = allergene_id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Allergene(String nom) {
        this.nom = nom;
    }
    public Allergene(){

    }
}
