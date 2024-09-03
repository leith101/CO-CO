package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.ReservationColoc;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.AnnonceColocationService;
import com.example.testeditions.Services.ReservationColocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/reservations-coloc")
public class ReservationColocController {

    @Autowired
    private ReservationColocService reservationColocService;
    @Autowired
    private AnnonceColocationService annonceColocationService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping
    public List<ReservationColoc> getAllReservations() {
        return reservationColocService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationColoc> getReservationById(@PathVariable Long id) {
        Optional<ReservationColoc> reservationOptional = reservationColocService.getReservationById(id);
        return reservationOptional.map(reservation -> ResponseEntity.ok().body(reservation))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{annonceId}")
    public ReservationColoc createReservation(@PathVariable Long annonceId, @RequestBody ReservationColoc reservationColoc,@RequestParam Long id) {
        return reservationColocService.createReservation(reservationColoc,annonceId,id) ;
    }

    @GetMapping("/annoncebyreservation/{reservationid}")
    public Long retreiveannoncefromreservation(@PathVariable  Long reservationid){

        return reservationColocService.getAnnonceIdFromReservation(reservationid);
    }




    @PutMapping("/{id}")
    public ResponseEntity<ReservationColoc> updateReservation(@PathVariable Long id, @RequestBody ReservationColoc newReservation) {
        ReservationColoc updatedReservation = reservationColocService.updateReservation(id, newReservation);
        return updatedReservation != null ? ResponseEntity.ok().body(updatedReservation) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationColocService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/stats/reservationCountByDay")
    public ResponseEntity<Map<String, Integer>> getReservationCountByDay() {
        Map<Date, Integer> reservationCountMap = reservationColocService.getReservationCountByDay();
        Map<String, Integer> formattedMap = new HashMap<>();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        for (Map.Entry<Date, Integer> entry : reservationCountMap.entrySet()) {
            String formattedDate = formatter.format(entry.getKey());
            formattedMap.put(formattedDate, entry.getValue());
        }

        return ResponseEntity.ok().body(formattedMap);
    }

    @GetMapping("/RetreiveUserfromReservation/{reservationid}")

    User retreiveuserfromreservation(@PathVariable Long reservationid){
        return userRepository.findByReservationColocsId(reservationid);
    }



}
