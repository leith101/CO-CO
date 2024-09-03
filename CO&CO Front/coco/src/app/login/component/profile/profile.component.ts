import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  userId: string = ''; // Déclaration de la propriété userId ici


  loggedInUserPreferences: any;
  

  constructor(private router: Router,private service: ServiceService )
  {
  }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
      this.userId = user.id; // Supposons que l'ID de l'utilisateur soit dans la propriété 'id'

    });

    this.getUserPreferences();


  }

  getUserPreferences(): void {
    this.service.getUserPreferences().subscribe(
      (data: any) => {
        this.loggedInUserPreferences = data;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des préférences de l\'utilisateur : ', error);
      }
    );
  }

  updateProfile(userData: any): void {
    this.service.updateUser(userData).subscribe(
      (response) => {
        // Gérer la réponse de la mise à jour du profil ici
        console.log('Profil mis à jour avec succès : ', response);
        // Peut-être mettre à jour les détails du profil affichés sur la page
      },
      (error) => {
        // Gérer les erreurs de mise à jour du profil ici
        console.error('Erreur lors de la mise à jour du profil : ', error);
      }
    );
  }
  navigateToUpdate() {
    this.router.navigate(['/update']);
  }
  

}
