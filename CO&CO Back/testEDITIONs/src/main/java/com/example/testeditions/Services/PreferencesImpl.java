package com.example.testeditions.Services;

import com.example.testeditions.Entites.Preferences;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.PreferencesRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class PreferencesImpl implements PreferencesService{

    @Autowired
    PreferencesRepository preferencesRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public List<Preferences> getUserPreferences(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return (user != null) ? user.getPreferences() : Collections.emptyList();    }

    @Override
    public Preferences savePreferences(Preferences preferences) {
        return preferencesRepository.save(preferences);
    }
}
