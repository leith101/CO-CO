import { Component, OnInit } from '@angular/core';
import { AnnonceColocService } from '../annonce-coloc.service';
import { ServiceService } from '../../login/services/service.service';

@Component({
  selector: 'app-annonce-coloc-list',
  templateUrl: './annonce-coloc-list.component.html',
  styleUrls: ['./annonce-coloc-list.component.css']
})
export class AnnonceColocListComponent implements OnInit {
  annonceColocs: any[] = []; // Assurez-vous que la propriété est correctement initialisée
  filteredAnnonceColocs: any[] = [];
  query: string = '';
  pagedAnnonces: any[] = [];
  currentPage = 1;
  itemsPerPage = 5; // Nombre d'annonces par page
  annonces: any[] = [];

  constructor(private annonceColocService: AnnonceColocService ,private authService: ServiceService) { 
   

  }

 /* ngOnInit(): void {
    this.annonceColocService.getAnnoncesTrieParVues().subscribe(
      (annonces) => {
        this.annonces = annonces;
      },
      (error) => {
        console.error('Erreur lors de la récupération des annonces triées par nombre de vues:', error);
      }
    );
  }*/

  ngOnInit(): void {
    // Appelez votre service d'authentification pour récupérer les informations de l'utilisateur connecté
    const user = this.authService.getLoggedInUserId();

    if (user) {
      // Si l'utilisateur est connecté, récupérez son ID
      const userId = user;

      // Appelez la méthode pour récupérer les annonces selon les préférences de l'utilisateur
      this.getAnnoncesSelonPreferences(userId);
    } else {
      console.error('Utilisateur non connecté');
      // Gérez le cas où l'utilisateur n'est pas connecté, par exemple, redirigez-le vers la page de connexion
    }
  }

  getAnnoncesSelonPreferences(userId: number): void {
    // Appelez le service pour récupérer les annonces selon les préférences de l'utilisateur
    this.annonceColocService.getAnnoncesSelonPreferences(userId).subscribe(
      (annonces) => {
        this.annonceColocs = annonces;
        this.filteredAnnonceColocs = annonces; // Initialisez également les annonces filtrées avec toutes les annonces
      },
      (error) => {
        console.error('Erreur lors de la récupération des annonces selon les préférences:', error);
        // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
      }
    );
  }
  /*setPage(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.annonceColocs.length);
    this.pagedAnnonces = this.annonceColocs.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  pageChanged(page: number): void {
    this.setPage(page);  
  }   */
   // Méthode appelée lors de la soumission du formulaire de recherche
   search(): void {
    if (this.query.trim() !== '') {
      this.annonceColocService.searchAnnonces(this.query.trim()).subscribe(
        (annonces) => {
          this.annonceColocs = annonces;
          this.filteredAnnonceColocs = annonces;
        },
        (error) => {
          console.error('Erreur lors de la recherche d\'annonces:', error);
        }
      );
    } else {
      // Afficher un message à l'utilisateur pour indiquer qu'aucune requête n'a été saisie
    }
  }
  }
 



