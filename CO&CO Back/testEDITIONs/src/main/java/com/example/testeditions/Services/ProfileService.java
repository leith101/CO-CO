package com.example.testeditions.Services;


import com.example.testeditions.Entites.GenreType;
import com.example.testeditions.Entites.Matchs;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.MatchRepository;
import com.example.testeditions.Repositories.ProfilRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProfileService implements IProfileService {

    @Autowired
    private ProfilRepository profileRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MatchRepository matchsRepository;




    @Override
    public Profil createProfile(Profil profile, Long userId) {
        // Recherche de l'utilisateur par ID
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            // Si l'utilisateur existe, l'attribuer au profil
            User user = optionalUser.get();
            profile.setUser(user);
            // Enregistrer le profil dans la base de données
            return profileRepository.save(profile);
        } else {
            // Gérer le cas où l'utilisateur n'existe pas
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }
    public Map<String, Long> countGender() {
        List<Profil> profiles = profileRepository.findAll();
        Map<String, Long> genderCount = new HashMap<>();
        long maleCount = 0;
        long femaleCount = 0;

        for (Profil profile : profiles) {
            if (profile.getUser().getGenre() == GenreType.Homme) {
                maleCount++;
            } else if (profile.getUser().getGenre() == GenreType.femme) {
                femaleCount++;
            }
        }

        genderCount.put("Hommes", maleCount);
        genderCount.put("Femmes", femaleCount);

        return genderCount;
    }

    @Override
    public Profil getProfileById(Long profileId) {
        Optional<Profil> optionalProfile = profileRepository.findById(profileId);
        return optionalProfile.orElse(null);
    }
    public List<Profil> getAllProfiles() {
        return profileRepository.findAll();
    }

    @Override
    public void deleteProfile(Long profileId) {
        profileRepository.deleteById(profileId);
    }
    public List<Map<String, String>> getProfilesWithUserNames() {
        List<Profil> profiles = profileRepository.findAll();
        List<Map<String, String>> profilesWithNames = new ArrayList<>();

        for (Profil profile : profiles) {
            Map<String, String> profileInfo = new HashMap<>();
            User user = profile.getUser();
            profileInfo.put("id du profil",  String.valueOf(profile.getId()));

            profileInfo.put("Nom", user.getNom());
            profileInfo.put("Description du profil", profile.getDescription());
            profileInfo.put("Age du profil", String.valueOf(profile.getAge())); // Convert int to String
            profileInfo.put("localisation du profil", profile.getLocalisation());
            profileInfo.put("prefernce du profil", profile.getPreferencesRecherche());
            profileInfo.put("image du profil", profile.getImage());
            profilesWithNames.add(profileInfo);
        }

        return profilesWithNames;
    }

    // Implémentez d'autres méthodes de service nécessaires
}
