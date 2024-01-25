package com.example.delivcrous.repository;

import com.example.delivcrous.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

@Component
public interface PanierRepository extends JpaRepository<Panier, Long> {

    @Query("SELECT p FROM Panier p JOIN p.utilisateur u WHERE u.user_id = :userId")
    Panier findByUserId(@Param("userId") Long userId);
}
