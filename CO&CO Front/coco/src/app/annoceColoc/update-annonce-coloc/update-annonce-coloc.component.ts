import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceColocService } from '../annonce-coloc.service';
//import Chart from 'chart.js/auto';

@Component({
  selector: 'app-update-annonce-coloc',
  templateUrl: './update-annonce-coloc.component.html',
  styleUrls: ['./update-annonce-coloc.component.css']
})
export class UpdateAnnonceColocComponent implements OnInit {
  annonceColoc: any = {}; // Initialisation de l'annonce à mettre à jour
  reservationPercentageMap: Map<number, number> = new Map<number, number>();

  constructor(
    private route: ActivatedRoute,
    private annonceColocService: AnnonceColocService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnnonceDetails();
    this.getReservationPercentageByAnnonce();
    //this.generateCharts();

  }

  getAnnonceDetails(): void {
    const id = +this.route.snapshot.params['id']; // Récupérer l'identifiant de l'annonce depuis les paramètres de l'URL
    this.annonceColocService.getAnnonceColocById(id)
      .subscribe(annonce => this.annonceColoc = annonce);
  }
 /* generateCharts(): void {
    this.reservationPercentageMap.forEach((value, key) => {
        console.log('Annonce:', key);
        console.log('Pourcentage de réservation:', value);

        const canvas = document.getElementById(`chart-${key}`) as HTMLCanvasElement;
        console.log('Canvas sélectionné:', canvas);

        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Réservé', 'Non réservé'],
                        datasets: [{
                            label: 'Pourcentage de réservation',
                            data: [value, 100 - value],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            } else {
                console.error('Contexte de rendu non disponible.');
            }
        } else {
            console.error('Canvas non trouvé.');
        }
    });
}*/

  getReservationPercentageByAnnonce(): void {
    this.annonceColocService.getReservationPercentageByAnnonce()
      .subscribe(data => this.reservationPercentageMap = data);
  }

  updateAnnonce(): void {
    if (this.annonceColoc.id) { // Vérifiez si l'identifiant de l'annonce est défini
      this.annonceColocService.updateAnnonce(this.annonceColoc.id, this.annonceColoc)
        .subscribe(() => {
          console.log('Annonce mise à jour avec succès !');
          this.router.navigate(['/annoncesColoc/mesannonces']); // Redirige vers la liste des annonces après la mise à jour
        });
    } else {
      console.error("Impossible de mettre à jour l'annonce car l'identifiant est indéfini.");
    }
  }

  deleteAnnonce(): void {
    if (this.annonceColoc.id) { // Vérifiez si l'identifiant de l'annonce est défini
      if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
        this.annonceColocService.deleteAnnonce(this.annonceColoc.id)
          .subscribe(() => {
            console.log('Annonce supprimée avec succès !');
            this.router.navigate(['/annoncesColoc/mesannonces']); // Redirige vers la liste des annonces après la suppression
          });
      }
    } else {
      console.error("Impossible de supprimer l'annonce car l'identifiant est indéfini.");
    }
  }
}
