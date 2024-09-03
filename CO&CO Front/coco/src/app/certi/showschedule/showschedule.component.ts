import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ShowscService } from '../showsc.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-showschedule',
  templateUrl: './showschedule.component.html',
  styleUrls: ['./showschedule.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class ShowscheduleComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });





  favoriteSeason: string = '';
  seasons: string[] = ['manouba', 'benarous', 'ariana', 'bizerte','jendouba'];
  selected!: Date | null;
  displayedColumns = [
    'Name',
    'date',
    'area',
    'station',
    'availability',
    'price',
    'star' // 'availibility' corrected to 'availability'
  ];
  dataSource: Schedule[] = [];
  filteredDataSource: Schedule[] = [] // Corrected the declaration of 'dataSource' array

  constructor(private showscService: ShowscService,public dialog: MatDialog,private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.showscService.getAllSchedules().subscribe(schedules => {
      this.dataSource = schedules; // Assign fetched schedules to dataSource
    });



  }
  onFavoriteSeasonChange() {
    // Fetch schedules based on the selected favorite season
    this.showscService.getScheduleByArea(this.favoriteSeason).subscribe(schedules => {
      this.dataSource = schedules; // Assign fetched schedules to dataSource
    });
  }

// Corrected function names to follow TypeScript naming conventions
filterDataSource() {

  if (this.selected) {
    const selectedISOString = this.selected.toISOString();
    this.filteredDataSource = this.dataSource.filter(schedule => schedule.date === selectedISOString);
  } else {
    this.filteredDataSource = this.dataSource;
  }
}

// Function to handle date selection change
onDateSelected() {

  this.filterDataSource(); // Call the filterDataSource function
  this.dataSource = this.filteredDataSource; // Assign the filtered data to dataSource
}

openDialog(stationData: string): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '600px',
    height: '400px',
    data: stationData // Correctly pass the stationData
    
  });

  dialogRef.afterClosed().subscribe((result: any) => { // Specify the type of result
    console.log('The dialog was closed');
  });

  console.log(stationData +"fil open"); // Log stationData, not this.data
}
}
  



export interface Schedule {
  scheduleId: number;
  date: string;
  area: string;
  station: string;
  availability: string; // Corrected the property name from 'availibility' to 'availability'
  price: number;
}
