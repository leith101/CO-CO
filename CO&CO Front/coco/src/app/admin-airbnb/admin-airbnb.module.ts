import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AdminRoutingModule } from './admin-routing.module';

import { AccueilComponent } from './accueil/accueil.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
  
    AccueilComponent,
    ProductsComponent,
    OrdersComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,

    
  ]
})
export class AdminAirbnbModule { }
