package com.example.testeditions.Services;

import com.example.testeditions.Entites.Reclamation;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.ReclamationRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationImpl implements ReclamationService {
    @Autowired
    private ReclamationRepository reclamationRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Reclamation save(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public void delete(Integer id) {
        reclamationRepository.deleteById(id);
    }
    @Override
    public Reclamation update(Reclamation reclamation) {
        // Vérifier si la réclamation existe
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(reclamation.getId_reclamation());
        if (existingReclamation.isPresent()) {
            // Mettre à jour les attributs de la réclamation existante avec ceux de la nouvelle réclamation
            Reclamation updatedReclamation = existingReclamation.get();
            updatedReclamation.setCategorie_reclamation(reclamation.getCategorie_reclamation());
            updatedReclamation.setObjet_reclamation(reclamation.getObjet_reclamation());
            updatedReclamation.setDescription_reclamation(reclamation.getDescription_reclamation());
            updatedReclamation.setEtat_reclamation(reclamation.getEtat_reclamation());
            updatedReclamation.setDate_reclamation(reclamation.getDate_reclamation());

            // Enregistrer les modifications dans la base de données
            return reclamationRepository.save(updatedReclamation);
        } else {
            throw new IllegalArgumentException("La réclamation avec l'ID " + reclamation.getId_reclamation() + " n'existe pas.");
        }
    }
    @Override
    public Reclamation addReclamationAndAssignToUser(Reclamation reclamation, Long userId) {
        // Récupérer l'utilisateur à partir de son ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Associer l'utilisateur à la réclamation
            reclamation.setUser(user);
            // Enregistrer la réclamation dans la base de données
            return reclamationRepository.save(reclamation);
        } else {
            throw new IllegalArgumentException("Utilisateur avec l'ID " + userId + " non trouvé.");
        }
    }
    @Override
    public List<Reclamation> getReclamationsByUserId(Long userId) {
        return reclamationRepository.findByUserId(userId);
    }

    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAllWithReponses();
    }

    @Override
    public Reclamation getReclamationById(int id) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(id);
        if (reclamationOptional.isPresent()) {
            return reclamationOptional.get();
        } else {
            throw new IllegalArgumentException("La réclamation avec l'ID " + id + " n'existe pas.");
        }
    }
    @Override
    public Reclamation updateReclamationState(int reclamationId) {
        // Vérifier si la réclamation existe
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(reclamationId);
        if (existingReclamation.isPresent()) {
            // Mettre à jour l'état de la réclamation
            Reclamation updatedReclamation = existingReclamation.get();
            updatedReclamation.setEtat_reclamation(1);
            // Enregistrer les modifications dans la base de données
            return reclamationRepository.save(updatedReclamation);
        } else {
            throw new IllegalArgumentException("La réclamation avec l'ID " + reclamationId + " n'existe pas.");
        }
    }


}
