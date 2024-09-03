import { Component } from '@angular/core';
import { AnnonceColocService } from '../annonce-coloc.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../login/services/service.service';


@Component({
  selector: 'app-create-annonce-coloc',
  templateUrl: './create-annonce-coloc.component.html',
  styleUrls: ['./create-annonce-coloc.component.css']
})
export class CreateAnnonceColocComponent {
  annonceColoc: any = {}; // Utilisation d'un objet JavaScript pour représenter les données de l'annonce
  // Initialisez les préférences ici
  prefBinome: any = {}; // Initialisez la variable prefBinome comme un objet vide


  constructor(private annonceColocService: AnnonceColocService, private router: Router, private authService: ServiceService) {}

  
  onSubmit() {
    // Obtenez l'ID de l'utilisateur connecté
    const userId = this.authService.getLoggedInUserId();

    // Assurez-vous que l'ID de l'utilisateur est disponible
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    // Ajoutez l'ID de l'utilisateur à l'annonce
    this.annonceColoc.user = userId;

    // Appelez le service pour ajouter l'annonce
    this.annonceColocService.createAnnonce(this.annonceColoc, userId).subscribe(() => {
      // Réinitialisez l'objet annonceColoc pour effacer le formulaire après la soumission
      this.annonceColoc = {};

      // Redirigez vers la route de mise à jour avec l'ID de la nouvelle annonce ajoutée
      this.router.navigate(['/annoncesColoc']);
    });
  }
}
