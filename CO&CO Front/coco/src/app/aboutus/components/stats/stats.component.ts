import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  bannedCount: number;
  allUsers: number;

  constructor(private service: ServiceService) {
    this.bannedCount = 0;
    this.allUsers = 0; // Initializing with a default value
  }

  ngOnInit(): void {
    this.getBannedCount();
    this.getAll();
  }

  getBannedCount(): void {
    this.service.getCountBanned()
      .subscribe(count => {
        this.bannedCount = count;
      });
  }

  getAll(): void {
    this.service.getCountAll()
      .subscribe(count => {
        this.allUsers = count;
      });
  }

  calculateRotation(bannedCount: number, allUsers: number): number {
    // If there are no users, return 0 degrees to avoid division by zero
    if (allUsers === 0) {
      return 0;
    }
    
    // Calculate the rotation angle based on the ratio of bannedCount to allUsers
    return (bannedCount / allUsers) * 360;
  }
}
