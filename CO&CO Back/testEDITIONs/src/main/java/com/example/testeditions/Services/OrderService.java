package com.example.testeditions.Services;

import com.example.testeditions.DTO.OrderDTO;
import com.example.testeditions.Entites.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<Order> getAllOrders();

    Optional<Order> getOrderById(Long id);

    Order createOrder(OrderDTO order);

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);

    long count();
}
