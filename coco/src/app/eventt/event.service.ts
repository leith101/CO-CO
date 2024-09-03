import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventData } from './event.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  public showEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>('http://localhost:8089/events/showEvents');
  }

  public searchbyplace(placeName: string): Observable<EventData[]> {

    const url = `http://localhost:8089/events/geteventsbyplace/${placeName}`;
    return this.http.get<EventData[]>(url);
}


public searchbytime(date: string): Observable<EventData[]> {

  const url = `http://localhost:8089/events/getEventsByTime/${date}`;
  return this.http.get<EventData[]>(url);
}


}
