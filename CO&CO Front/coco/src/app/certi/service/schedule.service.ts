import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = 'http://localhost:8089';


  constructor(private http:HttpClient) { }


  registernewschedule(scheduledata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajouterschedule`, scheduledata);
  }





}
