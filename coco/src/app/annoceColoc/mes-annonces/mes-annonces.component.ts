import { Component, OnInit } from '@angular/core';
import { AnnonceColocService } from '../annonce-coloc.service';
import { ServiceService } from '../../login/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {
  annoncesUtilisateur: any[] = [];

  constructor(private annonceColocService: AnnonceColocService) { }

  ngOnInit(): void {
    this.annonceColocService.getAnnoncesUtilisateurConnecte().subscribe(
      (annonces) => {
        this.annoncesUtilisateur = annonces;
      },
      (error) => {
        console.error('Erreur lors de la récupération des annonces de l\'utilisateur:', error);
      }
    );
  }
}
