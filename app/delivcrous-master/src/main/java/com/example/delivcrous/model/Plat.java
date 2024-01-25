package com.example.delivcrous.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Plat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "plat_sequence")
    @SequenceGenerator(name = "plat_sequence", sequenceName = "plat_sequence", allocationSize = 1)

    private Long id;

    private String title;
    private String description;
    private Long prix;
    private String image;
    private String category;
    private String allergenes;
    public Long getid() {
        return id;
    }

    public void setid(Long id) {
        this.id = id;
    }

    public String gettitle() {
        return title;
    }

    public void settitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrix() {
        return prix;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public String getimage() {
        return image;
    }

    public void setimage(String image) {
        this.image = image;
    }

    public String getcategory() {
        return category;
    }

    public void setcategory(String category) {
        this.category = category;
    }

    public String getAllergenes(){
        return allergenes;
    }

    public void setAllergenes(String allergenes){
        this.allergenes = allergenes;
    }

    public Plat(String title, String description, Long prix, String image, String category, String allergenes) {
        this.title = title;
        this.description = description;
        this.prix = prix;
        this.image = image;
        this.category = category;
        this.allergenes = allergenes;
    }

    public Plat(){}
}
