import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScheduleService } from '../service/schedule.service';
import internal from 'stream';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../login/services/service.service';


export interface Schedule {
  scheduleId: number;
  date: string;
  area: string;
  station: string;
  availability: string;
  price: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [provideNativeDateAdapter()],
  

})
export class ScheduleComponent {
  @ViewChild('map', { static: true }) map: any; 


   ngOnInit() {

    console.log(this.user_id)

    
  
  

  }
  

  area: string = "";
  date: string = "";
  station: string = ""; // Initialize station with default values
  availability: string = "";
  price: number = 0;
  user_id: any;
  selected!: Date | null;


  constructor(private schedule: ScheduleService, private http: HttpClient, private servicee:ServiceService) {}

  handleClick(event: any) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log(`Clicked on: ${lat}, ${lng}`);
    this.station = `${lat},${lng}`; // Update station with lat,lng format
  }
  
  losave() {
    interface EventData {
      area: string;
      date: string;
      price: number;
      availability: string;
      station: string;

    }

    const eventData: EventData = {
      area: this.area,
      date: this.selected ? this.selected.toISOString() : '',
      price: this.price,
      availability: this.availability,
      station: this.station,
    
    };
  
    this.servicee.getLoggedInUser().subscribe((userData: any) => {

          /*    this.servicee.getLoggedInUser().subscribe(user => {
      if (user) {
        this.getSchedule(user.id); // Assuming 'id' is the property that holds the user's ID
      }
    }); */
  
      this.user_id = userData.id;


  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      const url = `http://localhost:8089/schedules/ajouterschedule/${this.user_id}`;
  
      this.http.post<any>(url, eventData, { headers })
        .subscribe(
          (response) => {
            console.log(response); 
            alert("Event created successfully!");
          },
          (error) => {
            console.error("Error creating event:", error);
            alert("Event creation failed. Please try again.");
          }
        );
    });
  }
  
  
}  



