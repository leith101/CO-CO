import { Component, OnInit } from '@angular/core';
import { BackofficeComponent } from '../backoffice1/backoffice.component'; // Importez la classe BackofficeComponent
import { ContractService } from '../contract/contract-service.service';
import { Router } from '@angular/router';
import { ReservationColocServiceService } from '../reservation/reservation-coloc-service.service';
import { AnnonceColocService } from '../annoceColoc/annonce-coloc.service';

@Component({
  selector: 'app-back2',
  templateUrl: './back2.component.html',
  styleUrls: ['./back2.component.css']
})
export class Back2Component extends BackofficeComponent implements OnInit {
Object: any;
  // Vous pouvez ajouter des propriétés spécifiques à votre composant ici

  constructor(
    contractService: ContractService,
    router: Router,
    reservationService: ReservationColocServiceService,
    annonceService: AnnonceColocService
  ) {
    super(contractService, router, reservationService, annonceService); // Appel du constructeur de la classe parente
  }

  override ngOnInit(): void {
    // Initialisez votre composant ici
    super.ngOnInit(); // Appel de la méthode ngOnInit() de la classe parente
  }

  
  // Vous pouvez également surcharger les méthodes de la classe parente si nécessaire
}
