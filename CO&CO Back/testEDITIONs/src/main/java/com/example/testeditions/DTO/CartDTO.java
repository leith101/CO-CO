package com.example.testeditions.DTO;

import lombok.Getter;

@Getter
public class CartDTO {

    private Long id;
    private Integer prix;
    private String description;
    private String nom;
    private String image;
    private int quantity;
}