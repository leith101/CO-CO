package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;
@CrossOrigin("*")
@RestController
@RequestMapping("/profiles")
public class ProfileController {
    @Value("${image.upload.directory:C:\\Users\\med amine nsir\\Downloads\\Co-Co2-main\\Front\\src\\assets}")
    private String imageUploadDirectory;

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /*@PostMapping("/create")
    public ResponseEntity<Profil> createProfile(@RequestBody Profil profile, @RequestParam("userId") Long userId) {
        try {
            // Créer le profil et l'associer à l'utilisateur spécifié
            Profil createdProfile = profileService.createProfile(profile, userId);
            return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Gérer les erreurs, par exemple si l'utilisateur spécifié n'existe pas
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }*/
    @GetMapping("/count-gender")
    public Map<String, Long> countGender() {
        return profileService.countGender();
    }
    @PostMapping
    public ResponseEntity<String> createProfile(
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam("userId") Long userId,
            @RequestParam("description") String description,
            @RequestParam("age") int age,
            @RequestParam("localisation") String localisation,
            @RequestParam("preferencesRecherche") String preferencesRecherche) {
        // Check if the image file is provided
        if (imageFile == null || imageFile.isEmpty()) {
            return new ResponseEntity<>("Image is required", HttpStatus.BAD_REQUEST);
        }

        // Generate a unique filename for the image
        String imageName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

        try {
            // Save the image to the specified directory
            Path imagePath = Paths.get(imageUploadDirectory, imageName);
            imageFile.transferTo(imagePath.toFile());
            Profil profil = new Profil();
            profil.setImage(imageName);
            profil.setDescription(description);
            profil.setAge(age);
            profil.setLocalisation(localisation);
            profil.setPreferencesRecherche(preferencesRecherche);

            profileService.createProfile(profil,userId);

        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload the image", HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getProfileById(@PathVariable("id") Long profileId) {
        Profil profile = profileService.getProfileById(profileId);
        if (profile != null) {
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/names")
    public ResponseEntity<List<Map<String, String>>> getProfilesWithUserNames() {
        List<Map<String, String>> profiles = profileService.getProfilesWithUserNames();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping
    public ResponseEntity<List<Profil>> getAllProfiles() {
        List<Profil> profiles = profileService.getAllProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable("id") Long profileId) {
        profileService.deleteProfile(profileId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Implémentez d'autres méthodes de contrôleur si nécessaire
}
