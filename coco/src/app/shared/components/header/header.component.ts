import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      const cartItems = JSON.parse(localStorage.getItem('cart')!) as any[];
      this.cartItems = this.calculateTotalQuantity(cartItems);
    }
  }

  private calculateTotalQuantity(cartItems: any[]): number {
    let totalQuantity = 0;

    // Iterate through cart items to calculate total quantity
    cartItems.forEach((item) => {
      // Check if item has a 'quantity' attribute; default to 1 if not present
      const quantity = item.quantity ? item.quantity : 1;
      totalQuantity += quantity;
    });

    return totalQuantity;
  }
}