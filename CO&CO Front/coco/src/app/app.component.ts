import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'coco';
  isAdmin : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.checkForAdminRoute();
  }

  checkForAdminRoute(): void {
    const currentRoute = window.location.pathname;

    this.isAdmin = currentRoute.includes('/admin');



  }


}
