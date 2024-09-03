package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.AnnonceColocation;
import com.example.testeditions.Entites.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository  extends JpaRepository<Contract,Long> {
}
