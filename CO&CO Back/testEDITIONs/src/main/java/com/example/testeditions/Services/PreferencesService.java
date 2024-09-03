package com.example.testeditions.Services;

import com.example.testeditions.Entites.Preferences;

import java.util.List;

public interface PreferencesService  {

    List<Preferences> getUserPreferences(Long userId);
    Preferences savePreferences(Preferences preferences);

}
