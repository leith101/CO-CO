package com.example.testeditions.Services;



import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface IProfileService {
    public Profil createProfile(Profil profile, Long userId);
    Profil getProfileById(Long profileId);
    List<Profil> getAllProfiles();
    void deleteProfile(Long profileId);
    public List<Map<String, String>> getProfilesWithUserNames();
}

