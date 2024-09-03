package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Reclamation;
import com.example.testeditions.Services.ReclamationService;
import com.example.testeditions.Services.UserImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ReclamationController {
    @Autowired
    ReclamationService reclamationService;
    @Autowired
    private UserImpl userService;


    @PostMapping(path = "/reclamation/save")
    public Reclamation save(@RequestBody Reclamation reclamation) {
        return reclamationService.save(reclamation);
    }

    @DeleteMapping(path = "/reclamation/delete/{id}")
    public void delete(@PathVariable Integer id) {
        reclamationService.delete(id);
    }

    @PutMapping(path = "/reclamation/update")
    public Reclamation update(@RequestBody Reclamation reclamation) {
        return reclamationService.update(reclamation);
    }

    @GetMapping(path = "/reclamation/getReclamation")
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    @GetMapping(path = "/reclamation/{id}")
    public Reclamation getReclamationById(@PathVariable int id) {
        return reclamationService.getReclamationById(id);
    }
    @PutMapping(path = "/reclamation/{reclamationId}/update")
    public Reclamation updateReclamationState(@PathVariable int reclamationId){
        return reclamationService.updateReclamationState(reclamationId);
    }

    @PostMapping("/reclamations/add/{userId}")
    public Reclamation addReclamationAndAssignToUser(@RequestBody Reclamation reclamation, @PathVariable Long userId) {
        return reclamationService.addReclamationAndAssignToUser(reclamation, userId);
    }
    @GetMapping("/reclamation/getByUserId/{userId}")
    public List<Reclamation> getReclamationsByUserId(@PathVariable Long userId) {
        return reclamationService.getReclamationsByUserId(userId);
    }


}
