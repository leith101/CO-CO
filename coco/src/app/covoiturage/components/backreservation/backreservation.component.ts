import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-backreservation',
  templateUrl: './backreservation.component.html',
  styleUrl: './backreservation.component.css'
})
export class BackreservationComponent implements OnInit {
  reservations: any[] = [];
  filteredReservations: any[] = [];
  searchText: string = '';
  sortColumn: string = 'titre';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations() {
    this.annonceService.afficherreservation().subscribe(
      (data) => {
        this.reservations = data;
        this.filteredReservations = [...data];
        this.fetchReservationOwners();
        this.fetchReservationOwner();

      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchReservationOwners() {
    this.reservations.forEach((reservation) => {
      this.annonceService.afficherReservationOwner(reservation.idr).subscribe(
        (response) => {
          reservation.ownerName = response;
          console.log(`Owner name for reservation ID ${reservation.idr}: ${reservation.ownerName}`);
        },
        (error: HttpErrorResponse) => {
          console.error(
            `Error fetching owner name for reservation ID: ${reservation.idr}. Status: ${error.status}, Message: ${error.message}`
          );
        }
      );
    });
  }
  fetchReservationOwner() {
    this.reservations.forEach((reservation) => {
      this.annonceService.afficherReservationOwnerPhone(reservation.idr).subscribe(
        (response) => {
          reservation.ownerPhone = response;
          console.log(`Owner name for reservation ID ${reservation.idr}: ${reservation.ownerPhone}`);
        },
        (error: HttpErrorResponse) => {
          console.error(
            `Error fetching owner name for reservation ID: ${reservation.idr}. Status: ${error.status}, Message: ${error.message}`
          );
        }
      );
    });}
  
  deleteReservation(idr: number) {
    this.annonceService.removeReservation(idr).subscribe(
      () => {
        this.reservations = this.reservations.filter(reservation => reservation.idr !== idr);
        this.filterAndSortReservations(); 
      },
      (error) => {
        console.error('Error deleting annonce:', error);
      }
    );
  }


  exportToExcel(): void {
    const dataToExport = this.filteredReservations.map(reservation => {
      const reservationTime = format(new Date(reservation.reservationTime), 'dd/MM/yyyy HH:mm'); 
      return {
        Nom: reservation.ownerName,
        Phone: reservation.ownerPhone,
        'Date de Reservation': reservation.reservationTime
        
        
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport); 
    worksheet['!cols'] = [
      { wch: 20 }, 
      { wch: 25 }, 
      
      
    ];
  
    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'reservations'); 
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blob = new Blob([wbout], { type: 'application/octet-stream' }); 
    FileSaver.saveAs(blob, 'Reservation.xlsx');
  }
  


  onSearchTextChanged() {
    this.filterAndSortReservations();
  }
  

 
  filterAndSortReservations() {
    const searchTextLower = this.searchText.toLowerCase(); 
  
    this.filteredReservations = this.reservations.filter((reservation) => {
      return Object.values(reservation).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTextLower);
        } else if (typeof value === 'number') {
          return value.toString().includes(this.searchText);
        } else if (isValidDate(value)) {
          try {
            const date = new Date(value as string);
            const formattedDate = date.toLocaleString('en-GB'); 
            return formattedDate.toLowerCase().includes(searchTextLower); 
          } catch (error) {
            console.error('Error parsing date:', error); 
          }
        }
        return false;
      });
    });
  
    this.sortData(); 
  }

  sortData() {
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    this.filteredReservations.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * direction;
      } else if (isValidDate(aValue) && isValidDate(bValue)) {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return (dateA.getTime() - dateB.getTime()) * direction; 
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
}



function isValidDate(value: unknown): boolean {
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return !isNaN(date.getTime()); 
  }
  return false; 
}

