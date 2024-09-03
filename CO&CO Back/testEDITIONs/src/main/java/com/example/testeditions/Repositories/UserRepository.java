package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);



    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.banned = false WHERE u.banned = true AND u.banExpiration <= current_timestamp")
    void updateBanStatusAfterOneMinute();

    User findByAnnonceColocationsId(Long annonceId);

    User findByReservationColocsId(Long reservationid);

    User findByNom(String username);


    Optional<User> findOneByEmail(String email);

    Optional<User> findByProfil(Profil profile);


    @Transactional
    Long deleteByNom(String username);

    long countByBannedTrue();

    long count();

    void deleteByEmail(String email);

    List<User> findFirst3ByOrderByDateInscriptionDesc();

    User findByVerificationToken(String token);


}
