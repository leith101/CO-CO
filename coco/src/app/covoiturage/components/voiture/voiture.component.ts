import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.css'
})
export class VoitureComponent implements OnInit {
voitures: any[] = [];
imageURL: string = '';  

constructor(private annonceService: AnnonceService, private userService: ServiceService,    private router: Router
  ) { }

ngOnInit(): void {
this.getVoitures();
this.imageURL = 'https://i.ibb.co/CBs3CwC/car.png';
}

getVoitures(): void {
this.userService.getLoggedInUser().subscribe(
  (user: any) => {
    const userId = user.id;
    this.annonceService.getVoiture(userId).subscribe(
      voitures => { 
        this.voitures = voitures;
      },
      (error) => {
        console.error('Error fetching voitures:', error);
      }
    );
  },
  (error) => {
    console.error('Error retrieving user information:', error);
  }
);
}


deleteVoiture(userId: number, idv: number): void {
  this.userService.getLoggedInUser().subscribe(
    (loggedInUser: any) => {
      if (loggedInUser) {
        const userId = loggedInUser.id;
        console.log('User ID:', userId);
        console.log('Voiture ID:', idv); // Check the value of idv
        this.annonceService.deleteVoiture( idv).subscribe(
          () => {
            console.log('Delete voiture response:');
            this.router.navigateByUrl('/home'); 
          },
          (error) => {
            console.error('Error deleting voiture:', error);
          }
        );
      } else {
        console.error('User is not logged in.');
      }
    },
    (error) => {
      console.error('Error retrieving logged-in user:', error);
    }
  );
}
navigateToUpdatePage(idv: number): void {
  this.router.navigate(['/updatevoiture', idv]);
}


}
