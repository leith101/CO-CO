package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationCovRepository extends JpaRepository<ReservationCov,Long> {

    List<ReservationCov> findByUser(User user);

    List<ReservationCov> findByAnnonceCov(AnnonceCov annonceCov);

    List<ReservationCov> findByAnnonceCov_Ida(Long ida);
    Optional<ReservationCov> findByIdr(Long idr);


    ReservationCov findByUserIdAndIdr(Long userId, Long idr);
}
