package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Preferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferencesRepository extends JpaRepository<Preferences,Long> {
}
