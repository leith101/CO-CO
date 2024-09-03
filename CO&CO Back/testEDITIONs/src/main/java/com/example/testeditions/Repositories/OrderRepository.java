package com.example.testeditions.Repositories;

import com.example.testeditions.Entites.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
