package com.example.delivcrous.payload.request;

import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotEmpty(message = "Le nom d'utilisateur ne peut pas être vide")
    @Size(min = 3, max = 20, message = "Le nom d'utilisateur doit avoir entre 3 et 20 caractères")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Le nom d'utilisateur doit être alphanumérique")
    private String username;

    @NotEmpty
    @Size(max = 50)
    @Email(message = "Doit être une adresse e-mail valide")
    private String email;

    @NotEmpty(message = "Le mot de passe ne peut pas être vide")
    @Size(min = 8, message = "Le mot de passe doit avoir au moins 8 caractères")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$", message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial parmi @$!%*?&#")
    private String password;

    @Pattern(regexp = "^(\\+33|0)[1-9](\\d{2}){4}$", message = "Doit être un numéro de téléphone français valide")
    private String tel;

    @NotEmpty
    private String adresse;

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Le prénom doit uniquement contenir des lettres")
    @Size(min = 1, message = "Le prénom ne peut pas être vide")
    private String prenom;

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Le nom doit uniquement contenir des lettres")
    @Size(min = 1, message = "Le nom ne peut pas être vide")
    private String nom;

    @Min(value = 0, message = "Le solde Crous ne peut pas être négatif")
    private Double solde_crous;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setTel(String tel) { this.tel = tel; }

    public String getTel() { return tel; }

    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getAdresse() { return adresse; }

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

    public Double getSolde_crous() {
        return solde_crous;
    }

    public void setSolde_crous(Double solde_crous) {
        this.solde_crous = solde_crous;
    }
}
