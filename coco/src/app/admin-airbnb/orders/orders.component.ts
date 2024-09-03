import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service.js';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: any[]) => {
        this.orders = data;
      },
      (error: any) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }

  calculateTotalPrice(commande:any){
    var prixTotal =0;
    commande.items.forEach((item :any) => {
      prixTotal += item.product.prix*item.quantity;        
    });   

    return prixTotal;
    

  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe(
      () => {
this.loadOrders();
      },
      (error: any) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }

}
