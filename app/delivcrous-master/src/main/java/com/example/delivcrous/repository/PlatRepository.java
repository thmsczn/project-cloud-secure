package com.example.delivcrous.repository;

import com.example.delivcrous.model.Plat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface PlatRepository extends JpaRepository<Plat, Long> {
}
