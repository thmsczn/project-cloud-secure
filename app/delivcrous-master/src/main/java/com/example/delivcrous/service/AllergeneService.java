package com.example.delivcrous.service;

import com.example.delivcrous.model.Allergene;
import com.example.delivcrous.repository.AllergeneRepository;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllergeneService {

    @Inject
    private AllergeneRepository allergeneRepository;

    public List<Allergene> getAllAllergenes() {
        return allergeneRepository.findAll();
    }

    public void createAllergene(Allergene allergene) {
        allergeneRepository.save(allergene);
    }
}
