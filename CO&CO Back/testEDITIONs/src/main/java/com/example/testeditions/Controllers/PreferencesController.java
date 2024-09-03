package com.example.testeditions.Controllers;


import com.example.testeditions.DTO.UserDTO;
import com.example.testeditions.Entites.Preferences;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Services.PreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PreferencesController {

    @Autowired
    PreferencesService preferencesService;

    @GetMapping("/getPreferences/{userId}")
    public ResponseEntity<List<Preferences>> getPreferences(@PathVariable Long userId) {
        List<Preferences> preferences = preferencesService.getUserPreferences(userId);
        return ResponseEntity.ok(preferences);
    }

    @PostMapping(path = "preferance/save")
    public Preferences saveEmployee(@RequestBody Preferences preference)
    {
        return preferencesService.savePreferences(preference);
    }


}
