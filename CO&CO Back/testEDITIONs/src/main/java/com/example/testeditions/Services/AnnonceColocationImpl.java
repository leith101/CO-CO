package com.example.testeditions.Services;


import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.Preferences;
import com.example.testeditions.Entites.TypeLocal;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.AnnonceColocationRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnnonceColocationImpl implements AnnonceColocationService{

    @Autowired
    private AnnonceColocationRepository annonceColocationRepository;
    @Autowired
    private UserRepository userRepository;

    public List<AnnonceColocation> getAllAnnonces() {
        return annonceColocationRepository.findAll();
    }

    public Optional<AnnonceColocation> getAnnonceById(Long id) {
        return annonceColocationRepository.findById(id);}

    public AnnonceColocation createAnnonce(AnnonceColocation annonceColocation) {
        return annonceColocationRepository.save(annonceColocation);
    }
    //@builder fi 3oudh set
    public AnnonceColocation updateAnnonce(Long id, AnnonceColocation newAnnonce) {
        Optional<AnnonceColocation> existingAnnonceOptional = annonceColocationRepository.findById(id);
        if (existingAnnonceOptional.isPresent()) {
            AnnonceColocation existingAnnonce = existingAnnonceOptional.get();
            existingAnnonce.setTitre(newAnnonce.getTitre());
            existingAnnonce.setDescription(newAnnonce.getDescription());
            existingAnnonce.setAdresse(newAnnonce.getAdresse());
            existingAnnonce.setNbrChambres(newAnnonce.getNbrChambres());
            existingAnnonce.setSuperficie(newAnnonce.getSuperficie());
            existingAnnonce.setType(newAnnonce.getType());
            existingAnnonce.setStatus(newAnnonce.getStatus());
            existingAnnonce.setDate_annonce(newAnnonce.getDate_annonce());
            existingAnnonce.setImage(newAnnonce.getImage());
            existingAnnonce.setPrix(newAnnonce.getPrix());
            existingAnnonce.setDislike(newAnnonce.getDislike());
            existingAnnonce.setLlike(newAnnonce.getLlike());
            // Mettez à jour d'autres champs selon vos besoins

            return annonceColocationRepository.save(existingAnnonce);
        } else {
            // Gérer l'absence de l'annonce avec l'ID spécifié
            return null;
        }
    }

    public void deleteAnnonce(Long id) {
        annonceColocationRepository.deleteById(id);
    }
    public List<AnnonceColocation> searchAnnonces(String query) {
        return annonceColocationRepository.findByTitreContainingIgnoreCase(query);
    }
    @Override
    public List<AnnonceColocation> getAnnoncesByUserId(Long userId) {
        return annonceColocationRepository.findByUser_Id(userId);

    }

    @Override
    public List<AnnonceColocation> getAnnoncesSelonPreferences(Long userId) {
        User user=userRepository.findById(userId).get();
        List<Preferences> preferences=user.getPreferences();
        if (preferences.isEmpty()) {
            return annonceColocationRepository.findAll();
        }
        Set<TypeLocal>typeLocals=new HashSet<>();
        for (Preferences preference:preferences){
            for (String selectedtype:preference.getSelectedTypes()){
                typeLocals.add(TypeLocal.valueOf(selectedtype));
            }
        }
        List<AnnonceColocation> colocationList=new ArrayList<>();
        for (TypeLocal type:typeLocals){
            List<AnnonceColocation>annonces=annonceColocationRepository.findByType(type);
            colocationList.addAll(annonces);
        }
        return colocationList;
    }

    @Override
    public List<AnnonceColocation> getuserannonce(User user) {
        return annonceColocationRepository.findByUser(user);
    }
    public Map<Long, Float> getReservationPercentageByAnnonce() {
        List<AnnonceColocation> annonces = annonceColocationRepository.findAll();
        Map<Long, Float> reservationPercentageMap = new HashMap<>();

        for (AnnonceColocation annonce : annonces) {
            int nombreVues = annonce.getNombreVues();
            int nombreReservations = annonce.getReservationColocs().size();
            float reservationPercentage = (float) nombreReservations / nombreVues * 100;
            reservationPercentageMap.put(annonce.getId(), reservationPercentage);
        }

        return reservationPercentageMap;
    }



}
