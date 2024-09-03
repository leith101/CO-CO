package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceCov;
import com.example.testeditions.Entites.Notification;
import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.AnnonceCovRepository;
import com.example.testeditions.Repositories.NotificationRepository;
import com.example.testeditions.Repositories.ReservationCovRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationCovImpl implements ReservationCovService {

    @Autowired
    private ReservationCovRepository reservationCovRepository;

    /*@Autowired
    private NotificationProducer notificationProducer;*/
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AnnonceCovRepository annonceCovRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<ReservationCov> getAllReservations() {
        return reservationCovRepository.findAll();
    }

    @Override
    public ReservationCov getReservationById(Long idr) {
        return reservationCovRepository.findById(idr).orElse(null);
    }

    @Override
    public ReservationCov createReservation(Long ida, Long userId) {
        AnnonceCov annonceCov = annonceCovRepository.findById(ida).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (annonceCov == null) {
            throw new IllegalArgumentException("Annonce not found with ID: " + ida);
        }

        if (user == null) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        if (annonceCov.getPlacesDisponibles() <= 0) {
            throw new IllegalStateException("No available places in the annonce with ID: " + ida);
        }

        // Create a new reservation
        ReservationCov reservation = new ReservationCov();
        reservation.setUser(user);
        reservation.setAnnonceCov(annonceCov);
        reservation.setReservationTime(new Date());

        Notification notification = new Notification();
        notification.setUser(annonceCov.getUser());
        notification.setContent("New reservation by " + user.getNom() + " on your annonce '" + annonceCov.getTitre() + "'");
        notification.setTimestamp(new Date());
        notification.set_read(false);

        notificationRepository.save(notification);

        annonceCov.setPlacesDisponibles(annonceCov.getPlacesDisponibles() - 1);
        annonceCovRepository.save(annonceCov);
       /* String message = "User " + user.getNom() + " reserved on your annonce '" + annonceCov.getTitre() + "'";
        notificationProducer.sendReservationNotification(message);*/

        return reservationCovRepository.save(reservation);
    }

    @Override
    public String getReservationOwnerName(Long idr) {
        Optional<ReservationCov> reservation = reservationCovRepository.findByIdr(idr);
        if (reservation.isPresent()) {
            return reservation.get().getUser().getNom();
        }
        throw new RuntimeException("Reservation not found");
    }

    @Override
    public int getReservationOwnerPhone(Long idr) {
        Optional<ReservationCov> reservation = reservationCovRepository.findByIdr(idr);
        if (reservation.isPresent()) {
            return reservation.get().getUser().getTelephone();
        }
        throw new RuntimeException("Reservation not found");
    }

    @Override
    public Optional<ReservationCov> findReservationByIdr(Long idr) {
        return reservationCovRepository.findByIdr(idr); // Use the repository to fetch the reservation
    }
    @Override
    public ReservationCov updateReservation(Long idr, ReservationCov updatedReservations) {
        ReservationCov existingReservations = reservationCovRepository.findById(idr).orElse(null);

        if (existingReservations != null) {
            existingReservations.setReservationTime(updatedReservations.getReservationTime());

            return reservationCovRepository.save(existingReservations);
        }

        return null;
    }


    @Override
    public void deleteReservation(Long idr) {
        ReservationCov reservation = reservationCovRepository.findById(idr).orElse(null);

        if (reservation != null) {
            AnnonceCov annonceCov = reservation.getAnnonceCov();

            annonceCov.setPlacesDisponibles(annonceCov.getPlacesDisponibles() + 1);
            annonceCovRepository.save(annonceCov);
            reservationCovRepository.deleteById(idr);
        }
    }

    @Override
   public List<ReservationCov> getReservationByUser(User user){
        return reservationCovRepository.findByUser(user);
    }

    @Override
    public List<ReservationCov> getReservationByAnnonceCov(AnnonceCov annonceCov){
        return reservationCovRepository.findByAnnonceCov(annonceCov);
    }


    @Override
    public boolean deleteReservationByUserId(Long userId, Long idr) {
        ReservationCov reservationCov = reservationCovRepository.findByUserIdAndIdr(userId, idr);
        if (reservationCov != null) {
            AnnonceCov annonceCov = reservationCov.getAnnonceCov();
            annonceCov.setPlacesDisponibles(annonceCov.getPlacesDisponibles() + 1);
            annonceCovRepository.save(annonceCov);
            reservationCovRepository.delete(reservationCov);
            return true;
        } else {
            return false;
        }
    }

}
