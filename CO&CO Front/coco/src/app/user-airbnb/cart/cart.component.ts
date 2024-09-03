import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;
  prixTotal: number = 0;
  constructor(private router : Router){}
  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
      this.updateCartItems();
    }
  }

  private updateCartItems(): void {
    const itemMap = new Map<string, any>();
    console.log(itemMap)
    this.prixTotal = 0; // Reset prixTotal before recalculating

    // Iterate through cart items to update prixTotal and handle duplicates
    this.cart.forEach((item) => {
      const itemId = item.id; // Assuming each item has a unique identifier 'id'
      
      if (!itemMap.has(itemId)) {
        
        itemMap.set(itemId, { ...item, quantity: 1 }); // Add 'quantity' attribute
        
      } else {
        const existingItem = itemMap.get(itemId);
        existingItem.quantity++; // Increment quantity for duplicate item

      }
            
    });

    this.cart.forEach((item) => {
      this.prixTotal += item.prix*item.quantity;        
        this.total+=item.quantity;
    });    
   
    

    
  }

  plus(item: any): void {
    const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity++; // Increment quantity      
      this.saveCartToLocalStorage(); // Save updated cart to localStorage
    }
  }

  minus(item: any): void {
    const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--; 
      
      this.saveCartToLocalStorage(); 
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();
  }
  delete(item: any): void {
    const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1); // Remove item from cart array
      this.saveCartToLocalStorage(); // Save updated cart to localStorage
    }
  }

  goTOPayement(){
    if(this.total>0){
    this.router.navigate(['/paiement']);
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Warning',
      text: 'Cart is empty.'
    });

  }
  }

}
