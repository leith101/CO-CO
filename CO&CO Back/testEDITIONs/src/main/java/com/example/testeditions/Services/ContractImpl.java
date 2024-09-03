package com.example.testeditions.Services;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.Contract;
import com.example.testeditions.Entites.ReservationColoc;
import com.example.testeditions.Entites.User;
import com.example.testeditions.Repositories.AnnonceColocationRepository;
import com.example.testeditions.Repositories.ContractRepository;
import com.example.testeditions.Repositories.ReservationColocRepository;
import com.example.testeditions.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ContractImpl implements ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ReservationColocRepository reservationColocRepository;

    @Autowired
    private AnnonceColocationRepository annonceColocationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationColocService reservationColocService;

    @Autowired
    private AnnonceColocationService annonceColocationService;


    @Override
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    @Override
    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    @Override
    public Contract createContract(Contract contract , Long idreservation , Long idannonce , Long idUser) {
        ReservationColoc reser= reservationColocRepository.findById(idreservation).get();
        AnnonceColocation annonce = annonceColocationRepository.findById(idannonce).get();
        User user=userRepository.findById(idUser).get();
        Contract contractt =new Contract();
        contractt.getUsers().add(user);
        contractt.setReservationcoloc(reser);
        contractt.setAnnoncecolocation(annonce);
        return contractRepository.save(contractt);



    }

    @Override
    public Contract updateContract(Long id, Contract newContract) {
        Optional<Contract> existingContractOptional = contractRepository.findById(id);
        if (existingContractOptional.isPresent()) {
            Contract existingContract = existingContractOptional.get();
            existingContract.setContent(newContract.getContent());
            existingContract.setDate_contract(newContract.getDate_contract());
            existingContract.setDureeC(newContract.getDureeC());
            existingContract.setChoixC(newContract.getChoixC());
            // Mettez à jour d'autres champs selon vos besoins

            return contractRepository.save(existingContract);
        } else {
            // Gérer l'absence du contrat avec l'ID spécifié
            return null;
        }
    }


    @Override
    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }

    @Override
    public Contract affectContactToReservation(Long reservationid , Contract contract) {
        ReservationColoc reservationColoc=reservationColocRepository.findById(reservationid).get();
        contract.setReservationcoloc(reservationColoc);
        User user = reservationColoc.getUser();
        contract.setUsers(Collections.singletonList(user));
        Long idAnnonce= reservationColocService.getAnnonceIdFromReservation(reservationColoc.getId());
        AnnonceColocation annonce=annonceColocationRepository.findById(idAnnonce).get();
        contract.setAnnoncecolocation(annonce);

        return contractRepository.save(contract);
    }
}
