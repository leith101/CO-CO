package com.example.testeditions.Services;

import com.example.testeditions.Entites.Reclamation;

import java.util.List;

public interface ReclamationService {
    Reclamation save(Reclamation reclamation);
    void delete(Integer id);
    Reclamation update(Reclamation reclamation);
    List<Reclamation> getAllReclamations();
    Reclamation getReclamationById(int id);
    Reclamation updateReclamationState(int reclamationId);
    Reclamation addReclamationAndAssignToUser(Reclamation reclamation, Long userId);
    List<Reclamation> getReclamationsByUserId(Long userId);

}
