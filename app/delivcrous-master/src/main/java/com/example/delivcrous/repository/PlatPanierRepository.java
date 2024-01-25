package com.example.delivcrous.repository;

import com.example.delivcrous.model.PlatPanier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface PlatPanierRepository extends JpaRepository<PlatPanier, Long> {
}
