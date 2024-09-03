package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.LikeDislike;
import com.example.testeditions.Entites.MatchStatus;
import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeDislikeRepository extends JpaRepository<LikeDislike,Long> {
    LikeDislike findByProfilAndUser(Profil profil, User user);
    @Query("SELECT ld FROM LikeDislike ld WHERE ld.user.id = :userId AND ld.profil.id = :profilId")
    LikeDislike findByUserIdAndProfilId(Long userId, Long profilId);
    boolean existsByUserIdAndProfilId(Long userId, Long profilId);
    long countByMatchStatus(MatchStatus matchStatus);
}
