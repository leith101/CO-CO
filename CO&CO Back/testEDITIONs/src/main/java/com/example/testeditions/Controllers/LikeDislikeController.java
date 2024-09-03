package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Services.ILikeDislikeService;
import com.example.testeditions.Services.LikeDislikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likedislikes")
public class LikeDislikeController {



    @Autowired
    LikeDislikeService likeDislikeService;

    @PostMapping("/{userId}/{profilId}")
    public ResponseEntity<LikeDislike> saveLikeDislike(@RequestBody LikeDislike likeDislike,
                                                       @PathVariable("userId") Long userId,
                                                       @PathVariable("profilId") Long profilId) {
        LikeDislike savedLikeDislike = likeDislikeService.saveLikeDislike(likeDislike, userId, profilId);
        return new ResponseEntity<>(savedLikeDislike, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LikeDislike> getLikeDislikeById(@PathVariable("id") Long id) {
        Optional<LikeDislike> likeDislike = likeDislikeService.getLikeDislikeById(id);
        return likeDislike.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<LikeDislike>> getAllLikeDislikes() {
        List<LikeDislike> likeDislikes = likeDislikeService.getAllLikeDislikes();
        return new ResponseEntity<>(likeDislikes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLikeDislike(@PathVariable("id") Long id) {
        likeDislikeService.deleteLikeDislike(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/check/{userId}/{profilId}")
    public ResponseEntity<Boolean> checkUserLikedProfile(@PathVariable Long userId, @PathVariable Long profilId) {
        // Vérifier si l'utilisateur a déjà aimé le profil
        boolean userLikedProfile = likeDislikeService.hasUserLikedProfile(userId, profilId);

        // Renvoyer le résultat avec un code de statut approprié
        return ResponseEntity.ok().body(userLikedProfile);
    }
    @GetMapping("/totalLikes")
    public long getTotalLikes() {
        return likeDislikeService.getTotalLikes();
    }
    @GetMapping("/percentage")
    public double getPercentageOfUsersWhoLikedOrDisliked() {
        return likeDislikeService.getPercentageOfUsersWhoLikedOrDisliked();
    }
    @GetMapping("/total")
    public long getTotalReactions() {
        return likeDislikeService.getTotalReactions();
    }

    // Ajoutez d'autres méthodes de contrôleur si nécessaire
}
