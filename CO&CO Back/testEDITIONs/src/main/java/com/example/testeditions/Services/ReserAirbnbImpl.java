package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceAirbnb;
import com.example.testeditions.Entites.ReservationAirbnb;
import com.example.testeditions.Repositories.AnnonceAirbnbRepository;
import com.example.testeditions.Repositories.ReservationAirbnbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReserAirbnbImpl implements  ReserAirbnbService{

    @Autowired
    private ReservationAirbnbRepository reservationRepository;

    @Autowired
    private AnnonceAirbnbRepository annonceRepository;
    @Override
    public List<ReservationAirbnb> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public ReservationAirbnb getReservationById(Long id) {
        Optional<ReservationAirbnb> optionalReservation = reservationRepository.findById(id);
        return optionalReservation.orElse(null);
    }

    @Override
    public ReservationAirbnb createReservation(ReservationAirbnb reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public ReservationAirbnb updateReservation(Long id, ReservationAirbnb reservation) {
        if (reservationRepository.existsById(id)) {
            reservation.setId(id);
            return reservationRepository.save(reservation);
        }
        return null;
    }

    @Override
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public List<Date> getBlockedDates(Long idAnnonce){
        AnnonceAirbnb annonce = annonceRepository.findById(idAnnonce).orElse(null);
        List<ReservationAirbnb> reservations =  reservationRepository.findByAnnonceAirbnb(annonce);
        List<Date> dates = new ArrayList();
        for (ReservationAirbnb reservation : reservations) {
            dates.add(reservation.getDateDebut());
            dates.add(reservation.getDateFin());
        }
        return dates;
    }

    @Override
    public long getResvCount() {
        return reservationRepository.count();
    }

//    @Autowired
//    private ReservationAirbnbRepository reservationAirbnbRepository;
//
//    public Map<String, Integer> calculateReservationDurationDistribution() {
//        List<ReservationAirbnb> reservations = reservationRepository.findAll();
//        Map<String, Integer> durationDistribution = new HashMap<>();
//
//        for (ReservationAirbnb reservation : reservations) {
//            long durationInMillis = reservation.getDateFin().getTime() - reservation.getDateDebut().getTime();
//            long durationInDays = durationInMillis / (1000 * 60 * 60 * 24); // Convert milliseconds to days
//
//            // Categorize reservation duration into ranges
//            String durationRange = categorizeDurationRange(durationInDays);
//
//            // Increment count for the duration range
//            durationDistribution.put(durationRange, durationDistribution.getOrDefault(durationRange, 0) + 1);
//        }
//
//        return durationDistribution;
//    }
//
//    private String categorizeDurationRange(long durationInDays) {
//        if (durationInDays <= 7) {
//            return "Short-term (1-3 days)";
//        } else if (durationInDays <= 30) {
//            return "Medium-term (4-7 days)";
//        } else {
//            return "Long-term (8+ days)";
//        }
//    }
}
