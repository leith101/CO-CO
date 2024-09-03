import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';

@Component({
  selector: 'app-backupdateannonce',
  templateUrl: './backupdateannonce.component.html',
  styleUrls: ['./backupdateannonce.component.css']
})
export class BackupdateannonceComponent implements OnInit {
  annonce: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    this.getAnnonceDetails();
  }

  getAnnonceDetails(): void {
    const idaString = this.route.snapshot.paramMap.get('ida');
    if (idaString) {
      const ida = +idaString;
      this.annonceService.getAnnonceById(ida).subscribe(
        (annonce: any) => {
          this.annonce = annonce;
        },
        error => {
          console.error('Error fetching announcement details:', error);
        }
      );
    } else {
      console.error('IDA parameter is null or undefined');
    }
  }

  updateAnnonce(): void {
    if (this.annonce && this.annonce.ida) { // Check if the ID is valid
      this.annonceService.updateAnnonce(this.annonce.ida, this.annonce).subscribe(
        () => {
          console.log('Announcement updated successfully.');
          // Optionally navigate to another page upon successful update
          this.router.navigateByUrl('/bannonce'); // Navigate to 'Back Annonce' page
        },
        error => {
          console.error('Error updating announcement:', error);
        }
      );
    } else {
      console.error('Announcement ID is missing or invalid');
    }
  }
}
