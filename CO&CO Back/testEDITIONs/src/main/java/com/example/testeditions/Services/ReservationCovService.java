package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceCov;
import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;

import java.util.List;
import java.util.Optional;

public interface ReservationCovService {

    List<ReservationCov> getAllReservations();
    ReservationCov getReservationById(Long idr);
    ReservationCov createReservation(Long ida, Long userId);
    ReservationCov updateReservation(Long idr, ReservationCov updatedReservations);
    void deleteReservation(Long idr);
   List<ReservationCov> getReservationByUser(User user);
    Optional<ReservationCov> findReservationByIdr(Long idr);

    List<ReservationCov> getReservationByAnnonceCov(AnnonceCov annonceCov);
    String getReservationOwnerName(Long idr);
    boolean deleteReservationByUserId(Long userId, Long idr);

    int getReservationOwnerPhone(Long idr);



}
