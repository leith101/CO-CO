import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';

@Component({
  selector: 'app-updatevoiture',
  templateUrl: './updatevoiture.component.html',
  styleUrl: './updatevoiture.component.css'
})
export class UpdatevoitureComponent implements OnInit {
  voiture: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    this.getVoitureDetails();
  }

  getVoitureDetails(): void {
    const idvString = this.route.snapshot.paramMap.get('idv');
    if (idvString) {
      const idv = +idvString;
      this.annonceService.getVoitureById(idv).subscribe(
        (voiture: any) => {
          this.voiture = voiture;
        },
        error => {
          console.error('Error fetching voiture details:', error);
        }
      );
    } else {
      console.error('IDv parameter is null or undefined');
    }
  }

  updateVoitures(): void {
    if (this.voiture && this.voiture.idv) { 
      this.annonceService.updateVoiture(this.voiture.idv, this.voiture).subscribe(
        () => {
          console.log('voiture updated successfully.');
          this.router.navigateByUrl('/voiture'); 
        },
        error => {
          console.error('Error updating voiture:', error);
        }
      );
    } else {
      console.error('voiture ID is missing or invalid');
    }
  }
}


