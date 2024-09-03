package com.example.testeditions.Services;


import com.example.testeditions.Entites.Matchs;

import java.util.List;

public interface ImatchService {

    List<Matchs> getAllMatches();

    Matchs getMatchById(Long id);

    Matchs saveMatch(Matchs match);

    void deleteMatch(Long id);
}
