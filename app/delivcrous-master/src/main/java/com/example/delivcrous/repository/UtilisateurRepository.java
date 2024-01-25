package com.example.delivcrous.repository;

import com.example.delivcrous.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
