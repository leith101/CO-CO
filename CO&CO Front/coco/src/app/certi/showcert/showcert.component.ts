import { Component, TrackByFunction } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ShowscService } from '../showsc.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-showcert',
  templateUrl: './showcert.component.html',
  styleUrls: ['./showcert.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowcertComponent {
  dataSource = new MatTableDataSource<Schedule>(); // Initialize dataSource as MatTableDataSource
  columnsToDisplay = ['scheduleId', 'date', 'area', 'station', 'availability', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Schedule | null = null; // Initialize expandedElement

  constructor(private showscService: ShowscService) {} // Inject the ShowscService

  ngOnInit() {
    this.showscService.getAllSchedules().subscribe(schedules => {
      this.dataSource.data = schedules; // Set fetched schedules as dataSource data
    });
  }


  loadSchedules() {
    this.loadSchedules();
  }

deleteSchedule(scheduleId: number) {
  if (confirm('Are you sure you want to delete this schedule?')) {
    this.showscService.deleteScheduleById(scheduleId).subscribe(() => {
      this.loadSchedules(); 
              //this.dataSource=this.dataSource._filterData (scheduleId=> sch!== email)
      setTimeout(() => {
        location.reload(); // Reload schedules after deletion
      }, 100); // Delay reload by 100 milliseconds
    });
  }
}


  toggleExpandedElement(element: Schedule, event: Event) {
    event.stopPropagation(); // Prevent row click event from being propagated
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  trackByFn: TrackByFunction<Schedule> = (index, item) => {
    if (item && typeof item.scheduleId === 'number') {
      return item.scheduleId.toString();
    }
    return null; // Return null if item is undefined or scheduleId is not a number
  };
  

  
}




export interface Schedule {
  scheduleId: number;
  date: string;
  area: string;
  station: string;
  availability: string;
  price: number;
}
