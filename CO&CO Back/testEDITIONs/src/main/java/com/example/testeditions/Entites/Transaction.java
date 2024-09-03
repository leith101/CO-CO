package com.example.testeditions.Entites;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTransaction;



    private double montant;

    private Date dateTransaction;

    private String statut;
    @ManyToOne(cascade = CascadeType.ALL)
    Facture facture;


}