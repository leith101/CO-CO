import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();

    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
    }
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }

  getAsc(): void {
    this.productService.getAsc()
      .subscribe(products => this.products = products);
  }

  addCartItem(item: any): void {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If item already exists in cart, increment its quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // If item is not already in cart, add it with a quantity of 1
      item.quantity = 1;
      this.cart.push(item);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // Reload the page or update the component state as needed
    // For demonstration, we'll reload the page using window.location.reload()
    window.location.reload();
  }
}
