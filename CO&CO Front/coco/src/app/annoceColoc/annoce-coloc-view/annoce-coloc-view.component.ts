import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importez Router ici
import { AnnonceColocService } from '../annonce-coloc.service'; // Importez votre service AnnonceColocService
import { RouterModule } from '@angular/router'; // Importez RouterModule

@Component({
  selector: 'app-annoce-coloc-view',
  templateUrl: './annoce-coloc-view.component.html',
  styleUrls: ['./annoce-coloc-view.component.css']
})
export class AnnoceColocViewComponent implements OnInit {
  annonceColoc: any | null = null;


  constructor(
    private route: ActivatedRoute,
    private annonceColocService: AnnonceColocService,
    private router: Router // Injectez le service Router

  ) { }

  ngOnInit(): void {
    this.getAnnonceDetails();
  }

  getAnnonceDetails(): void {
    const id = +this.route.snapshot.params['id']; // Récupérer l'identifiant de l'annonce depuis les paramètres de l'URL
    this.annonceColocService.getAnnonceColocById(id)
      .subscribe(annonce => this.annonceColoc = annonce);
  }
// Ajoutez cette méthode pour naviguer vers la réservation
navigateToReservation(): void {
  if (this.annonceColoc && this.annonceColoc.id) {
    this.router.navigate(['/annoncesColoc/view', this.annonceColoc.id, 'reservationColoc']);
  } else {
    console.error('L\'ID de l\'annonce est non valide ou manquant.');
  }
}
}
