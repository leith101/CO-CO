import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';

@Component({
  selector: 'app-ajouterannonce',
  templateUrl: './ajouterannonce.component.html',
  styleUrls: ['./ajouterannonce.component.css']
})
export class AjouterannonceComponent implements OnInit {

  annonceForm!: FormGroup;
  selectedVoiture: any;
  voitures: any[] = [];
  

  constructor(private router: Router,
              private annonceService: AnnonceService,
              private userService: ServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.annonceForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      prix: ['', Validators.required],
      dateDepart: ['', Validators.required],
      placesDisponibles: ['', Validators.required],
      contact: ['', Validators.required],
      status: ['', Validators.required],
      pointDepart: ['', Validators.required],
      pointArrivee: ['', Validators.required],
      pointStop: ['', Validators.required],
      distance: ['', Validators.required],
      matricule: ['', Validators.required]
    });
    this.loadUserVoitures();
  

  }

  

  loadUserVoitures() {
    const userId = this.userService.getLoggedInUserId();
    console.log('User ID:', userId); 
    if (userId) {
      this.annonceService.affichervoiture(userId)
        .subscribe(
          (matricules: string[]) => {
            console.log('Matricules received:', matricules); 
            this.voitures = matricules;
          },
          (error) => {
            console.error('Error fetching user voitures:', error);
          
          }
        );
    }
  }
  

  onChangeVoiture(event: any) {
    const selectedMatricule = event.target.value;
    console.log('Selected matricule:', selectedMatricule); 
    this.annonceService.getUserVoitureByMatricule(this.userService.getLoggedInUserId(), selectedMatricule)
      .subscribe(
        (voiture: any) => {
          console.log('Selected voiture:', voiture);
          this.selectedVoiture = voiture; 
        },
        (error) => {
          console.error('Error fetching voiture:', error);
        }
      );
  }
  
  

  onSubmit() {
    if (!this.selectedVoiture) {
      console.error("No voiture selected");
      return;
    }

    const userId = this.userService.getLoggedInUserId();
    const matricule = this.selectedVoiture.matricule;
    const formData = this.annonceForm.value;

    this.annonceService.addAnnonceCov(userId, matricule, formData)
      .subscribe(
        (result: any) => {
          console.log(result);
          alert("Annonce added successfully");
          this.router.navigateByUrl('/annonceCOV');
        },
        (error) => {
          console.error("Error adding annonce:", error);
          alert("Failed to add annonce. Please try again.");
        }
      );
  }
}
