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
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSubscription;

    private String type;

    private double prix;

    private Date dateDebut;

    private Date dateFin;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="subscription")
    private List<Payment> Payments;
    @ManyToOne
    User user;
}
