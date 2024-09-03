package com.example.testeditions.Services;

import com.example.testeditions.DTO.CartDTO;
import com.example.testeditions.DTO.OrderDTO;
import com.example.testeditions.Entites.Cart;
import com.example.testeditions.Entites.Order;
import com.example.testeditions.Entites.Product;
import com.example.testeditions.Repositories.CartRepository;
import com.example.testeditions.Repositories.OrderRepository;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartServiceImpl cartRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Order createOrder(OrderDTO order) {
        Order o = new Order();
        List<Cart> items= new ArrayList<>();
        for (CartDTO cart : order.getItems()){
            Cart c2 = new Cart();
            Product p = new Product();
            p.setId(cart.getId());
            c2.setProduct(p);
            c2.setQuantity(cart.getQuantity());
            Cart c1 = cartRepository.createCartItem(c2);
            items.add(c1);
        }
        o.setItems(items);
        o.setAdress(order.getAdress());
        o.setPhone(order.getPhone());
        o.setFullName(order.getFullName());

        return orderRepository.save(o);
    }

    @Override
    public Order updateOrder(Long id, Order updatedOrder) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            updatedOrder.setId(id);
            return orderRepository.save(updatedOrder);
        }
        return null; // Or throw an exception indicating the order was not found
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public long count(){
        return orderRepository.count();
    }
}