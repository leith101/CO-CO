package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.AnnonceAirbnb;
import com.example.testeditions.Entites.ReservationAirbnb;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationAirbnbRepository extends JpaRepository<ReservationAirbnb, Long> {
    List<ReservationAirbnb> findByAnnonceAirbnb(AnnonceAirbnb annonceAirbnb);

}
