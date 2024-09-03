import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../login/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationColocServiceService {
  private apiUrl = 'http://localhost:8089/api/reservations-coloc'; // URL de votre API Spring

  constructor(private http: HttpClient, private userService: ServiceService) { }

  // Méthode pour récupérer les détails de toutes les réservations
  getReservationDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer les détails d'une réservation par son ID
  getReservationById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Méthode pour ajouter une réservation
  addReservation(annonceId: number, userId: number, reservation: any): Observable<any> {
    const url = `${this.apiUrl}/${annonceId}?id=${userId}`;
    return this.http.post<any>(url, reservation);
  }

  // Méthode pour mettre à jour une réservation
  updateReservation(id: number, updatedReservation: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updatedReservation);
  }


  getUserByIdReservation(reservationid: number): Observable<any> {
    const url = `${this.apiUrl}/RetreiveUserfromReservation/${reservationid}`;
    return this.http.get<any>(url);
  }

  // Méthode pour supprimer une réservation
  deleteReservation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Méthode pour récupérer les statistiques de réservation par jour
  getReservationCountByDay(): Observable<{ [key: string]: number }> {
    const url = `${this.apiUrl}/stats/reservationCountByDay`;
    return this.http.get<{ [key: string]: number }>(url);
  }
}



