package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Reclamation;
import com.example.testeditions.Entites.Reponse;
import com.example.testeditions.Services.ReclamationService;
import com.example.testeditions.Services.ReponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ReponseController {
    @Autowired
    ReponseService reponseService;
    @Autowired
    ReclamationService reclamationService;
    @PostMapping(path = "/reponse/save")
    public Reponse save(@RequestBody Reponse reponse) {
        return reponseService.save(reponse);
    }
    @PostMapping(path = "/reclamation/{idReclamation}/reponse/save")
    public Reponse saveReponseAndAssociateToReclamation(@PathVariable int idReclamation, @RequestBody Reponse reponse) {
        return reponseService.saveReponseAndAssociateToReclamation(reponse, idReclamation);
    }

}
