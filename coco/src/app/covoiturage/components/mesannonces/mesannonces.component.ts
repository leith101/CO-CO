import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesannonces',
  templateUrl: './mesannonces.component.html',
  styleUrl: './mesannonces.component.css'
})
export class MesannoncesComponent implements OnInit {
  annonces: any[] = [];

  constructor(private annonceService: AnnonceService, private userService: ServiceService, private router: Router) { }

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

  getAnnonces(): void {
    this.userService.getLoggedInUser().subscribe(
      (user: any) => {
        const userId = user.id;
        this.annonceService.afficherannonces(userId).subscribe(
          annonces => { 
            this.annonces = annonces;
          },
          (error) => {
            console.error('Error fetching annonces:', error);
          }
        );
      },
      (error) => {
        console.error('Error retrieving user information:', error);
      }
    );
  }

 /* deleteAnnonce(userId: number, ida: number): void {
    // Call the service to delete the announcement directly
    this.annonceService.deleteAnnonce(userId, ida).subscribe(
      () => {
        console.log('Announcement deleted successfully.');
        // Optionally, refresh the list of announcements after deletion
        this.getAnnonces();
      },
      (error) => {
        console.error('Error deleting annonce:', error);
      }
    );
  }*/
  deleteAnnonce(userId: number, ida: number): void {
    console.log('Deleting announcement with userId:', userId, ' and ida:', ida);
    
    this.annonceService.deleteReservation(ida).subscribe(
        (response: any) => {
            if (typeof response === 'string' && response.includes('less than 48 hours ago')) {
                console.log('Reservations made less than 48 hours ago.');
            } else {
                console.log('No reservations made less than 48 hours ago.');
                this.deleteAnnonceOnly(userId, ida);
            }
        },
        (error) => {
            if (typeof error.error === 'string' && error.error.includes('less than 48 hours ago')) {
                console.log('Reservations made less than 48 hours ago.');
            } else {
                console.error('Error deleting old reservations:', error);
                alert("Deletion failed due to an error in deleting old reservations.");
            }
        }
    );
}



deleteReservationsAndAnnonce(userId: number, ida: number): void {
    this.annonceService.deleteReservation(ida).subscribe(
        () => {
            this.annonceService.deleteAnnonce(userId, ida).subscribe(
                () => {
                    console.log('Announcement deleted successfully.');
                    this.getAnnonces();
                },
                (error) => {
                    console.error('Error deleting announcement:', error);
                    alert("Deletion failed because of an error in deleting the announcement.");
                }
            );
        },
        (error) => {
            console.error('Error deleting old reservations:', error);
            alert("Deletion failed due to an error in deleting old reservations.");
        }
    );
}

deleteAnnonceOnly(userId: number, ida: number): void {
    this.annonceService.deleteAnnonce(userId, ida).subscribe(
        () => {
            console.log('Announcement deleted successfully.');
            this.getAnnonces();
        },
        (error) => {
            console.error('Error deleting announcement:', error);
            alert("Deletion failed because of an error in deleting the announcement.");
        }
    );
}

  
navigateToUpdatePage(ida: number): void {
  this.router.navigate(['/updateannonce', ida]);
}


}  