package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.ReservationAirbnb;
import com.example.testeditions.Services.ReserAirbnbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReserAirbnbController {

    @Autowired
    private ReserAirbnbService reservationService;

    @GetMapping
    public List<ReservationAirbnb> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ReservationAirbnb getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @PostMapping
    public ReservationAirbnb createReservation(@RequestBody ReservationAirbnb reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    public ReservationAirbnb updateReservation(@PathVariable Long id, @RequestBody ReservationAirbnb reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    @GetMapping("/date/{idAnnonce}")
    public List<Date> getBlockedDates(@PathVariable Long idAnnonce) {
        return reservationService.getBlockedDates(idAnnonce);
    }

    @GetMapping("/count")
    public long count() {
        return reservationService.getResvCount();
    }
}
