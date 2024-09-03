package com.example.testeditions.Services;

import com.example.testeditions.Entites.Contract;

import java.util.List;
import java.util.Optional;

public interface ContractService {

    List<Contract> getAllContracts();

    Optional<Contract> getContractById(Long id);

    Contract createContract(Contract contract , Long idreservation , Long idannonce , Long idUser);

    Contract updateContract(Long id, Contract newContract);

    void deleteContract(Long id);

    Contract affectContactToReservation(Long reservationid, Contract contract);
}
