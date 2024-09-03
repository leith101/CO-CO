package com.example.testeditions.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LikeDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private Date timestamp;
    private MatchStatus matchStatus; // Vous pouvez utiliser une énumération pour définir le type de like/dislike
    @ManyToOne
    private User user;
    @JsonIgnore
    @ManyToOne
    private Profil profil;
    // Getters and setters
}