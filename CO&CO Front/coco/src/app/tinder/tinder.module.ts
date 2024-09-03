import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinderComponent } from './tinder/tinder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { style } from '@angular/animations';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CreateprofileComponent } from './createprofile/createprofile.component';
import { BackofficetinderComponent } from './backofficetinder/backofficetinder.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    TinderComponent,
    CreateprofileComponent,
    BackofficetinderComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HammerModule,
    IonicModule.forRoot(),
    RouterModule,
    NgxChartsModule

  ],
  exports: [TinderComponent,
  ] // Ajoutez cette ligne
})
export class TinderModule { }