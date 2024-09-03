package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
