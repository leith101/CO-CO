package com.example.testeditions.Entites;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Profil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String description;
    private int age;
    private String localisation;
    private String preferencesRecherche;
    private String image;

    @ManyToOne
    private User user;



    // Getters and setters
}
