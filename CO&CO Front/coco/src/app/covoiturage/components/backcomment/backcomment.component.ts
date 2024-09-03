import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-backcomment',
  templateUrl: './backcomment.component.html',
  styleUrl: './backcomment.component.css'
})
export class BackcommentComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  searchText: string = '';
  sortColumn: string = 'titre';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCommments();
  }

  getAllCommments() {
    this.annonceService.affichercomment().subscribe(
      (data) => {
        this.comments = data;
        this.filteredComments = [...data];
        this.fetchCommentaireOwners();

      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchCommentaireOwners() {
    this.comments.forEach((comment) => {
      this.annonceService.afficherCommentOwner(comment.idco).subscribe(
        (response) => {
            comment.owner = response;
          console.log(`Owner name for comment ID ${comment.idco}: ${comment.owner}`);
        },
        (error: HttpErrorResponse) => {
          console.error(
            `Error fetching owner name for reservation ID: ${comment.idco}. Status: ${error.status}, Message: ${error.message}`
          );
        }
      );
    });
  }


  deleteComment(idco: number) {
    this.annonceService.removeComment(idco).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.idco !== idco);
        this.filterAndSortComments(); 

      },
      (error) => {
        console.error('Error deleting annonce:', error);
      }
    );
  }

 

  onSearchTextChanged() {
    this.filterAndSortComments();
  }

  filterAndSortComments() {
    this.filteredComments = this.comments.filter(Comment => {
      return Object.values(Comment).some(value => {
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
    this.filteredComments.sort((a, b) => {
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
    const dataToExport = this.filteredComments.map(comment => {

      return {
        comments: comment.comments,
        comment:comment.owner
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Commentaires'); 
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blob = new Blob([wbout], { type: 'application/octet-stream' }); 
    FileSaver.saveAs(blob, 'Commentaires.xlsx');
  }
}

