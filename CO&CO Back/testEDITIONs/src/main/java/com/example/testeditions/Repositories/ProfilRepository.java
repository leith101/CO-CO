package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Profil;
import com.example.testeditions.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfilRepository extends JpaRepository<Profil,Long> {

    Profil findByUser(User user);


}
