package com.example.testeditions.Services;




import com.example.testeditions.Entites.*;
import com.example.testeditions.Repositories.LikeDislikeRepository;
import com.example.testeditions.Repositories.MatchRepository;
import com.example.testeditions.Repositories.ProfilRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MatchService {

    @Autowired
    ProfilRepository profilRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MatchRepository matchRepository;
    @Autowired
    LikeDislikeRepository likeDislikeRepository;


    public List<Matchs> getAllMatches() {
        return matchRepository.findAll();
    }

    public Matchs getMatchById(Long id) {
        return matchRepository.findById(id).orElse(null);
    }

    public Matchs saveMatch(Matchs match) {
        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
    public Matchs createMatchIfMutualLike(LikeDislike likeDislike, Long userId, Long profilId) {
        // Récupérer le profil de l'utilisateur aimé
        Profil profil = profilRepository.findById(profilId)
                .orElseThrow(() -> new RuntimeException("Profil not found"));

        // Récupérer l'utilisateur qui a aimé le profil
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si le profil de l'utilisateur aimé a aimé l'utilisateur actuel
        LikeDislike existingLikeByProfil = likeDislikeRepository.findByProfilAndUser(profil, user);

        User user1=userRepository.findByProfil(profil).get();
        Profil profile1=profilRepository.findByUser(user);


        // Vérifier si l'utilisateur actuel a aimé le profil de l'utilisateur aimé
        LikeDislike existingLikeByUser = likeDislikeRepository.findByProfilAndUser(profile1, user1);

        if (existingLikeByProfil != null && existingLikeByUser != null) {
            // Créer un nouveau match
            Matchs match = new Matchs();
            match.setUser1(existingLikeByUser.getUser());
            match.setUser2(existingLikeByProfil.getUser());
            // Enregistrer le match dans la base de données
            return matchRepository.save(match);
        } else {
            // Aucun match mutuel trouvé
            throw new RuntimeException("Mutual like not found");
        }
    }
    public double[] getMatchPercentageByGender() {
        // Récupérer tous les matchs de la base de données
        List<Matchs> allMatches = matchRepository.findAll();

        // Initialiser les compteurs
        int maleMaleCount = 0;
        int femaleFemaleCount = 0;
        int maleFemaleCount = 0;

        // Parcourir tous les matchs
        for (Matchs match : allMatches) {
            // Récupérer les utilisateurs impliqués dans le match
            User user1 = match.getUser1();
            User user2 = match.getUser2();

            // Vérifier le genre des deux utilisateurs
            if (user1.getGenre() == user2.getGenre()) {
                // Si les deux utilisateurs ont le même genre
                if (user1.getGenre() == GenreType.Homme) {
                    // Deux hommes
                    maleMaleCount++;
                } else {
                    // Deux femmes
                    femaleFemaleCount++;
                }
            } else {
                // Un homme et une femme
                maleFemaleCount++;
            }
        }

        // Calculer les pourcentages
        int totalCount = allMatches.size();
        double maleMalePercentage = (double) maleMaleCount / totalCount * 100;
        double femaleFemalePercentage = (double) femaleFemaleCount / totalCount * 100;
        double maleFemalePercentage = (double) maleFemaleCount / totalCount * 100;

        return new double[]{maleMalePercentage, femaleFemalePercentage, maleFemalePercentage};
    }
    public int getTotalMatchCount() {
        // Récupérer tous les matchs de la base de données
        List<Matchs> allMatches = matchRepository.findAll();

        // Retourner le nombre total de matchs
        return allMatches.size();
    }
    public List<Map<String, String>> getMatchsWithUserInfo() {
        // Récupérer tous les matchs de la base de données
        List<Matchs> allMatches = matchRepository.findAll();

        // Initialiser une liste pour stocker les informations des matchs avec les informations des utilisateurs
        List<Map<String, String>> matchsWithUserInfo = new ArrayList<>();

        // Parcourir tous les matchs
        for (Matchs match : allMatches) {
            // Récupérer les utilisateurs impliqués dans le match
            User user1 = match.getUser1();
            User user2 = match.getUser2();

            // Créer un objet Map pour stocker les informations des utilisateurs associés à ce match
            Map<String, String> matchInfo = new HashMap<>();
            matchInfo.put("MatchId", String.valueOf(match.getId()));
            matchInfo.put("User1Name", user1.getNom());
            matchInfo.put("User1Gender", user1.getGenre().toString());
            matchInfo.put("User1email", user1.getEmail());


            matchInfo.put("User2Name", user2.getNom());
            matchInfo.put("User2Gender", user2.getGenre().toString());
            matchInfo.put("User2email", user2.getEmail());

            // Ajouter cet objet Map à la liste des matchs avec les informations des utilisateurs
            matchsWithUserInfo.add(matchInfo);
        }

        return matchsWithUserInfo;
    }


}

