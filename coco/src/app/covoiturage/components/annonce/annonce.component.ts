import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
  providers: [DatePipe],
})
export class AnnonceComponent implements OnInit {
  annonces: any[] = [];
  filteredAnnonces: any[] = [];
  paginatedAnnonces: any[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;

  constructor(
    private annonceService: AnnonceService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getAnnonces();
    this.updateAnnouncementStatus();
  }

  updateAnnouncementStatus(): void {
    this.annonceService.updateAnnouncementStatus().subscribe(
      (response: string) => {
        console.log('Announcement status updated:', response);
      },
      (error) => {
        console.error('Error updating announcement status:', error);
      }
    );
  }

  viewAnnouncementDetails(ida: number): void {
    this.router.navigate(['/annonces', ida]);
  }

  getAnnonces(): void {
    this.annonceService.afficherannoncess().subscribe(
      (annonces) => {
        this.annonces = annonces;
        this.filteredAnnonces = annonces; 
        this.updatePagination(); 
      },
      (error) => {
        console.error('Error fetching announcements:', error);
      }
    );
  }

  updatePagination(): void {
    const totalItems = this.filteredAnnonces.length; 
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage); 
    this.setPaginatedAnnonces(); 
  }

  setPaginatedAnnonces(): void {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    this.paginatedAnnonces = this.filteredAnnonces.slice(startIdx, endIdx); 
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPaginatedAnnonces(); 
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement?.value?.toLowerCase();

    if (searchTerm) {
      this.filteredAnnonces = this.annonces.filter((annonce) => {
        const titleMatch = annonce.titre.toLowerCase().includes(searchTerm);
        const pointDepartMatch = annonce.pointDepart.toLowerCase().includes(searchTerm);
        const pointArriveeMatch = annonce.pointArrivee.toLowerCase().includes(searchTerm);

        const formattedDate = annonce.dateDepart
          ? this.datePipe.transform(annonce.dateDepart, 'dd/MM/yyyy')
          : null;
        const dateMatch = formattedDate
          ? formattedDate.toLowerCase().includes(searchTerm)
          : false;

        return titleMatch || pointDepartMatch || pointArriveeMatch || dateMatch;
      });

      this.currentPage = 1;
      this.updatePagination(); 
    } else {
      this.filteredAnnonces = this.annonces;
      this.currentPage = 1; 
      this.updatePagination(); 
    }
  }
}
