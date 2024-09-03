import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  reservations: any[] = [];
  imageURL: string = '';  

  constructor(private annonceService: AnnonceService, 
    private userService: ServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.getReservation();
    this.imageURL = 'https://i.ibb.co/hydgn6B/image.jpg';
    
  }

  getReservation(): void {
    this.userService.getLoggedInUser().subscribe( 
      (user: any) => {
        const userId = user.id;
        this.annonceService.afficherreservations(userId).subscribe(
          reservations => { 
            this.reservations = reservations;
            console.log('Reservations:', reservations);
          },
          (error) => {
            console.error('Error fetching reservations:', error);
          }
        );
      },
      (error) => {
        console.error('Error retrieving user information:', error);
      }
    );
  }


  deleteReservation(userId: number, idr: number): void {
    this.userService.getLoggedInUser().subscribe(
      (loggedInUser: any) => {
        if (loggedInUser) {
          const userId = loggedInUser.id;
          this.annonceService.deleteReservationByUserIdAndIdr(userId, idr).subscribe(
            () => {
              console.log('Delete reservation response:');
              this.router.navigateByUrl('/annonceCOV'); 
            },
            (error) => {
              console.error('Error deleting reservation:', error);
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



}
