package com.example.testeditions.Controllers;
import com.example.testeditions.Entites.Post;
import com.example.testeditions.Entites.StateLike;
import com.example.testeditions.Services.LikeServiceImpl;
import com.example.testeditions.Services.LikeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

public class LikeeController {

    @Autowired
    private LikeeService likeeService;

    @PostMapping("/like")
    public ResponseEntity<String> attribuerLike(@RequestParam Long postId, @RequestParam Long userId) {
        likeeService.attribuerLike(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Like attribué avec succès.");
    }

    @PostMapping("/dislike")
    public ResponseEntity<String> attribuerDislike(@RequestParam Long postId, @RequestParam Long userId) {
        likeeService.attribuerdislike(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Dislike attribué avec succès.");
    }

    @PostMapping("/haha")
    public ResponseEntity<String> attribuerHaha(@RequestParam Long postId, @RequestParam Long userId) {
        likeeService.attribuerhaha(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Haha attribué avec succès.");
    }

    @PostMapping("/love")
    public ResponseEntity<String> attribuerLove(@RequestParam Long postId, @RequestParam Long userId) {
        likeeService.attribuerlove(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Love attribué avec succès.");
    }

    @DeleteMapping("/posts/{postId}/like")
    public void supprimerLikeDuPost(@PathVariable Long postId) {
        likeeService.supprimerLike(postId);
    }
    @GetMapping("/check")
    public ResponseEntity<Boolean> verifierReacUtilisateur(@RequestParam Long postId, @RequestParam Long userId) {
        boolean utilisateurAAttribueReac = likeeService.utilisateurAAttribueReac(postId, userId);
        return ResponseEntity.ok(utilisateurAAttribueReac);
    }
    @GetMapping("/type-reaction")
    public StateLike getTypeReaction(@RequestParam Long postId, @RequestParam Long userId) {
        return likeeService.getTypeReaction(postId, userId);
    }
    @GetMapping("/posts/{postId}/reactions/count")
    public Map<String, Integer> countReactionsForPost(@PathVariable Long postId) {
        return likeeService.countReactionsForPost(postId);
    }
    @GetMapping("/posts/{postId}/count")
    public int countTotalReactionsForPost(@PathVariable Long postId) {
        return likeeService.countTotalReactionsForPost(postId);
    }

}


