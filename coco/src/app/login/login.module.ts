import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreferancesComponent } from './component/preferances/preferances.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UpdateComponent } from './component/update/update.component';
import { SetPasswordComponent } from './component/set-password/set-password.component';




@NgModule({
  declarations: [
    LoginComponent,
    PreferancesComponent,
    ProfileComponent,
    UpdateComponent,
    
    SetPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  exports:[
    LoginComponent,
    PreferancesComponent,
    ProfileComponent,
    UpdateComponent,
    SetPasswordComponent
  ]
})
export class LoginModule { }
