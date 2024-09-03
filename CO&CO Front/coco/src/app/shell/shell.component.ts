import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebServiceWorkerService } from '../web-service-worker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit, OnDestroy {

  isNewAppVersionAvailable: boolean = false;
  newAppUpdateAvailableSubscription: Subscription = new Subscription;


  constructor(
    private webServiceWorker: WebServiceWorkerService,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.checkIfAppUpdated();
  }

  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription = this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe((versionAvailableFlag: boolean) => {
      this.isNewAppVersionAvailable = versionAvailableFlag;
    });
  }

  refreshApp() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.newAppUpdateAvailableSubscription?.unsubscribe();
  }

}
