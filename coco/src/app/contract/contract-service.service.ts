import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../login/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:8089/api/contracts';

  constructor(private http: HttpClient) { }

  getAllContracts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getContractById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createContract(contract: any,reservationid:Number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/affectcontract/${reservationid}`, contract);
  }

 
  

  updateContract(id: number, contract: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contract);
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
