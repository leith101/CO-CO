import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../login/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  loggedInUser: any;

  constructor(private service:ServiceService){

  }

  
  ngOnInit(): void {
    // Abonnez-vous aux changements de l'utilisateur connecté
    this.service.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }

}
