package com.example.testeditions.Services;

import com.example.testeditions.Entites.ReservationAirbnb;

import java.util.Date;
import java.util.List;

public interface ReserAirbnbService {

    List<ReservationAirbnb> getAllReservations();

    ReservationAirbnb getReservationById(Long id);

    ReservationAirbnb createReservation(ReservationAirbnb reservation);

    ReservationAirbnb updateReservation(Long id, ReservationAirbnb reservation);

    void deleteReservation(Long id);

    List<Date> getBlockedDates(Long annonce);
    long getResvCount();
}
