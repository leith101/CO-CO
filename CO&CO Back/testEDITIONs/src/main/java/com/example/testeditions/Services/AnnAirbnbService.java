package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceAirbnb;

import java.util.List;

public interface AnnAirbnbService {

    List<AnnonceAirbnb> getAllAnnouncements();
    AnnonceAirbnb getAnnouncementById(Long id);
    AnnonceAirbnb createAnnouncement(AnnonceAirbnb announcement);
    AnnonceAirbnb updateAnnouncement(Long id, AnnonceAirbnb announcement);
    void deleteAnnouncement(Long id);

    long getAnnCount();
}
