import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certification } from './backcerti/backcerti.component';

@Injectable({
  providedIn: 'root'
})
export class BackcertiService {
  private baseUrl = 'http://localhost:8089/certifications'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getAllCertifications(): Observable<Certification[]> {
    const url = `${this.baseUrl}/getall`; // Endpoint for retrieving all certifications
    return this.http.get<Certification[]>(url);
  }

  getCertificationById(id: number): Observable<Certification> {
    const url = `${this.baseUrl}/getcerti/${id}`; // Endpoint for retrieving a certification by ID
    return this.http.get<Certification>(url);
  }


  getCertificationByUserId(userId: any): Observable<Certification> {
    const url = `${this.baseUrl}/getuser/${userId}`; // Endpoint for retrieving a certification by user ID
    return this.http.get<Certification>(url);
  }

  toggleCertificationState(certId: any): Observable<Certification> {
    const url = `${this.baseUrl}/changeetat/${certId}`; // Endpoint for toggling certification state by ID
    return this.http.put<Certification>(url, null); // Send a PUT request with null body
  }


}
