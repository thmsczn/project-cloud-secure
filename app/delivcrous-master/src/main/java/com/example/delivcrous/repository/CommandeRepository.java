package com.example.delivcrous.repository;

import com.example.delivcrous.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    @Query("SELECT c FROM Commande c JOIN c.utilisateur u WHERE u.user_id = :userId")
    List<Commande> findByUserId(@Param("userId") Long userId);

}

