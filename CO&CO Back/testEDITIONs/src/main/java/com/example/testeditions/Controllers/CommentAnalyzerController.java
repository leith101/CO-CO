package com.example.testeditions.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
public class CommentAnalyzerController {
    @PostMapping("/analyze-comment")
    public String analyzeComment(@RequestBody String commentText) {
        try {
            // Affiche le commentaire passé en argument à votre script Node.js
            System.out.println("Commentaire passé à Node.js : " + commentText);

            // Chemin vers votre script Node.js
            String nodeScriptPath = "C:\\Users\\med amine nsir\\OneDrive\\Bureau\\Pi\\Backend\\testEDITIONs\\src\\main\\resources\\static\\perspectiveAnalyzer.js";
            ProcessBuilder processBuilder = new ProcessBuilder("node", nodeScriptPath, commentText);

            // Démarrage du processus
            Process process = processBuilder.start();

            // Lecture de la sortie du processus
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            // Attendre la fin du processus
            int exitCode = process.waitFor();

            // Vérifier le code de sortie
            if (exitCode != 0) {
                throw new RuntimeException("Erreur lors de l'exécution du script Node.js");
            }

            return result.toString();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }}

