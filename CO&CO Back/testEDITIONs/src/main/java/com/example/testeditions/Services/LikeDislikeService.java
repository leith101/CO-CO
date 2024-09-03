package com.example.testeditions.Services;


import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Entites.MatchStatus;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.LikeDislikeRepository;
import com.example.testeditions.Repositories.ProfilRepository;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.ILikeDislikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeDislikeService implements ILikeDislikeService {



    @Autowired
    LikeDislikeRepository likeDislikeRepository;
    @Autowired
    private ProfilRepository profilRepository;
    @Autowired
    private UserRepository userRepository;


    public LikeDislike saveLikeDislike(LikeDislike likeDislike, Long userId, Long profilId) {
        // Récupérer le profil et l'utilisateur associés aux IDs fournis
        Optional<Profil> optionalProfil = profilRepository.findById(profilId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalProfil.isPresent() && optionalUser.isPresent()) {
            // Extraire les objets Profil et User de l'Optional
            Profil profil = optionalProfil.get();
            User user = optionalUser.get();

            // Associer le profil et l'utilisateur au LikeDislike
            likeDislike.setProfil(profil);
            likeDislike.setUser(user);
            // Enregistrer le LikeDislike
            return likeDislikeRepository.save(likeDislike);
        } else {
            // Gérer le cas où le profil ou l'utilisateur n'existe pas
            throw new RuntimeException("Profil or User not found");
        }
    }
    public boolean hasUserLikedProfile(Long userId, Long profilId) {
        // Vérifie si un enregistrement de like existe pour l'utilisateur et le profil spécifiés
        return likeDislikeRepository.existsByUserIdAndProfilId(userId, profilId);
    }
    public Optional<LikeDislike> getLikeDislikeById(Long id) {
        return likeDislikeRepository.findById(id);
    }

    public List<LikeDislike> getAllLikeDislikes() {
        return likeDislikeRepository.findAll();
    }

    public void deleteLikeDislike(Long id) {
        likeDislikeRepository.deleteById(id);
    }

    // Ajoutez d'autres méthodes de service si nécessaire
    public long getTotalLikes() {
        return likeDislikeRepository.countByMatchStatus(MatchStatus.LIKE);
    }

    public double getPercentageOfUsersWhoLikedOrDisliked() {
        // Récupérer le nombre total d'utilisateurs et le nombre total de likes/dislikes
        long totalUsers = userRepository.count();
        long totalLikesAndDislikes = likeDislikeRepository.count();

        // Calculer le pourcentage
        if (totalUsers > 0) {
            double percentage = ((double) totalLikesAndDislikes / totalUsers) ;
            return percentage;
        } else {
            // Gérer le cas où il n'y a aucun utilisateur dans la base de données
            throw new RuntimeException("No users found in the database");
        }
    }
    public long getTotalReactions() {
        return likeDislikeRepository.count();
    }
}
