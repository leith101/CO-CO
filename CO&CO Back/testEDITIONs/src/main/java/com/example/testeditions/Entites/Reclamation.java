package com.example.testeditions.Entites;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reclamation {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id_reclamation;

    private String categorie_reclamation;
    private String objet_reclamation;
    private String description_reclamation;
    private int etat_reclamation;
    private Date date_reclamation;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Reponse> Reponses;
    @ManyToOne
    User user;
}
