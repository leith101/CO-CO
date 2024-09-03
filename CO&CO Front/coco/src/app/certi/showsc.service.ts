import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from './schedule/schedule.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowscService {

  private baseUrl = 'http://localhost:8089/schedules'

  constructor(private http: HttpClient) { }

 public getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>('http://localhost:8089/schedules/getallschedules');
  }

  public deleteScheduleById(scheduleId: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${scheduleId}`;
    return this.http.delete<void>(url);
  }


  public getScheduleByArea(area: string): Observable<Schedule[]> {
    const url = `${this.baseUrl}/area/${area}`;
    return this.http.get<Schedule[]>(url);
  }


}
