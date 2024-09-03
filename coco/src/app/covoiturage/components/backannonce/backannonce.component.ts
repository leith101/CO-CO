import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
@Component({
  selector: 'app-backannonce',
  templateUrl: './backannonce.component.html',
  styleUrls: ['./backannonce.component.css']
})
export class BackannonceComponent implements OnInit {
  annonces: any[] = [];
  filteredAnnonces: any[] = [];
  searchText: string = '';
  sortColumn: string = 'titre';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllAnnonces();
  }

  getAllAnnonces() {
    this.annonceService.afficherannonce().subscribe(
      (data) => {
        this.annonces = data;
        this.filteredAnnonces = [...data];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteAnnonce(ida: number) {
    this.annonceService.removeAnnonce(ida).subscribe(
      () => {
        this.annonces = this.annonces.filter(annonce => annonce.ida !== ida);
        this.filterAndSortAnnonces(); 
      },
      (error) => {
        console.error('Error deleting annonce:', error);
      }
    );
  }

  
  navigateToUpdatePage(ida: number): void {
    this.router.navigate(['/bupdate', ida]);
  }

  onSearchTextChanged() {
    this.filterAndSortAnnonces();
  }

  filterAndSortAnnonces() {
    this.filteredAnnonces = this.annonces.filter(annonce => {
      return Object.values(annonce).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.searchText.toLowerCase());
        } else if (typeof value === 'number') {
          return value.toString().includes(this.searchText);
        }
        return false;
      });
    });
  
    this.sortData(); 
  }
  
  sortData() {
    this.filteredAnnonces.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      const direction = this.sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * direction;
      }

      return 0;
    });
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortData();
  }


  exportToExcel(): void {
    const dataToExport = this.filteredAnnonces.map(annonce => {
      const dateDepart = format(new Date(annonce.dateDepart), 'dd/MM/yyyy HH:mm'); 
      const pointArrivee = annonce.pointArrivee;

      return {
        Titre: annonce.titre,
        'Places Disponibles': annonce.placesDisponibles,
        'Date de Départ': dateDepart, 
        'Point de Départ': annonce.pointDepart,
        'Point dArrivée': pointArrivee,
        Status: annonce.status,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport); 
    worksheet['!cols'] = [
      { wch: 20 }, 
      { wch: 25 }, 
      { wch: 25 }, 
      { wch: 25 }, 
      { wch: 25 }, 
      { wch: 20 }, 
    ];

    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Annonces'); 
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blob = new Blob([wbout], { type: 'application/octet-stream' }); 
    FileSaver.saveAs(blob, 'annonces.xlsx');
  }
}
