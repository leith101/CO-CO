package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AnnonceColocationService {

    List<AnnonceColocation> getAllAnnonces();

    Optional<AnnonceColocation> getAnnonceById(Long id);

    AnnonceColocation createAnnonce(AnnonceColocation annonceColocation);
    AnnonceColocation updateAnnonce(Long id, AnnonceColocation newAnnonce);

    void deleteAnnonce(Long id);
    public List<AnnonceColocation> searchAnnonces(String query);
    List<AnnonceColocation> getAnnoncesByUserId(Long userId);

    public List<AnnonceColocation> getAnnoncesSelonPreferences(Long userId);
    public List<AnnonceColocation> getuserannonce(User user);
    public Map<Long, Float> getReservationPercentageByAnnonce() ;


}