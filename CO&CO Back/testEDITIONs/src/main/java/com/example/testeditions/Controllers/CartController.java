package com.example.testeditions.Controllers;

import com.example.testeditions.DTO.CartDTO;
import com.example.testeditions.Entites.Cart;
import com.example.testeditions.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCartItems() {
        List<Cart> cartItems = cartService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartItemById(@PathVariable Long id) {
        Optional<Cart> cartItem = cartService.getCartItemById(id);
        return cartItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cart> createCartItem(@RequestBody Cart cartItem) {
        Cart createdCartItem = cartService.createCartItem(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCartItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long id, @RequestBody Cart cartItem) {
        Cart updatedCartItem = cartService.updateCartItem(id, cartItem);
        if (updatedCartItem != null) {
            return ResponseEntity.ok(updatedCartItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}