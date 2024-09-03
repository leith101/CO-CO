package com.example.testeditions.Services;

import com.example.testeditions.Entites.Cart;

import java.util.List;
import java.util.Optional;

public interface CartService {

    List<Cart> getAllCartItems();

    Optional<Cart> getCartItemById(Long id);

    Cart createCartItem(Cart cartItem);

    Cart updateCartItem(Long id, Cart cartItem);

    void deleteCartItem(Long id);


}
