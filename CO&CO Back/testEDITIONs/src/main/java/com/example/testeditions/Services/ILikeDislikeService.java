package com.example.testeditions.Services;

import com.example.testeditions.Entites.LikeDislike;

import java.util.List;
import java.util.Optional;

public interface ILikeDislikeService {

    public LikeDislike saveLikeDislike(LikeDislike likeDislike, Long userId, Long profilId);

    Optional<LikeDislike> getLikeDislikeById(Long id);

    List<LikeDislike> getAllLikeDislikes();

    void deleteLikeDislike(Long id);
    public boolean hasUserLikedProfile(Long userId, Long profilId);

    public double getPercentageOfUsersWhoLikedOrDisliked();
    // Ajoutez d'autres méthodes de service si nécessaire
}