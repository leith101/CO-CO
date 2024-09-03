import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  nbrAnnonce : number =0;
  nbrResv: number =0;
  nbrOrders: number =0;
  nbrProducts: number =0;

  constructor(private productService : ProductService, private orderService : OrderService){

  }
  ngOnInit()  {
    
    this.productService.count().subscribe(
      (resp) => {
        this.nbrProducts = resp;
      }
    );

    this.orderService.count().subscribe(
      (resp) => {
        this.nbrOrders = resp;
      }
    );
  }
}
