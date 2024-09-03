package com.example.testeditions.Services;

import com.example.testeditions.Entites.Commentaire;
import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Entites.Voiture;

import java.util.List;
import java.util.Optional;

public interface CommentaireService {
    List<Commentaire> getAllCommentaires();
    Commentaire getCommentaireById(Long idco);
    Commentaire saveCommentaire(Commentaire commentaire);
    Commentaire updateCommentaire(Long idco, Commentaire updatedCommentaire);
    void deleteCommentaire(Long idco);

    Optional<Commentaire> findCommentaireByIdco(Long idco);

    List<Commentaire> getCommentsByUser(User user);

    List<Commentaire> getCommentsByAnnonceCovId(Long annonceCovId);

    boolean  deleteCommentaireByUserIdAndIdco(Long userId, Long idco);

    Commentaire likeComment(Long idco, Long userId);
    Commentaire dislikeComment(Long idco, Long userId);

    long getLikeCount(Long idco);
    long getDislikeCount(Long idco);

        void deleteLikeForComment(Long idco, Long userId);
    void deleteDislikeForComment(Long idco, Long userId);


    String getCommentaireOwnerName(Long idco);

    Commentaire toggleLikeForComment(Long idco, Long userId);
    Commentaire toggleDislikeForComment(Long idco, Long userId);

}
