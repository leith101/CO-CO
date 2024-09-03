import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8089/api/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getanyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createOrder(any: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, any);
  }

  updateOrder(id: number, any: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, any);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  count(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count`);
  }
}