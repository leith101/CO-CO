import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  map: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        this.map = L.map('map').setView([36.8663, 10.1645], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        console.log(this.data + "fil dialog")

        // Add initial marker
        this.addMarker(36.8663, 10.1645, 'Ariana, Tunisia');
        this.showMarker(this.data);
      });
    }
  }

  addMarker(lat: number, lng: number, popupText: string) {
    this.map.marker([lat, lng]).addTo(this.map)
      .bindPopup(popupText)
      .openPopup();
  }

  showMarker(data: string): void {
    const [latStr, lngStr] = data.split(','); // Split the string at comma
    const lat = parseFloat(latStr.trim()); // Convert the first part to a number
    const lng = parseFloat(lngStr.trim()); 
    this.addMarker(lat, lng, `Location: ${lat}, ${lng}`);
  }
}
