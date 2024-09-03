package com.example.testeditions.Services;

import com.example.testeditions.Entites.Reponse;

public interface ReponseService {
    Reponse save(Reponse reponse);
    Reponse saveReponseAndAssociateToReclamation(Reponse reponse, int idReclamation);
}
