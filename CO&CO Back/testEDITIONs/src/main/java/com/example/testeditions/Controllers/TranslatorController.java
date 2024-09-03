package com.example.testeditions.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;

@RestController
public class TranslatorController {
    private final String apiUrl = "https://microsoft-translator-text.p.rapidapi.com/translate";
    private final String rapidApiKey = "9fc36be6d8mshd02780ac06d9848p1a7bd4jsnfe8ffd3a56b2";

    @PostMapping("/translate")
    public ResponseEntity<String> translateText(@RequestBody String text) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-RapidAPI-Key", rapidApiKey);
        headers.set("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");

        String requestBody = "[{\"Text\":\"" + text + "\"}]";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(apiUrl, requestEntity, String.class);

        return responseEntity;
    }
}
