import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AjoutService } from './../../service/ajout.service';
import { Chart, registerables } from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MailgunService } from './../../service/mailservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('reponseForm') reponseForm: ElementRef | undefined;
  userId = 6;
  reclamations: any[] = [];
  reponse: any[] = [];
  selectedReclamationId: number | null = null;
  description_reponse: string = '';
  showReponseForm: boolean = false;
  chart: Chart<'pie', number[], string> | null = null; // Spécifier le type de la charte

  // Filtres
  dateSortOrder: string = 'asc';
  filterState: string = '';
  filterCategory: string = '';
  categories: string[] = [];
  searchTerm: string = ''; 
  status: boolean = false;
  reclamationsResolues: number = 0;
  reclamationsEnAttente: number = 0;
  originalReclamations: any[] = [];
  chartSubscription: Subscription | undefined;

  constructor(private service: AjoutService, private mailgunService: MailgunService) { }

  ngOnInit(): void {
    this.getReclamations();
  }

  
  modifierReclamation(): void {
    // Construisez l'objet de réclamation modifiée avec les données du formulaire
    const reclamationModifiee = {
      id: this.selectedReclamationId,
      description_reponse: this.description_reponse, // Exemple de champ à modifier, ajoutez d'autres champs si nécessaire
      // Ajoutez d'autres champs de réclamation à modifier
    };
  
    // Appelez la fonction de modification de réclamation du service
    this.service.modifreclamation(reclamationModifiee)
      .subscribe(
        () => {
          console.log('Réclamation modifiée avec succès.');
          this.getReclamations(); // Actualisez la liste des réclamations après la modification
          this.cancelReponse(); // Cachez le formulaire de modification après la soumission
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la modification de la réclamation :', error);
          // Gérer les erreurs selon vos besoins
        }
      );
  }
  
onPageChange(event: PageEvent): void {
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if (endIndex > this.originalReclamations.length) {
    endIndex = this.originalReclamations.length;
  }
  this.reclamations = this.originalReclamations.slice(startIndex, endIndex);
}

getReclamations(): void {
  this.service.afficherreclamationbyuser(this.userId)
    .subscribe((reclamations: any[]) => {
      this.reclamations = reclamations;
      this.originalReclamations = reclamations; // Stocker les réclamations originales
      this.categories = Array.from(new Set(reclamations.map(reclamation => reclamation.categorie_reclamation)));
      this.sortReclamations(); // Appliquer le tri initial
      this.generateChart(); // Appeler generateChart après la récupération des réclamations
    });
}

  selectReclamation(id: number): void {
    this.selectedReclamationId = id;
    this.showReponseForm = true; // Afficher le formulaire de réponse
  }
  

  supprimerReclamation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation?')) {
      this.service.supprimerReclamation(id)
        .subscribe(() => {
          // Si la suppression réussit, actualiser la liste des réclamations après la suppression
          this.getReclamations();
        });
    }
  }
  cancelReponse(): void {
    this.showReponseForm = false;
}
performSearch(): void {
  // Filtrer les réclamations en fonction du terme de recherche
  if (this.searchTerm) {
    this.reclamations = this.originalReclamations.filter(reclamation => {
      // Filtrer par catégorie ou objet de réclamation
      return reclamation.categorie_reclamation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             reclamation.objet_reclamation.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  } else {
    // Si le champ de recherche est vide, afficher toutes les réclamations
    this.reclamations = this.originalReclamations;
  }
}
ngOnDestroy(): void {
  // Se désabonner de la souscription à la charte
  if (this.chartSubscription) {
    this.chartSubscription.unsubscribe();
  }
}

generateChart(): void {
  // Détruire la charte existante s'il y en a une
  if (this.chart) {
    this.chart.destroy();
  }

  // Compter le nombre de réclamations résolues et en attente
  const reclamationsResolues = this.reclamations.filter(reclamation => reclamation.etat_reclamation === 1).length;
  const reclamationsEnAttente = this.reclamations.filter(reclamation => reclamation.etat_reclamation === 0).length;

  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  ctx.width = 600; // Largeur du canevas
  ctx.height = 400; // Hauteur du canevas

  this.chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Resolved Complaints', 'Pending Complaints'],
      datasets: [{
        label: 'Nombre de réclamations',
        data: [reclamationsResolues, reclamationsEnAttente],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      layout: {
        padding: {
          left: 100,
          right: 100,
          top: 100,
          bottom: 100
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Distribution of complaints',
          padding: {
            top: 20,
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      responsive: false
    }
  });
}


  filterReclamations(): void {
    let filtered = this.originalReclamations; // Filtrer à partir des réclamations originales non filtrées

    if (this.filterState) {
      filtered = filtered.filter(reclamation => reclamation.etat_reclamation === parseInt(this.filterState));
    }

    if (this.filterCategory) {
      filtered = filtered.filter(reclamation => reclamation.categorie_reclamation === this.filterCategory);
    }

    this.reclamations = filtered;
  }

  // Fonction de tri
  sortReclamations(): void {
    if (this.dateSortOrder === 'asc') {
      this.reclamations.sort((a, b) => new Date(a.date_reclamation).getTime() - new Date(b.date_reclamation).getTime());
    } else if (this.dateSortOrder === 'desc') {
      this.reclamations.sort((a, b) => new Date(b.date_reclamation).getTime() - new Date(a.date_reclamation).getTime());
    }
  }
}

