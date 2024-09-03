import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preferances',
  templateUrl: './preferances.component.html',
  styleUrl: './preferances.component.css'
})
export class PreferancesComponent  {

  selectedPreferences: any[] = [
    { category: 'Studio' },
    { category: 'Apartment' },
    { category: 'House' },
    { category: 'Duplex' },
    { category: 'villa' },
    { category: 'cabin' },
    { category: 'pet lover' },
    { category: 'non-smoker' },
    { category: 'alcahoolic' },
    { category: 'smoker' },
    { category: 'sport' },
    { category: 'cars' },
    
    
    
  ];

  constructor(private service: ServiceService ,private router: Router) { }

 

  updatePreferences() {
    // Get the logged-in user ID
    const userId = this.service.getLoggedInUserId();

    if (userId) {
      // Extract selected preferences
      const selectedTypes = this.selectedPreferences
        .filter(preference => preference.selected)
        .map(preference => preference.category);

      // Call the API to update preferences
      this.service.updatePreferences(selectedTypes)
        .subscribe(response => {
          console.log('Preferences updated successfully', response);
          Swal.fire({
            title: "Good job!",
            text: "You Preferances has been updated!",
            icon: "success"
          });
          this.router.navigateByUrl('home');
          // You can perform additional actions if needed
        }, error => {
          console.error('Error updating preferences', error);
          // Handle the error as needed
        });
    } else {
      console.error('User not logged in');
      // Handle case where user is not logged in
    }
  }

 
 


}
