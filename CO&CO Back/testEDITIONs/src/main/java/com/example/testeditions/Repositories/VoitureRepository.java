package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture,Long> {
    List<Voiture> findByUser(User user);
  Voiture findByMatricule(String matricule);
    Optional<Voiture> findByUserAndMatricule(User user, String matricule);

    Voiture findByUserIdAndIdv(Long userId, Long idv);


}
