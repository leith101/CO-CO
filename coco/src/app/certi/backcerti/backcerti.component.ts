import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackcertiService } from '../backcerti.service';

@Component({
  selector: 'app-backcerti',
  templateUrl: './backcerti.component.html',
  styleUrls: ['./backcerti.component.css']
})
export class BackcertiComponent implements OnInit {

  displayedColumns: string[] = ['name', 'prenom', 'area', 'voiture', 'etat', 'ceid','changeetat']; // Removed 'symbol' column
  dataSource = new MatTableDataSource<Certification>();

  constructor(private backcertiService: BackcertiService) {}

  ngOnInit() {
    this.backcertiService.getAllCertifications().subscribe(certifications => {
      this.dataSource.data = certifications;
    });
  }


  loadCertifications() {
    this.backcertiService.getAllCertifications().subscribe(certifications => {
      this.dataSource.data = certifications;
    });
  }

  toggleState(certId: number) {
    this.backcertiService.toggleCertificationState(certId).subscribe(() => {
      // Refresh the list of certifications after toggling state
      this.loadCertifications();
    });
  }

}

export interface Certification {
  name: string;
  prenom: string;
  area: string;
  voiture: string;
  etat: string;
  ceid: number;
}
