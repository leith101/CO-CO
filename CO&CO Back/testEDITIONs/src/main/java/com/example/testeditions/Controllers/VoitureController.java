package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Repositories.VoitureRepository;
import com.example.testeditions.Services.UserService;
import com.example.testeditions.Services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/voitures")
public class VoitureController {

    @Autowired
     VoitureService voitureService;

    @Autowired
    VoitureRepository voitureRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping("/all-cars")
    public ResponseEntity<List<Voiture>> getAllVoitures() {
        List<Voiture> voitures = voitureService.getAllVoitures();
        return new ResponseEntity<>(voitures, HttpStatus.OK);
    }

    @GetMapping("/{idv}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable("idv") Long idv) {
        Voiture voiture = voitureService.getVoitureById(idv);
        return new ResponseEntity<>(voiture, HttpStatus.OK);
    }

    @PostMapping("/add-voiture/{userId}")
    public ResponseEntity<Voiture> registerVoiture(@PathVariable("userId") Long userId, @RequestBody Voiture voiture) {
        Voiture createdVoiture = voitureService.saveVoiture(userId, voiture);
        return new ResponseEntity<>(createdVoiture, HttpStatus.CREATED);
    }

    @PutMapping("/update-voiture/{idv}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable("idv") Long idv, @RequestBody Voiture updatedVoiture) {
        Voiture updated = voitureService.updateVoiture(idv, updatedVoiture);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete-voiture/{idv}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable("idv") Long idv) {
        voitureService.deleteVoiture(idv);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{userId}")
    public List<Voiture> getVoituresByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return voitureService.getVoituresByUser(user);
    }
    @GetMapping("/matricule/{matricule}")
    public ResponseEntity<Voiture> getVoitureByMatricule(@PathVariable String matricule) {
        Voiture voiture = voitureService.getVoitureByMatricule(matricule);
        if (voiture != null) {
            return new ResponseEntity<>(voiture, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/voiture/{userId}")
    public List<String> getVoitures(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        List<Voiture> voitures = voitureService.getVoituresByUser(user);
        List<String> matricules = new ArrayList<>();
        for (Voiture voiture : voitures) {
            matricules.add(voiture.getMatricule());
        }
        return matricules;
    }

    @GetMapping("/{userId}/{matricule}")
    public ResponseEntity<Voiture> getVoitureByUserAndMatricule(
            @PathVariable("userId") Long userId,
            @PathVariable("matricule") String matricule
    ) {
        User user = userService.getUserById(userId);
        if (user != null) {
            Voiture voiture = voitureService.getVoitureByUserAndMatricule(user, matricule);
            if (voiture != null) {
                return new ResponseEntity<>(voiture, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{userId}/{idv}")
    public ResponseEntity<String> deleteVoitureByUserIdAndIdv(@PathVariable("userId") Long userId, @PathVariable("idv") Long idv) {
        boolean deleted = voitureService.deleteVoitureByUserIdAndIdv(userId, idv);
        if (deleted) {
            return new ResponseEntity<>("Voiture deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Voiture not found or deletion failed", HttpStatus.NOT_FOUND);
        }
    }



}
