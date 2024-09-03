package com.example.testeditions.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reponse {
    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private int id_reponse;

    private String description_reponse;
    private LocalDateTime date_reponse;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_reclamation")
    private Reclamation reclamation;
}
