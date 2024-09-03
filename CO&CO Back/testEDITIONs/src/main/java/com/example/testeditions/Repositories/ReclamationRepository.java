package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Preferences;
import com.example.testeditions.Entites.Reclamation;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.testeditions.Entites.Reponse;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
    @Query ("SELECT r FROM Reclamation r WHERE r.id_reclamation = ?1")
    Reclamation findReclamationById_reclamation(int id_reclamation);
    @Query("SELECT r FROM Reclamation r LEFT JOIN FETCH r.Reponses")
    List<Reclamation> findAllWithReponses();
    @Query("SELECT r FROM Reclamation r WHERE r.user.id = :userId")
    List<Reclamation> findByUserId(@Param("userId") Long userId);
}

