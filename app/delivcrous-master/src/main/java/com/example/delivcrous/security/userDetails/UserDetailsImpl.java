package com.example.delivcrous.security.userDetails;

import com.example.delivcrous.model.Utilisateur;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private String tel;

    private String adresse;

    private Double solde_crous;


    public UserDetailsImpl(Long id, String username, String email, String password, Double solde_crous, String tel, String adresse) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.tel = tel;
        this.adresse = adresse;
        this.solde_crous = solde_crous;
    }

    public static UserDetailsImpl build(Utilisateur user) {

        return new UserDetailsImpl(
                user.getUser_id(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getSolde_crous(),
                user.getTel(),
                user.getAdresse());
    }
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getTel() { return tel; }
    public String getAdresse() {return adresse; }

    public Double getSolde_crous() { return solde_crous; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
