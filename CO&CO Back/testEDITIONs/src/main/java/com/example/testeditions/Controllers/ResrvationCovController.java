package com.example.testeditions.Controllers;


import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;
import com.example.testeditions.Services.ReservationCovService;
import com.example.testeditions.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ResrvationCovController {

    @Autowired
    ReservationCovService reservationCovService;
    @Autowired
    UserService userService;


        @GetMapping("/retrieve-all-reservations")
    public ResponseEntity<List<ReservationCov>> getAllReservations() {
        List<ReservationCov> reservations = reservationCovService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
    @GetMapping("/retrieve-all-reservations/{idr}")
    public ResponseEntity<ReservationCov> getReservationById(@PathVariable Long idr) {
        ReservationCov reservation = reservationCovService.getReservationById(idr);
        if (reservation != null) {
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/make-reservation/{ida}/{userId}")
    public ResponseEntity<ReservationCov> makeReservation(
            @PathVariable Long ida,
            @PathVariable Long userId) {
        ReservationCov madeReservation = reservationCovService.createReservation(ida, userId);
        if (madeReservation != null) {
            return new ResponseEntity<>(madeReservation, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update-reservation/{idr}")
    public ResponseEntity<ReservationCov> updateReservation(
            @PathVariable Long idr,
            @RequestBody ReservationCov updatedReservations) {
        ReservationCov reservation = reservationCovService.updateReservation(idr, updatedReservations);
        if (reservation != null) {
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/cancel-reservation/{idr}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long idr) {
        reservationCovService.deleteReservation(idr);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{userId}")
    public List<ReservationCov> getReservationByUser(
            @PathVariable("userId") Long userId

    ) {
        User user = userService.getUserById(userId);
        return reservationCovService.getReservationByUser(user);

}


    @GetMapping("/owner-name/{idr}")
    public ResponseEntity<?> getReservationOwnerName(@PathVariable Long idr) {
        Optional<ReservationCov> reservation = reservationCovService.findReservationByIdr(idr); // Correct method name
        if (reservation.isPresent()) {
            String ownerName = reservation.get().getUser().getNom();
            return ResponseEntity.ok(ownerName);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        }
    }

    @GetMapping("/owner-phone/{idr}")
    public ResponseEntity<?> getReservationOwnerPhone(@PathVariable Long idr) {
        Optional<ReservationCov> reservation = reservationCovService.findReservationByIdr(idr);
        if (reservation.isPresent()) {
            int ownerPhone = reservation.get().getUser().getTelephone();
            return ResponseEntity.ok(ownerPhone);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        }
    }

    @DeleteMapping("/delete/{userId}/{idr}")
    public ResponseEntity<String> deleteReservationByUserIdAndIdr(@PathVariable("userId") Long userId, @PathVariable("idr") Long idr) {
        boolean deleted = reservationCovService.deleteReservationByUserId(userId, idr);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found or deletion failed", HttpStatus.NOT_FOUND);
        }

    }

}
