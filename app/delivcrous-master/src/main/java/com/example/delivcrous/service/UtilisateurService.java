package com.example.delivcrous.service;

import com.example.delivcrous.model.Utilisateur;
import com.example.delivcrous.repository.UtilisateurRepository;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Service
public class UtilisateurService {

    @Inject
    private UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void createUtilisateur(@Valid Utilisateur utilisateur) {
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateurRepository.save(utilisateur);
    }

    public Utilisateur findByUsername(String username) {
        return utilisateurRepository.findByUsername(username);
    }
}
