import { EventData } from './../event.component';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

import { TicketService } from './ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { QrCodeService } from '../../qr-code.service';


export interface Ticket {
  id: number;
  description: string;
  place: string;

}



@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  events: EventData[] = [];
  myAngularxQrCode: string = 'hello';
  searchPlace: string = "";
  searchTime: string = "";
  


  constructor(private eventService: EventService , private ticketService: TicketService , private dialog: MatDialog , private qrCodeService: QrCodeService) {}

  ngOnInit(): void {
    this.eventService.showEvents().subscribe(
      (events: EventData[]) => {
        this.events = events;
        console.log('Events retrieved successfully:', events);
      },
      (error) => {
        console.error('Error retrieving events:', error);
        // Handle errors accordingly
      }
    );
    /*    this.servicee.getLoggedInUser().subscribe(user => {
      if (user) {
        this.getSchedule(user.id); // Assuming 'id' is the property that holds the user's ID
      }
    }); */
  
  }




  




  searchByPlace() {
    this.eventService.searchbyplace(this.searchPlace).subscribe(
        (events: EventData[]) => {
            this.events = events;
            console.log('Events retrieved successfully:', events);
        },
        (error) => {
            console.error('Error retrieving events:', error);
            // Handle errors accordingly
        }
    );
}




searchbytime() {
  this.eventService.searchbytime(this.searchTime).subscribe(
      (events: EventData[]) => {
          this.events = events;
          console.log('Events retrieved successfully:', events);
      },
      (error) => {
          console.error('Error retrieving events:', error);
          // Handle errors accordingly
      }
  );
}








  openQrDialog(qrData: string): void {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '250px',
      data: { qrData: qrData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
