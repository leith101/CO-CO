package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceAirbnb;
import com.example.testeditions.Repositories.AnnonceAirbnbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnAirbnbImpl implements AnnAirbnbService{

    private final AnnonceAirbnbRepository repository;

    @Autowired
    public AnnAirbnbImpl(AnnonceAirbnbRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<AnnonceAirbnb> getAllAnnouncements() {
        return repository.findAll();
    }

    @Override
    public AnnonceAirbnb getAnnouncementById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public AnnonceAirbnb createAnnouncement(AnnonceAirbnb announcement) {
        return repository.save(announcement);
    }

    @Override
    public AnnonceAirbnb updateAnnouncement(Long id, AnnonceAirbnb updatedAnnouncement) {
        Optional<AnnonceAirbnb> existingAnnouncement = repository.findById(id);

        if (existingAnnouncement.isPresent()) {
            AnnonceAirbnb announcement = existingAnnouncement.get();
            announcement.setTitre(updatedAnnouncement.getTitre());
            announcement.setDescription(updatedAnnouncement.getDescription());
            // Set other fields as needed
            return repository.save(announcement);
        } else {
            return null; // Handle not found scenario
        }
    }

    @Override
    public void deleteAnnouncement(Long id) {
        repository.deleteById(id);
    }


    @Override
    public long getAnnCount() {
        return repository.count();
    }
}
