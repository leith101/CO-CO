package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.AnnonceCov;
import com.example.testeditions.Entites.Commentaire;
import com.example.testeditions.Entites.ReservationCov;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire,Long > {

    @Query("SELECT SUM(c.likes) FROM Commentaire c WHERE c.idco = :idco")
    int getLikesForComment(@Param("idco") Long idco);

    @Query("SELECT SUM(c.dislikes) FROM Commentaire c WHERE c.idco = :idco")
    int getDislikesForComment(@Param("idco") Long idco);
    List<Commentaire> findByUser(User user);
    void deleteByUserIdAndIdco(Long userId, Long idco);
    Commentaire findByUserIdAndIdco(Long userId, Long idco);
    List<Commentaire> findByAnnonceCov_Ida(Long annonceCovId);

    Optional<Commentaire> findByIdco(Long idco);


}
