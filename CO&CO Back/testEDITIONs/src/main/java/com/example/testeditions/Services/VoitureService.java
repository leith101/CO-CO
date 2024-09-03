package com.example.testeditions.Services;

import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;

import java.util.List;
import java.util.Optional;

public interface VoitureService {
    Voiture saveVoiture(Long userId, Voiture voiture);
    Voiture updateVoiture(Long idv, Voiture updatedVoiture);
    Voiture getVoitureById(Long idv);
    void deleteVoiture(Long idv);
    List<Voiture> getAllVoitures();

    List<Voiture> getVoituresByUser(User user);
    Voiture getVoitureByMatricule(String matricule);
    Voiture getVoitureByUserAndMatricule(User user, String matricule);


    boolean deleteVoitureByUserIdAndIdv(Long userId, Long idv);

}


