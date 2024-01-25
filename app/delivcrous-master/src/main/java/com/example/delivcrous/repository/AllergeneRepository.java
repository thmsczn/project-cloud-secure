package com.example.delivcrous.repository;

import com.example.delivcrous.model.Allergene;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface AllergeneRepository extends JpaRepository<Allergene, Long> {
}
