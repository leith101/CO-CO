package com.example.testeditions.Controllers;



import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Entites.Matchs;
import com.example.testeditions.Services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matches")
public class MatchController {



    @Autowired
    MatchService matchService;

    @GetMapping
    public ResponseEntity<List<Matchs>> getAllMatches() {
        List<Matchs> matches = matchService.getAllMatches();
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matchs> getMatchById(@PathVariable Long id) {
        Matchs match = matchService.getMatchById(id);
        return match != null ?
                new ResponseEntity<>(match, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/count")
    public ResponseEntity<Integer> getTotalMatchCount() {
        int count = matchService.getTotalMatchCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Matchs> createMatch(@RequestBody Matchs match) {
        Matchs savedMatch = matchService.saveMatch(match);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/createMatchIfMutualLike/{userId}/{profilId}")
    public ResponseEntity<?> createMatchIfMutualLike(@RequestBody LikeDislike likeDislike, @PathVariable Long userId, @PathVariable Long profilId) {
        try {
            Matchs match = matchService.createMatchIfMutualLike(likeDislike, userId, profilId);
            return ResponseEntity.ok(match);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/statistics/gender-percentages")
    public ResponseEntity<double[]> getMatchGenderPercentages() {
        try {
            // Récupérer les pourcentages des matchs par genre depuis le service
            double[] genderPercentages = matchService.getMatchPercentageByGender();
            // Retourner les pourcentages avec un statut HTTP 200 (OK)
            return ResponseEntity.ok().body(genderPercentages);
        } catch (Exception e) {
            // En cas d'erreur, retourner un statut HTTP 500 (Erreur Interne du Serveur)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/withUserInfo")
    public List<Map<String, String>> getMatchsWithUserInfo() {
        return matchService.getMatchsWithUserInfo();
    }
}
