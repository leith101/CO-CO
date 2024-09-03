import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './ticket.component'; // Assuming you have a Ticket model

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  generateTicket(ticketDetails: any): Observable<Ticket> {
    // Assuming you have a backend endpoint for generating tickets
    return this.http.post<Ticket>('http://localhost:8089/tickets/ajouterTicket', ticketDetails);
  }
}
