package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
