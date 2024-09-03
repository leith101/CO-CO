import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  loggedInUser: any;

  constructor(private router: Router,private service: ServiceService )
  {
  }

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
    });

  }

  updateProfile() {
    this.service.updateUser(this.loggedInUser).subscribe(
      updatedUser => {
        console.log('User updated successfully:', updatedUser);
        // You can perform additional actions if needed
      },
      error => {
        console.error('Error updating user:', error);
        // Handle the error as needed
      }
    );
  }

}
