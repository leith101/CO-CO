package com.example.testeditions.DTO;


import com.example.testeditions.Entites.AnnonceCov;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnnonceCovRequestDto {

    private AnnonceCov annonceCov;
    private String matricule;
}
