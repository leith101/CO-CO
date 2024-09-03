package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.AnnonceAirbnb;
import com.example.testeditions.Entites.TypeLocale;
import com.example.testeditions.Services.AnnAirbnbService;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/announcements")
public class AnnAirbnbController {

    @Value("${image.upload.directory:C:\\Users\\21655\\Desktop\\projet\\Front\\src\\assets\\images}")
    private String imageUploadDirectory;
    private final AnnAirbnbService service;

    @Autowired
    public AnnAirbnbController(AnnAirbnbService service) {
        this.service = service;
    }

    @GetMapping
    public List<AnnonceAirbnb> getAllAnnouncements() {
        return service.getAllAnnouncements();
    }

    @GetMapping("/{id}")
    public AnnonceAirbnb getAnnouncementById(@PathVariable Long id) {
        return service.getAnnouncementById(id);
    }

    /*@PostMapping
    public AnnonceAirbnb createAnnouncement(@RequestBody AnnonceAirbnb announcement) {
        return service.createAnnouncement(announcement);
    }*/

    @PostMapping
    public ResponseEntity<String> createAnnonce(
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam("prix") float prix,
            @RequestParam("adresse") String adresse,
            @RequestParam("nbr_chambres") int nbrChambres,
            @RequestParam("type") TypeLocale type
    ) {
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
            AnnonceAirbnb annonce = new AnnonceAirbnb();
            annonce.setImage(imageName);
            annonce.setTitre(titre);
            annonce.setDescription(description);
            annonce.setPrix(prix);
            annonce.setAdresse(adresse);
            annonce.setNbr_chambres(nbrChambres);
            annonce.setType(type);
            service.createAnnouncement(annonce);

        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload the image", HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public AnnonceAirbnb updateAnnouncement(@PathVariable Long id, @RequestBody AnnonceAirbnb updatedAnnouncement) {
        return service.updateAnnouncement(id, updatedAnnouncement);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnouncement(@PathVariable Long id) {
        service.deleteAnnouncement(id);
    }


    @GetMapping("/count")
    public long count() {
        return service.getAnnCount();
    }
}
