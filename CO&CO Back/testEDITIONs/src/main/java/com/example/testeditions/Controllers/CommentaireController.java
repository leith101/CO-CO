package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.*;
import com.example.testeditions.Repositories.AnnonceCovRepository;
import com.example.testeditions.Repositories.CommentDislikeRepository;
import com.example.testeditions.Repositories.CommentaireRepository;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.AnnonceCovService;
import com.example.testeditions.Services.CommentaireService;
import com.example.testeditions.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    @Autowired
    CommentaireRepository commentaireRepository;
    @Autowired
    AnnonceCovService annonceCovService;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CommentDislikeRepository commentDislikeRepository;
    @Autowired
    AnnonceCovRepository annonceCovRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Commentaire>> getAllCommentaires() {
        List<Commentaire> commentaires = commentaireService.getAllCommentaires();
        return new ResponseEntity<>(commentaires, HttpStatus.OK);
    }

    @GetMapping("/{idco}")
    public ResponseEntity<Commentaire> getCommentaireById(@PathVariable("idco") Long idco) {
        Commentaire commentaire = commentaireService.getCommentaireById(idco);
        if (commentaire != null) {
            return new ResponseEntity<>(commentaire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/owner-name/{idco}")
    public ResponseEntity<?> getCommentaireOwnerName(@PathVariable Long idco) {
        Optional<Commentaire> commentaire = commentaireService.findCommentaireByIdco(idco);
        if (commentaire.isPresent()) {
            String ownerName = commentaire.get().getUser().getNom();
            return ResponseEntity.ok(ownerName);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Commentaire not found");
        }
    }

    @GetMapping("/user/{userId}")
    public List<Commentaire> getCommentsByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return commentaireService.getCommentsByUser(user);
    }

    @GetMapping("/annonce/{annonceCovId}")
    public ResponseEntity<List<Commentaire>> getCommentsByAnnonceCovId(@PathVariable Long annonceCovId) {
        List<Commentaire> commentaires = commentaireService.getCommentsByAnnonceCovId(annonceCovId);
        return new ResponseEntity<>(commentaires, HttpStatus.OK);
    }

    @PostMapping("/add/{userId}/{annonceCovId}")
    public ResponseEntity<Commentaire> saveCommentaire(@RequestBody Commentaire commentaire,
                                                       @PathVariable("userId") Long userId,
                                                       @PathVariable("annonceCovId") Long annonceCovId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        AnnonceCov annonceCov = annonceCovRepository.findById(annonceCovId)
                .orElseThrow(() -> new RuntimeException("annonce not found with id: " + annonceCovId));

        commentaire.setUser(user);
        commentaire.setAnnonceCov(annonceCov);

        String commentText = commentaire.getComments();
        commentaire.setComments(commentText);

        Commentaire createdCommentaire = commentaireService.saveCommentaire(commentaire);
        return new ResponseEntity<>(createdCommentaire, HttpStatus.CREATED);
    }

    @PutMapping("/update/{idco}")
    public ResponseEntity<Commentaire> updateCommentaire(@PathVariable("idco") Long idco, @RequestBody Commentaire updatedCommentaire) {
        Commentaire updated = commentaireService.updateCommentaire(idco, updatedCommentaire);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{idco}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable("idco") Long idco) {
        commentaireService.deleteCommentaire(idco);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

 /*   @PostMapping("/like/{idco}/{userId}")
    public ResponseEntity<Commentaire> likeComment(@PathVariable("idco") Long idco, @PathVariable("userId") Long userId) {
        Commentaire commentaire = commentaireRepository.findById(idco)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + idco));

        // Check if the user has already liked the comment
        boolean alreadyLiked = commentaire.getLikes() == 1;

        // Toggle like
        if (alreadyLiked) {
            commentaire.setLikes(0); // Remove like
        } else {
            commentaire.setLikes(1); // Add like
            commentaire.setDislikes(0); // Reset dislikes
        }

        Commentaire updatedCommentaire = commentaireService.saveCommentaire(commentaire);
        return new ResponseEntity<>(updatedCommentaire, HttpStatus.OK);
    }

    @PostMapping("/dislike/{idco}/{userId}")
    public ResponseEntity<Commentaire> dislikeComment(@PathVariable("idco") Long idco, @PathVariable("userId") Long userId) {
        Commentaire commentaire = commentaireRepository.findById(idco)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + idco));

        // Check if the user has already disliked the comment
        boolean alreadyDisliked = commentaire.getDislikes() == 1;

        // Toggle dislike
        if (alreadyDisliked) {
            commentaire.setDislikes(0); // Remove dislike
        } else {
            commentaire.setDislikes(1); // Add dislike
            commentaire.setLikes(0); // Reset likes
        }

        Commentaire updatedCommentaire = commentaireService.saveCommentaire(commentaire);
        return new ResponseEntity<>(updatedCommentaire, HttpStatus.OK);
    }

    @GetMapping("/likes/{idco}")
    public ResponseEntity<Integer> getLikesForComment(@PathVariable("idco") Long idco) {
        int totalLikes = commentaireRepository.getLikesForComment(idco); // Implement this method in your repository
        return ResponseEntity.ok(totalLikes);
    }

    // Endpoint to get the sum of dislikes for a comment
    @GetMapping("/dislikes/{idco}")
    public ResponseEntity<Integer> getDislikesForComment(@PathVariable("idco") Long idco) {
        int totalDislikes = commentaireRepository.getDislikesForComment(idco); // Implement this method in your repository
        return ResponseEntity.ok(totalDislikes);
    }*/



    @PostMapping("/{parentId}/reply")
    public ResponseEntity<Commentaire> replyToComment(@PathVariable("parentId") Long parentId, @RequestBody Commentaire replyComment) {
        Commentaire parentComment = commentaireRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found with id: " + parentId));

        replyComment.setAnnonceCov(parentComment.getAnnonceCov());
        replyComment.setUser(parentComment.getUser());

        Commentaire savedReply = commentaireService.saveCommentaire(replyComment);
        return ResponseEntity.ok(savedReply);
    }

    @DeleteMapping("/delete/{userId}/{idco}")
    public ResponseEntity<String> deleteCommentaireByUserIdAndIdco(@PathVariable("userId") Long userId, @PathVariable("idco") Long idco) {
        boolean deleted = commentaireService.deleteCommentaireByUserIdAndIdco(userId, idco);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found or deletion failed", HttpStatus.NOT_FOUND);
        }

    }

        @PostMapping("/like/{idco}/{userId}")
        public ResponseEntity<Commentaire> likeComment(@PathVariable Long idco, @PathVariable Long userId) {
            Commentaire commented = commentaireService.likeComment(idco, userId);
            if (commented != null) {
                return new ResponseEntity<>(commented, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }


        @PostMapping("/dislike/{idco}/{userId}")
        public ResponseEntity<Commentaire> dislikeComment(@PathVariable Long idco, @PathVariable Long userId) {
            Commentaire commented = commentaireService.dislikeComment(idco, userId);
            if (commented != null) {
                return new ResponseEntity<>(commented, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

    @GetMapping("/{idco}/likes")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long idco) {
        long likeCount = commentaireService.getLikeCount(idco);
        return new ResponseEntity<>(likeCount, HttpStatus.CREATED);
    }

    @GetMapping("/{idco}/dislikes")
    public ResponseEntity<Long> getDislikeCount(@PathVariable Long idco) {
        long dislikeCount = commentaireService.getDislikeCount(idco);
        return new ResponseEntity<>(dislikeCount, HttpStatus.OK);
    }

    @DeleteMapping("/{idco}/likes/{userId}")
    public ResponseEntity<?> deleteLikeForComment(@PathVariable Long idco, @PathVariable Long userId) {
        commentaireService.deleteLikeForComment(idco, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{idco}/dislikes/{userId}")
    public ResponseEntity<?> deleteDislikeForComment(@PathVariable Long idco, @PathVariable Long userId) {
        commentaireService.deleteDislikeForComment(idco, userId);
        return ResponseEntity.ok().build();
    }


}