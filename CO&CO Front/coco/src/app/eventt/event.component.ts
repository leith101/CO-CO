import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

 export interface EventData {
  place: string;
  time: string;
  description: string;
  imageUrl: string;
}




@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  place: string = '';
  time: string = '';
  description: string = '';
  imageUrl: string = '';
  showCard: boolean = false;
  events: EventData[] = [];

  constructor(private http: HttpClient , private snackBar: MatSnackBar) {}

  addEvent() {
    const eventData = {
      place: this.place,
      time: this.time,
      description: this.description,
      imageUrl: this.imageUrl
    };

    this.http.post('http://localhost:8089/events/ajouterEvent', eventData)
      .subscribe(response => {
        this.showCard = true;
        console.log('Event added successfully:', response);
        this.showNotification('Event added successfully!');
        this.events.push(eventData);
        this.place = '';
        this.time = '';
        this.description = '';
        this.imageUrl = '';
        // You can perform additional actions upon successful addition
        // such as resetting the form or navigating to a different page.
      }, error => {
        console.error('Error adding event:', error);
        // Handle errors accordingly
      
    
      });


  }





  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration for the notification (in milliseconds)
    })
  }

  
}
