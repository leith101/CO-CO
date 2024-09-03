import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8089/product'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  getAsc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asc`);
  }

  addProduct(formData : any): Observable<any> {
   

    return this.http.post<any>(`${this.apiUrl}/`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  count(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count`);
  }
}
