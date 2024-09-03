import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ServiceService } from '../../login/services/service.service';






@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  
})
export class CertificationComponent {
  certification: any = {}; // Object to hold certification data
   // Replace with your actual API URL
  user_id: any;
  constructor(private http: HttpClient,public dialog: MatDialog,private servicee:ServiceService) {}

  ngOnInit(): void {
    this.servicee.getLoggedInUser().subscribe((userData: any) => {
      this.user_id = userData.id;
    });
  }



  




  addCertification() {
    const url = `http://localhost:8089/certifications/ajoutercerti/${this.user_id}`; // Update the URL
    this.http.post(url, this.certification)
      .subscribe((response: any) => {
        console.log('Certification added successfully:', response);
        // Optionally, reset the form or take any other action upon successful addition
      }, (error: any) => {
        console.error('Error adding certification:', error);
        // Handle error appropriately (e.g., show error message)
    
      } 
    )}
}
