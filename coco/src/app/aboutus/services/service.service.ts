import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) { }

  getCountBanned(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/banned/count`);
  }

  getCountAll(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/all`);
  }

}
