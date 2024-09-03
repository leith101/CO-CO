package com.example.testeditions.Entites;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AnnonceAirbnb  implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "date_annonce")
    private Date date_annonce;
    private String image;
    private float prix;
    private int llike;
    private String adresse;
    private int nbr_chambres;
    @Enumerated(EnumType.STRING)
    private TypeLocale Type;

    @OneToMany(mappedBy = "annonceAirbnb", cascade = CascadeType.ALL )
    @JsonIgnore
    private List<ReservationAirbnb> reservationAirbnbs;


}
