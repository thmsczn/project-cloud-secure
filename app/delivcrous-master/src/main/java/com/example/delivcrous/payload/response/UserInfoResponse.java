package com.example.delivcrous.payload.response;

public class UserInfoResponse {
    private Double solde_crous;
    private Long id;
    private String username;
    private String email;

    private String tel;

    private String adresse;

    public UserInfoResponse(Long id, String username, String email, String tel, String adresse, Double solde_crous) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.tel = tel;
        this.adresse = adresse;
        this.solde_crous = solde_crous;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getAdresse() { return adresse; }

    public void setTel(String tel) { this.tel = tel; }

    public String getTel() { return tel; }

    public Double getSolde_crous() { return solde_crous; }

    public void setSolde_crous(Double solde_crous) {this.solde_crous = solde_crous; }
}