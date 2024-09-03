package com.example.testeditions.Controllers;


import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.example.testeditions.DTO.LoginDTO;
import com.example.testeditions.DTO.UserDTO;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.UserRepository;
import com.example.testeditions.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;






    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }


    @PostMapping("/ban/temp")
    public ResponseEntity<String> banUserForOneMinute(@RequestParam("email") String email) {
        try {
            userService.banUserByEmailTemporarily(email);
            return ResponseEntity.ok("Utilisateur banni temporairement pendant une minute.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors du bannissement de l'utilisateur : " + e.getMessage());
        }
    }





    @PostMapping("add-preferences/{userId}")
    public User addPreferencesToUser(@PathVariable Long userId, @RequestBody List<String> selectedTypes) {
        return userService.addPreferencesToUser(userId, selectedTypes);

    }


    @PostMapping(path = "/save")
    public User saveEmployee(@RequestBody UserDTO userDTO) {
        // Save the user
        User savedUser = userService.save(userDTO);

        return savedUser;
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        userService.verifyUser(token);
        return ResponseEntity.ok("Votre adresse e-mail a été vérifiée avec succès.");
    }

    @GetMapping
    public Object sayHello(Authentication authentication) {
        return authentication.getPrincipal();
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUserrr(@RequestBody LoginDTO loginDTO) {
        UserDTO userDetailsDTO = userService.loginUser(loginDTO);
        if (userDetailsDTO != null) {
            return ResponseEntity.ok(userDetailsDTO);
        } else {
            // Check if the user is banned
            User user = userRepository.findByEmail(loginDTO.getEmail());
            if (user != null && user.isBanned()) {
                // Return 403 Forbidden status if the user is banned
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is banned");
            } else {
                // Return Unauthorized status for other login failures
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
            }
        }
    }


    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User userDTO) {
        User updatedUser = userService.update(userId, userDTO);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/listUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> findConnectedUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/ban")
    public ResponseEntity<?> banUserByEmaillll(@RequestParam("email") String email) {
        // Ban the user using the service method
        userService.banUserByEmail(email);

        // Return a JSON response
        return ResponseEntity.ok().body(Map.of("message", "L'utilisateur avec l'email " + email + " a été banni."));
    }


    @GetMapping("/banned/count")
    public long countBannedUsers() {
        return userService.countBannedUsers();
    }



    @GetMapping("/all")
    public long getAllUsers() {
        return userRepository.count();
    }


    @DeleteMapping("/deleteUser")
    public ResponseEntity<String> supprimerUtilisateurParEmail(@RequestParam("email") String email) {
        // Recherche de l'utilisateur dans la base de données
        User user = userRepository.findByEmail(email);

        if (user != null) {

            userRepository.delete(user);


            return ResponseEntity.ok("Utilisateur avec l'email " + email + " a été supprimé.");
        } else {

            return ResponseEntity.badRequest().body("Utilisateur avec l'email " + email + " n'existe pas.");
        }
    }

    @GetMapping("/utilisateurs-recents")
    public List<User> getUtilisateursRecents() {
        return userRepository.findFirst3ByOrderByDateInscriptionDesc();
    }


    @GetMapping("/export-users")
    public ResponseEntity<byte[]> exportUsersToExcel() throws IOException {
        List<User> utilisateurs = userRepository.findAll(); // Obtenez la liste des utilisateurs depuis votre service

        // Créez un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Utilisateurs");

        // En-têtes
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Nom");
        headerRow.createCell(2).setCellValue("Email");

        // Remplissez les données des utilisateurs
        int rowNum = 1;
        for (User utilisateur : utilisateurs) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(utilisateur.getId());
            row.createCell(1).setCellValue(utilisateur.getNom());
            row.createCell(2).setCellValue(utilisateur.getEmail());
        }

        // Convertissez le classeur en un tableau d'octets
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);

        // Préparez la réponse HTTP avec le contenu Excel
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "utilisateurs.xlsx");

        // Retournez la réponse avec le fichier Excel
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(outputStream.toByteArray());
    }







}
