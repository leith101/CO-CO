import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';


const adminRoutes: Routes = [
 
  {path:'home', component: AccueilComponent},
  {path:'products', component: ProductsComponent},
  {path:'orders', component: OrdersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
