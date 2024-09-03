
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
@Component({
  selector: 'app-backvoiture',
  templateUrl: './backvoiture.component.html',
  styleUrls: ['./backvoiture.component.css']
})
export class BackvoitureComponent implements OnInit {
  voitures: any[] = [];
  filteredVoitures: any[] = [];
  searchText: string = '';
  sortColumn: string = 'titre';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllVoitures();
  }

  getAllVoitures() {
    this.annonceService.affichervoitures().subscribe(
      (data) => {
        this.voitures = data;
        this.filteredVoitures = [...data];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteVoiture(idv: number) {
    this.annonceService.removeVoiture(idv).subscribe(
      () => {
        this.voitures = this.voitures.filter(voiture => voiture.idv !== idv);
        this.filterAndSortVoitures(); 
      },
      (error) => {
        console.error('Error deleting voiture:', error);
      }
    );
  }

  navigateToUpdatePage(idv: number): void {
    this.router.navigate(['/buvoiture', idv]);
  }
  onSearchTextChanged() {
    this.filterAndSortVoitures();
  }

  filterAndSortVoitures() {
    this.filteredVoitures = this.voitures.filter(voiture => {
      return Object.values(voiture).some(value => {
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
    this.filteredVoitures.sort((a, b) => {
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
    const dataToExport = this.filteredVoitures.map(voiture => {

      return {
        Marque: voiture.marque,
        'Modele': voiture.modele,
        ' marque': voiture.marque, 
        'Nombre de places': voiture.nombrePlaces,
        
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport); 
    worksheet['!cols'] = [
      { wch: 20 }, 
      { wch: 25 }, 
      { wch: 25 }, 
      { wch: 25 }, 
      
    ];

    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'voitures'); 
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blob = new Blob([wbout], { type: 'application/octet-stream' }); 
    FileSaver.saveAs(blob, 'voitures.xlsx');
  }





}
