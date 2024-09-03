import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../../login/services/service.service'; 
@Component({
  selector: 'app-ajoutervoiture',
  templateUrl: './ajoutervoiture.component.html',
  styleUrl: './ajoutervoiture.component.css'
})

export class AjoutervoitureComponent implements OnInit {


  
  
  matricule: string = '';
  nombrePlaces: number = 0;
  img: string = '';
  marque: string='';
  modele: string='';

 selectedFile: File | null = null;

  constructor(private http: HttpClient, 
    private router: Router,
    private service: AnnonceService, 
    private userService: ServiceService ) { }
  ngOnInit(): void {
  }

    onFileSelected(event: any) {
      const file: File = event.target.files[0] as File;
      if (file) {
        console.log('Selected file:', file);
      }
    }
  addVoiture() {
    let voitureData = {
      matricule: this.matricule,
      nombrePlaces: this.nombrePlaces,
      img: this.selectedFile,
      marque: this.marque,
      modele: this.modele


    };

    this.userService.getLoggedInUser().subscribe(
      (user: any) => {
          const userId = user.id;

          this.service.registerVoiture({
                  userId: userId,
                  ...voitureData 
            }).subscribe(
                (result: any) => {
                    console.log(result);
                    alert("Voiture added successfully");
                    this.router.navigateByUrl('/home');
                },
                (error) => {
                    console.error("Error adding voiture:", error);
                    alert("Failed to add voiture. Please try again.");
                }
            );
        },
        (error) => {
            console.error("Error retrieving user information:", error);
            alert("Failed to retrieve user information. Please try again.");
        }
    );
      }}