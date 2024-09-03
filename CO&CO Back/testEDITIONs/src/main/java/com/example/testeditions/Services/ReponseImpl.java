package com.example.testeditions.Services;

import com.example.testeditions.Entites.Reclamation;
import com.example.testeditions.Entites.Reponse;
import com.example.testeditions.Repositories.ReclamationRepository;
import com.example.testeditions.Repositories.ReponseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReponseImpl implements ReponseService{
    @Autowired
    ReponseRepository reponseRepository;
    @Autowired
    ReclamationRepository reclamationRepository;
    @Override
    public Reponse save(Reponse reponse) {
        return reponseRepository.save(reponse);
    }
    @Transactional
    @Override
    public Reponse saveReponseAndAssociateToReclamation(Reponse reponse, int idReclamation) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(idReclamation);
        if (optionalReclamation.isPresent()) {
            Reclamation reclamation = optionalReclamation.get();
            reponse.setReclamation(reclamation);
            reclamation.getReponses().add(reponse);
            reclamationRepository.save(reclamation); // To update the relationship
            return reponseRepository.save(reponse);
        } else {
            // Handle case where the provided idReclamation doesn't exist
            // You can throw an exception or handle it according to your application logic
            return null;
        }
    }
}
