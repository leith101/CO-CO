package com.example.testeditions.Entites;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Circuit implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idc")
    private Long idc;

    private String pointDepart;
    private String pointArrivee;
    private String pointStop;
    private float distance;

    @ManyToOne
    @JoinColumn(name = "annoncecov_id")
    private AnnonceCov annonceCov;

}
