import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AjoutService } from './../../service/ajout.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js/auto';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MailgunService } from './../../service/mailservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-afficher',
  templateUrl: './afficher.component.html',
  styleUrls: ['./afficher.component.css']
})
export class AfficherComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('reponseForm') reponseForm: ElementRef | undefined;
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

  selectReclamationAndScroll(id: number): void {
    this.selectedReclamationId = id;
    this.showReponseForm = true;

    if (this.reponseForm) {
      this.reponseForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  generatePDF(): void {
    const doc = new jsPDF();
  
    // Définir les marges et la largeur/hauteur de la page
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width - 2 * margin;
    const pageHeight = doc.internal.pageSize.height - 2 * margin;
  
    // Encadrer toute la page avec une bordure grise
    doc.setDrawColor(169, 169, 169); // Couleur de la bordure grise
    doc.rect(margin, margin, pageWidth, pageHeight); // Dessiner le cadre autour de la page
  
    // Titre stylisé avec une couleur vive
    doc.setFillColor(33, 150, 243); // Couleur vive (bleu)
    doc.rect(margin, margin, pageWidth, 30, 'F'); // Rectangle pour le titre
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255); // Texte en blanc
    doc.setFont('helvetica', 'bold');
    doc.text('Liste des réclamations', margin + pageWidth / 2, margin + 15, { align: 'center' });
  
    // Calculer le pourcentage de réclamations traitées par rapport au nombre de réclamations affichées dans le PDF
    const totalReclamations = this.reclamations.length;
    const reclamationsTraitees = this.reclamations.filter(reclamation => reclamation.etat_reclamation === 1).length;
    const pourcentageTraitement = (reclamationsTraitees / totalReclamations) * 100;
  
    // Mettre à jour la barre de progression interactive
    const barWidth = pageWidth - 2 * margin; // Largeur de la barre de progression
    const progressWidth = (pourcentageTraitement / 100) * barWidth; // Largeur de la partie de progression
    const barHeight = 10; // Hauteur de la barre de progression
    const startX = margin; // Position horizontale de départ de la barre de progression
    const startY = margin + 30; // Position verticale de départ de la barre de progression
    doc.setDrawColor(0); // Couleur des bordures de la barre de progression (noir)
    doc.setFillColor(211, 211, 211); // Couleur de remplissage de la barre de progression (gris clair)
    doc.rect(startX, startY, barWidth, barHeight, 'F'); // Dessiner la barre de progression
    doc.setFillColor(255, 0, 0); // Couleur de remplissage pour la partie de progression (rouge)
    doc.rect(startX, startY, progressWidth, barHeight, 'F'); // Dessiner la partie de progression
    doc.setTextColor(0, 0, 0); // Texte en noir
    doc.setFontSize(10);
    doc.text(`Progression: ${pourcentageTraitement.toFixed(2)}%`, startX, startY + barHeight + 5, { align: 'left' });
  
    // Définir la position verticale de départ du tableau
    let tableStartY = startY + barHeight + 20;
  
    // Définition des en-têtes de tableau avec une police différente et une couleur vive
    const headers = [['Catégorie', 'Objet', 'Description', 'Date de réclamation', 'État']];
  
    // Dessiner le tableau avec des bordures et un arrière-plan léger
    (doc as any).autoTable({
      head: headers,
      body: this.reclamations.map(reclamation => [
        reclamation.categorie_reclamation,
        reclamation.objet_reclamation,
        reclamation.description_reclamation,
        reclamation.date_reclamation,
        reclamation.etat_reclamation === 1 ? 'Résolu' : 'En attente'
      ]),
      startY: tableStartY, // Décalage en raison du titre et des éléments interactifs précédents
      theme: 'grid', // Utiliser un thème avec des bordures pour un look plus net
      styles: {
        fontSize: 12,
        cellPadding: 4,
        lineColor: [0, 0, 0],
        textColor: [33, 33, 33], // Couleur de texte sombre
        fontStyle: 'normal'
      },
      columnStyles: {
        0: { cellWidth: pageWidth * 0.15 }, // Largeur de la colonne Catégorie
        1: { cellWidth: pageWidth * 0.15 }, // Largeur de la colonne Objet
        2: { cellWidth: pageWidth * 0.3 }, // Largeur de la colonne Description
        3: { cellWidth: pageWidth * 0.15 }, // Largeur de la colonne Date de réclamation
        4: { cellWidth: pageWidth * 0.1 }  // Largeur de la colonne État
      },
      alternateRowStyles: { fillColor: [245, 245, 245] } // Couleur de fond légère pour les lignes alternatives
    });
  
    // Enregistrement du PDF
    doc.save('liste_reclamations.pdf');
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
  this.service.afficherreclamation()
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
  submitReponse() {
    if (this.selectedReclamationId && this.description_reponse) {
      const reponseData = {
        id_reclamation: this.selectedReclamationId,
        description_reponse: this.description_reponse
      };
  
      // Ajouter la réponse à la réclamation
      this.service.saveReponseAndAssociateToReclamation(
        this.selectedReclamationId,
        this.description_reponse
      ).subscribe(response => {
        console.log('Réponse ajoutée avec succès:', response);
  
        // Envoyer l'e-mail de notification
        const emailData = {
          from: 'minouunsir@gmail.com', // Adresse e-mail de l'expéditeur
          to: 'mohamedamine.nsir@esprit.tn', // Adresse e-mail du destinataire
          subject: 'Nouvelle réponse ajoutée à la réclamation',
          body: `Une nouvelle réponse a été ajoutée à votre réclamation.`
        };
  
        this.mailgunService.sendEmail(emailData)
          .subscribe(() => {
            console.log('E-mail envoyé avec succès');
          }, error => {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
            // Gérer l'erreur ici (afficher un message d'erreur, etc.)
          });
  
        // Réinitialiser la description de la réponse et masquer le formulaire
        this.description_reponse = '';
        this.showReponseForm = false;
  
        // Actualiser la liste des réclamations
        this.getReclamations();
        this.generateChart();
        
  
        // Mettre à jour l'état de la réclamation à 1
        if (this.selectedReclamationId !== null) {
          this.service.updateReclamationState(this.selectedReclamationId)
            .subscribe(() => {
              console.log('État de la réclamation mis à jour avec succès');
              this.getReclamations();
            }, error => {
              console.error('Erreur lors de la mise à jour de l\'état de la réclamation:', error);
              // Gérer l'erreur ici (afficher un message d'erreur, etc.)
            });
            
        }
        
  
        // Réinitialiser l'ID de la réclamation sélectionnée
        this.selectedReclamationId = null;
      }, error => {
        console.error('Erreur lors de l\'ajout de la réponse:', error);
        // Gérer l'erreur ici (afficher un message d'erreur, etc.)
      });
      
    }
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
