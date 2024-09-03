package com.example.testeditions.Services;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
@Service
public class PerspectiveAPIService {

    public String analyzeComment(String commentText) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("node", "perspectiveAnalyzer.js", commentText);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Erreur lors de l'exécution du script Node.js");
            }

            return result.toString();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}



