package com.example.testeditions.Services;
import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.ReservationColoc;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.AnnonceColocationRepository;
import com.example.testeditions.Repositories.ReservationColocRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReservationColocImpl implements ReservationColocService {

    @Autowired
    private ReservationColocRepository reservationColocRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AnnonceColocationRepository annonceColocation;


    @Override
    public List<ReservationColoc> getAllReservations() {
        return reservationColocRepository.findAll();
    }

    @Override
    public Optional<ReservationColoc> getReservationById(Long id) {
        return reservationColocRepository.findById(id);
    }

    @Override
    public ReservationColoc createReservation(ReservationColoc reservationColoc,Long annonceId,Long id) {
        User user =userRepository.findById(id).get();
        AnnonceColocation anonce =annonceColocation.findById(annonceId).get();
        ReservationColoc reservation = new ReservationColoc();
        reservationColoc.setUser(user);
        reservationColoc.setAnnoncecolocation(anonce);
        return reservationColocRepository.save(reservationColoc);
    }



    @Override
    public ReservationColoc updateReservation(Long id, ReservationColoc newReservation) {
        Optional<ReservationColoc> existingReservationOptional = reservationColocRepository.findById(id);
        if (existingReservationOptional.isPresent()) {
            ReservationColoc existingReservation = existingReservationOptional.get();
            // Mettre à jour les champs de la réservation existante avec les valeurs de la nouvelle réservation
            existingReservation.setDate(newReservation.getDate());
            existingReservation.setAnnoncecolocation(newReservation.getAnnoncecolocation());
            // Enregistrer la réservation mise à jour dans la base de données
            return reservationColocRepository.save(existingReservation);
        } else {
            // Gérer le cas où la réservation avec l'ID spécifié n'existe pas
            return null;
        }
    }

    @Override
    public void deleteReservation(Long id) {
        reservationColocRepository.deleteById(id);
    }
    public Map<Date, Integer> getReservationCountByDay() {
        List<ReservationColoc> reservations = reservationColocRepository.findAll();
        Map<Date, Integer> reservationCountMap = new HashMap<>();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");


        for (ReservationColoc reservation : reservations) {
            Date date = reservation.getDate();
            if (date != null) {
                int count = reservationCountMap.getOrDefault(date, 0);
                reservationCountMap.put(date, count + 1);
            }
        }
        return reservationCountMap;
    }

    @Override
    public Long getAnnonceIdFromReservation(Long reservationId) {
        ReservationColoc reservationColoc = reservationColocRepository.findById(reservationId).get();
        AnnonceColocation annonceColocation = reservationColoc.getAnnoncecolocation();
        if (annonceColocation != null) {
            return annonceColocation.getId();
        } else {
            throw new IllegalStateException("AnnonceColocation is not associated with the reservation");
        }    }


}
