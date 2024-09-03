package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.TypeLocal;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnnonceColocationRepository extends JpaRepository<AnnonceColocation,Long> {

    List<AnnonceColocation> findByTitreContainingIgnoreCase(String query);

    List<AnnonceColocation> findByType(TypeLocal type);

    List<AnnonceColocation> findByUser_Id(Long userId);
    List<AnnonceColocation> findByUser(User user);

    AnnonceColocation findAnnonceColocationByReservationColocsId(Long reservationid);
}
