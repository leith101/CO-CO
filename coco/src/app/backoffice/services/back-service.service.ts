import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackServiceService  {

  private baseUrl = 'http://localhost:8089';
  constructor(private http:HttpClient) { }

  getConnectedUsers(): Observable<any> {
    // Assuming the endpoint for connected users is /listUsers
    const url = `${this.baseUrl}/listUsers`;
    return this.http.get<any>(url);
  }

  banUserByEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/ban?email=${email}`, null);
  }

  banTemp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/ban/temp?email=${email}`, null);
  }

  supprimerUtilisateurParEmail(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser?email=${email}`);
  }

  getCountBanned(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/banned/count`);
  }

  getCountAll(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/all`);
  }
  

  getUtilisateursRecents(): Observable<any> {
    // Assuming the endpoint for connected users is /listUsers
    const url = `${this.baseUrl}/utilisateurs-recents`;
    return this.http.get<any>(url);
  }

  exportUsersToExcel(): Observable<Blob> {
    return this.http.get('http://localhost:8089/export-users', { responseType: 'blob' });
  }

}
