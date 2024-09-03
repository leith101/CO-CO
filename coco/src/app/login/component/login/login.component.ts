import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {  OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  

})
export class LoginComponent implements OnInit  {

  
  
 
 @Input() password: string= '';
  
  nom: string ="";
  email: string ="";
  passwordStrength: string = '';
  strengthWidth: string = '0%';
  strengthText: string = '';
  strengthColor: string = ''; // Add this line

  currentUser: any;


  
  constructor(private http: HttpClient ,private router: Router,private service: ServiceService , private route: ActivatedRoute,private oAuthService: OAuthService )
  {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.verifyUser(token);
      }
    });

   
    
  }
  
  
 
 

  verifyUser(token: string): void {
    this.service.verifyUser(token).subscribe(
      response => {
        // Gérer la réponse réussie (par exemple, afficher un message de confirmation)
        console.log(response);
      },
      error => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
        console.error(error);
      }
    );
  }

  ngOnInit(): void {

    
    
  }

  loginWithGmail(): void {
    this.service.initiateGmailLogin();
  }


  login() {
    let bodyData = {
      email: this.email,
      password: this.password,
    };
  
    this.service.loginUser(bodyData).subscribe(
      (user: any) => {
        // Handle successful login
        console.log('Logged-in User Details:', user);
        this.service.setLoggedInUser(user);
  
         // Vérifier si l'email est égal à "rawef31@gmail.com"
      if (this.email === 'rawef31@gmail.com') {
        // Rediriger vers la page /dashboard
        this.router.navigateByUrl('/back');
      } 
      else if (this.email === 'yassine@gmail.com'){
        this.router.navigateByUrl('/backk');

       }else {
        // Rediriger vers la page /preferences pour les autres utilisateurs
        this.router.navigateByUrl('/preferances');
      }
      },
      (error) => {
        // Handle errors here
        if (error.status === 404) {
          alert("Email does not exist");
        } else if (error.status === 403) {
          alert("You are banned. Please contact support for assistance.");
        } else {
          alert("Incorrect email or password.");
        }
      }
    );
  }



  

  save() {
    // Vérifier si le mot de passe est assez fort avant de procéder à l'inscription
    if (this.isPasswordStrong()) {
      let bodyData = {
        "nom": this.nom,
        "email": this.email,
        "password": this.password
      };
  
      // Effectuer la requête HTTP pour l'inscription
      this.http.post("http://localhost:8089/save", bodyData, { responseType: 'text' }).subscribe(
        (resultData: any) => {
          console.log(resultData);
          Swal.fire({
            title: "Welcome !",
            text: "Vous avez cliqué sur le bouton !",
            icon: "success"
          });
        },
        (error) => {
          console.error("Erreur lors de l'inscription :", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      );
    } else {
      alert("Le mot de passe n'est pas assez fort. Veuillez choisir un mot de passe plus fort.");
    }
  }

  isPasswordStrong(): boolean {
    // Add your password strength criteria here
    // For example, you can check if the meter status is "strong"
    return document.getElementById('meter-status')?.innerText === 'strong';
  }


  checkStrength(password: string) {
    let meterBar = $("#meter").find("#meter-bar");
    let meterStatus = $("#meter-text").find("#meter-status");
    let strength = 0;

    if (password.length < 5) {
      meterBar.css({
        "background": "#6B778D",
        "width": "10%"
      });
      meterStatus.css("color", "#6B778D");
      meterStatus.text("too short");
    }
    if (password.length > 5) strength += 1;
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

    if (strength < 2) {
      meterBar.css({
        "background": "#ff0000",
        "width": "25%"
      });
      meterStatus.css("color", "#ff0000");
      meterStatus.text("weak");
    } else if (strength == 2) {
      meterBar.css({
        "background": "#00BCD4",
        "width": "75%"
      });
      meterStatus.css("color", "#00BCD4");
      meterStatus.text("good");
    } else {
      meterBar.css({
        "background": "#4CAF50",
        "width": "100%"
      });
      meterStatus.css("color", "#4CAF50");
      meterStatus.text("strong");
    }
  
  

}


}
