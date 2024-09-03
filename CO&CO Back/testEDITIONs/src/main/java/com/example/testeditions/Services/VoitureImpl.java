package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceCov;
import com.example.testeditions.Entites.Commentaire;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;
import com.example.testeditions.Repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class VoitureImpl implements VoitureService{

    @Autowired
     VoitureRepository voitureRepository;

    @Autowired
    UserService userService;



    @Override
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    @Override
    public Voiture getVoitureById(Long idv) {
        Optional<Voiture> voitureOptional = voitureRepository.findById(idv);
        return voitureOptional.orElseThrow(() -> new RuntimeException("Voiture not found with id: " + idv));
    }



    @Override
    public Voiture saveVoiture(Long userId, Voiture voiture) {
        User user = userService.getUserById(userId);
        voiture.setUser(user);
        return voitureRepository.save(voiture);
    }

    @Override
        public Voiture updateVoiture(Long idv, Voiture updatedVoiture) {
        Optional<Voiture> voitureOptional = voitureRepository.findById(idv);
        if (voitureOptional.isPresent()) {
            Voiture existingVoiture = voitureOptional.get();
            existingVoiture.setNombrePlaces(updatedVoiture.getNombrePlaces());
            existingVoiture.setMatricule(updatedVoiture.getMatricule());

            return voitureRepository.save(existingVoiture);
        }
        return null;
    }

    @Override
    public void deleteVoiture(Long idv) {
        voitureRepository.deleteById(idv);
    }

    @Override
    public List<Voiture> getVoituresByUser(User user) {
        return voitureRepository.findByUser(user);
    }

    @Override
    public Voiture getVoitureByMatricule(String matricule) {
        return voitureRepository.findByMatricule(matricule);
    }

    @Override
    public Voiture getVoitureByUserAndMatricule(User user, String matricule) {
        return voitureRepository.findByUserAndMatricule(user, matricule).orElse(null);
    }

    @Override
    public boolean deleteVoitureByUserIdAndIdv(Long userId, Long idv) {
        Voiture voiture = voitureRepository.findByUserIdAndIdv(userId, idv);
        if (voiture != null) {
            voitureRepository.delete(voiture);
            return true;
        } else {
            return false;
        }
    }

}

