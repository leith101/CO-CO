import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/component/home/home.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    HeaderAdminComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    
    

  ],
  exports:[
    HeaderComponent,
    HeaderAdminComponent,
    SpinnerComponent
    
  ]
})
export class SharedModule { }
