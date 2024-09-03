package com.example.testeditions.Services;

import com.example.testeditions.Entites.ReservationColoc;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ReservationColocService {
    List<ReservationColoc> getAllReservations();

    Optional<ReservationColoc> getReservationById(Long id);

    ReservationColoc createReservation(ReservationColoc reservationColoc,Long annonceId,Long id);
    ReservationColoc updateReservation(Long id, ReservationColoc newReservation);

    void deleteReservation(Long id);
    public Map<Date, Integer> getReservationCountByDay() ;

    public Long getAnnonceIdFromReservation(Long reservationId);



}