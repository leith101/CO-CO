    package com.example.testeditions.Controllers;

    import com.example.testeditions.Services.*;
    import com.google.maps.model.GeocodingResult;

    import com.example.testeditions.DTO.AnnonceCovRequestDto;
    import com.example.testeditions.DTO.StatisticDTO;
    import com.example.testeditions.Entites.AnnonceCov;
    import com.example.testeditions.Entites.User;
    import com.example.testeditions.Entites.Voiture;
    import com.example.testeditions.Repositories.UserRepository;
    import com.example.testeditions.Repositories.VoitureRepository;
    import com.google.maps.model.GeocodingResult;
    import jakarta.persistence.EntityNotFoundException;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.time.LocalDate;
    import java.util.List;
    import java.util.Map;
    import java.util.NoSuchElementException;
    import java.util.Optional;
    import com.twilio.Twilio;
    import com.twilio.rest.api.v2010.account.Message;
    import com.twilio.type.PhoneNumber;
    @RestController
    @RequestMapping("/annonces")
    public class AnnonceCovController {

        @Autowired
        private AnnonceCovService annonceCovService;
        @Autowired
        VoitureRepository voitureRepository;
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private AddressValidationService addressValidationService;

        @Autowired
        private GeocodingService geocodingService;
        @Autowired
        private UserService userService;

        @Autowired
        private VoitureService voitureService;




        @GetMapping("/retrieve-all-annonces")
        public ResponseEntity<List<AnnonceCov>> getAllAnnonces() {
            List<AnnonceCov> annonces = annonceCovService.getAllAnnonces();
            return new ResponseEntity<>(annonces, HttpStatus.OK);
        }

        @GetMapping("retrieve-annonce/{ida}")
        public ResponseEntity<AnnonceCov> getAnnonceById(@PathVariable("ida") Long ida) {
            AnnonceCov annonce = annonceCovService.getAnnonceById(ida);
            if (annonce != null) {
                return new ResponseEntity<>(annonce, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }



        @GetMapping("/user/{userId}")
        public List<AnnonceCov> getAnnonceByUser(@PathVariable Long userId) {
            User user = userService.getUserById(userId);
            return annonceCovService.getAnnonceByUser(user);
        }

        @PutMapping("update-annonce/{ida}")
        public ResponseEntity<AnnonceCov> updateAnnonce(@PathVariable("ida") Long ida, @RequestBody AnnonceCov updatedAnnonceCov) {
            AnnonceCov updatedAnnonce = annonceCovService.updateAnnonce(ida, updatedAnnonceCov);
            if (updatedAnnonce != null) {
                return new ResponseEntity<>(updatedAnnonce, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

       @DeleteMapping("remove-annonce/{ida}")
        public ResponseEntity<Void> deleteAnnonce(@PathVariable("ida") Long ida) {
            annonceCovService.deleteAnnonce(ida);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }




        @PostMapping("/add/{userId}/{matricule}")
        public ResponseEntity<?> addAnnonceCov(@PathVariable Long userId,
                                               @PathVariable String matricule,
                                               @RequestBody AnnonceCov annonceCov) {
            try {
                User user = userService.getUserById(userId);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }

                Voiture voiture = voitureService.getVoitureByUserAndMatricule(user, matricule);
                if (voiture == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Voiture not found or not owned by user");
                }

                // Validate pointDepart address
               // if (!addressValidationService.isValidAddress(annonceCov.getPointDepart())) {
               //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid pointDepart address");
               // }

                // Validate pointArrivee address
               // if (!addressValidationService.isValidAddress(annonceCov.getPointArrivee())) {
               //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid pointArrivee address");
               // }

                // Geocode pointDepart address
               /* GeocodingResult[] departResults = geocodingService.geocodeAddress(annonceCov.getPointDepart());
                if (departResults == null || departResults.length == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Geocoding failed for pointDepart");
                }
                annonceCov.setPointDepartLatitude(departResults[0].geometry.location.lat);
                annonceCov.setPointDepartLongitude(departResults[0].geometry.location.lng);

                // Geocode pointArrivee address
                GeocodingResult[] arriveeResults = geocodingService.geocodeAddress(annonceCov.getPointArrivee());
                if (arriveeResults == null || arriveeResults.length == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Geocoding failed for pointArrivee");
                }
                annonceCov.setPointArriveeLatitude(arriveeResults[0].geometry.location.lat);
                annonceCov.setPointArriveeLongitude(arriveeResults[0].geometry.location.lng);
                */
                // Add the annonceCov
                AnnonceCov addedAnnonceCov = annonceCovService.addAnnonceCov(userId, matricule, annonceCov);
                return ResponseEntity.status(HttpStatus.CREATED).body(addedAnnonceCov);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("An error occurred: " + e.getMessage());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }


        @DeleteMapping("/delete/{userId}/{ida}")
        public ResponseEntity<String> deleteAnnonceByUserIdAndIda(@PathVariable("userId") Long userId, @PathVariable("ida") Long ida) {
            try {

                annonceCovService.deleteAnnonceByUserIdAndIda(userId, ida);
                return ResponseEntity.ok("Announcement with ID " + ida + " deleted successfully.");
            } catch (EntityNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (IllegalStateException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the announcement.");
            }
        }


        @DeleteMapping("/deleteReservations/{ida}")
        public ResponseEntity<String> deleteOldReservations(@PathVariable("ida") Long ida) {
            try {
                boolean deleted = annonceCovService.deleteOldReservations(ida);
                if (deleted) {
                    return ResponseEntity.ok().body("Old reservations deleted successfully for annonce with ID " + ida + ". Deletion made.");
                } else {
                    return ResponseEntity.ok().body("No old reservations found for annonce with ID " + ida);
                }
            } catch (IllegalStateException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Cannot delete AnnonceCov because there are reservations made less than 48 hours ago for annonce with ID " + ida);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An error occurred while deleting old reservations for annonce with ID " + ida);
            }
        }






        @GetMapping("/updateAnnouncementStatus")
        public ResponseEntity<String> triggerAnnouncementStatusUpdate() {
            annonceCovService.updateAnnouncementStatus();
            return ResponseEntity.status(HttpStatus.OK).body("Announcement status updated.");
        }


        @GetMapping("/daily-stats")
        public Map<LocalDate, Long> getDailyAnnonceCounts() {
            return annonceCovService.getAnnonceCountsPerDay();
        }

        @GetMapping(value = "/count", produces = MediaType.APPLICATION_JSON_VALUE)
        public StatisticDTO getAnnonceStatusCounts() {
            long activeCount = annonceCovService.countByStatus("ACTIVE");
            long inactiveCount = annonceCovService.countByStatus("INACTIVE");
            return new StatisticDTO(activeCount, inactiveCount);
        }


        @GetMapping("/recent")
        public List<AnnonceCov> getRecentAnnonces() {
            return annonceCovService.getRecentAnnonces();
        }

    }




