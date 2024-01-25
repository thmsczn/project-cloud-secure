package com.example.delivcrous.repository;

import com.example.delivcrous.model.PlatCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface PlatCommandeRepository extends JpaRepository<PlatCommande, Long> {
}
