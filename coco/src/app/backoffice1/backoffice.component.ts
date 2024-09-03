import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContractService } from '../contract/contract-service.service';
import { Router } from '@angular/router';
import { ReservationColocServiceService } from '../reservation/reservation-coloc-service.service';
import { Chart } from 'chart.js';
import { AnnonceColocService } from '../annoceColoc/annonce-coloc.service';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit, AfterViewInit {
  contracts: any[] = [];
  filteredContracts: any[] = [];
  reservationCountByDay: { [key: string]: number } = {};
  chart: Chart | undefined;
  reservations: any[] = [];
  annonceId: any;
  annonceColoc: any;
  prixAnnonce: any;
  imageAnnonce: any;
  searchQuery: string = '';
  contractCount: number = 0; // Variable pour stocker le nombre de contrats
  annonceCount: number = 0; // Variable pour stocker le nombre d'annonces
  reservationCount: number = 0; // Variable pour stocker le nombre de réservations
  reservationPercentageMap: Map<number, number> = new Map<number, number>(); // Propriété pour stocker les pourcentages de réservation
  totalViews: number = 0; // Propriété pour stocker le nombre total de vues

  constructor(
    private contractService: ContractService,
    private router: Router,
    private reservationService: ReservationColocServiceService,
    private annonceService: AnnonceColocService,

  ) { }

  ngOnInit(): void {
    this.loadContracts();
    this.loadReservations();
    this.loadAnnonces();
    this.calculateTotalViews();


  }
  filterTable() {
    const filter = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const rows = document.querySelectorAll('table tr');
    for (let i = 1; i < rows.length; i++) {
      const cols = (rows[i] as HTMLElement).querySelectorAll('td');
      let visible = false;
      for (let j = 0; j < cols.length; j++) {
        const cell = cols[j];
        if ((cell as HTMLElement).innerText.toUpperCase().indexOf(filter) > -1) {
          visible = true;
          break;
        }
      }
      (rows[i] as HTMLElement).style.display = visible ? '' : 'none';
    }
  }
  generateExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contrats');
  
    // Ajoutez les en-têtes de colonne
    worksheet.addRow(['ID', 'Date du contrat', 'Durée du contrat', 'Choix du contrat', 'Signature', 'Annonce Colocation ID', 'Réservation ID']);
  
    // Ajoutez les données des contrats
    this.filteredContracts.forEach(contract => {
      worksheet.addRow([contract.id, contract.date_contract, contract.DureeC, contract.choixC, contract.signature ? 'Oui' : 'Non', contract.annoncecolocation.id, contract.reservationcoloc.id]);
    });
  
    // Générez le fichier Excel et téléchargez-le
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contrats.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
 
  calculateTotalViews(): void {
    // Initialiser la somme des vues à 0
    this.totalViews = 0;
    // Parcourir toutes les annonces et ajouter leurs vues à la somme totale
    this.annonceColoc.forEach((annonce: { nombreVues: number; }) => {
      this.totalViews += annonce.nombreVues;
    });
  }
  
  getAnnonceDetails(): void {
    this.annonceService.getAnnonceColocById(this.annonceId)
      .subscribe(annonce => {
        this.annonceColoc = annonce;
        this.prixAnnonce = annonce.prix;
        this.imageAnnonce = annonce.image;
      });
  }
  loadAnnonces() {
    this.annonceService.getAnnonceColocsList().subscribe(
      (data) => {
        this.annonceCount = data.length;
        this.annonceColoc = data;
        this.calculateTotalViews(); // Appeler calculateTotalViews() ici une fois que les annonces sont chargées
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  deleteAnnonce(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.annonceService.deleteAnnonce(id).subscribe(
        () => {
          this.loadAnnonces(); // Rechargez la liste des annonces après la suppression
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadReservations() {
    this.reservationService.getReservationDetails().subscribe(
      (data) => {
        this.reservations = data;
        this.getAnnonceDetails();
        this.reservationCount = data.length; // Mettre à jour le nombre de réservations
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteReservation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          this.loadReservations();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.loadReservationCountByDay();
  }

  loadContracts() {
    this.contractService.getAllContracts().subscribe(
      (data) => {
        this.contracts = data;
        this.filteredContracts = data;
        this.contractCount = this.contracts.length; // Calculer le nombre de contrats
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteContract(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      this.contractService.deleteContract(id).subscribe(
        () => {
          this.loadContracts();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  editContract(id: number) {
    this.router.navigate(['/edit-contract', id]);
  }

  loadReservationCountByDay() {
    this.reservationService.getReservationCountByDay().subscribe(
      (data) => {
        this.reservationCountByDay = data;
        this.createChart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createChart() {
    const dates = Object.keys(this.reservationCountByDay);
    const counts = Object.values(this.reservationCountByDay);

    this.chart = new Chart('reservationChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Réservations par jour',
          data: counts,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de réservations'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Réservations par jour'
          }
        }
      }
    });
  }

  searchContracts() {
    if (!this.searchQuery.trim()) {
      this.filteredContracts = this.contracts;
      return;
    }
    this.filteredContracts = this.contracts.filter(contract =>
      contract.date_contract.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contract.DureeC.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contract.choixC.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (contract.signature ? 'Oui' : 'Non').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contract.annoncecolocation?.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contract.reservationcoloc?.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
