package com.example.testeditions.Controllers;

import com.example.testeditions.Entites.Contract;
import com.example.testeditions.Services.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        Optional<Contract> contractOptional = contractService.getContractById(id);
        return contractOptional.map(contract -> ResponseEntity.ok().body(contract))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/AjouterContract/{reservationid}/{annonceid}/{userid}")
    public Contract createContract(@RequestBody Contract contract , @PathVariable Long reservationid ,@PathVariable Long annonceid,@PathVariable Long userid) {
        return contractService.createContract(contract,reservationid,annonceid,userid);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Long id, @RequestBody Contract newContract) {
        Contract updatedContract = contractService.updateContract(id, newContract);
        return updatedContract != null ? ResponseEntity.ok().body(updatedContract) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/affectcontract/{reservationid}")
    public Contract affecterContracttoreservation(@PathVariable Long reservationid,@RequestBody Contract contract){
        return contractService.affectContactToReservation(reservationid,contract);
    }
}
