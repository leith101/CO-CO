package com.example.testeditions.Services;

import com.example.testeditions.Entites.Cart;
import com.example.testeditions.Repositories.CartRepository;
import com.example.testeditions.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> getCartItemById(Long id) {
        return cartRepository.findById(id);
    }

    @Override
    public Cart createCartItem(Cart cartItem) {
        cartItem.setProduct(productRepository.findById(cartItem.getProduct().getId()).orElse(null));
        return cartRepository.save(cartItem);
    }

    @Override
    public Cart updateCartItem(Long id, Cart updatedCartItem) {
        Optional<Cart> optionalCartItem = cartRepository.findById(id);
        if (optionalCartItem.isPresent()) {
            updatedCartItem.setId(id);
            return cartRepository.save(updatedCartItem);
        }
        return null; // Or throw an exception indicating the cart item was not found
    }

    @Override
    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }


}