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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaiement;

    private double montant;

    private Date datePaiement;

    private String methodePaiement;
    @ManyToOne
    Subscription subscription;


    @OneToMany(cascade = CascadeType.ALL)
    private List<Transaction> Transactions;
}