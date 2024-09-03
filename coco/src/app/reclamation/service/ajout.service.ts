import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutService {

  private baseUrl= 'http://localhost:8089';
  private userId = 6
  constructor(private http:HttpClient) { }



  ajoutreclamation(reclamation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reclamation/save`, reclamation);
  }
  ajoutReclamationAssignToUser(reclamation: any, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reclamations/add/${userId}`, reclamation);
}
afficherreclamationbyuser(userId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/reclamation/getByUserId/${userId}`);
}


  modifreclamation(reclamation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reclamation/update`, reclamation);
  }
  afficherreclamation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reclamation/getReclamation`, );
  }
  supprimerReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reclamation/delete/${id}`);
  }
  saveReponseAndAssociateToReclamation(id_reclamation: number, description_reponse: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reclamation/${id_reclamation}/reponse/save`, { description_reponse: description_reponse });
  }  
  updateReclamationState(reclamationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reclamation/${reclamationId}/update`, reclamationId); // Envoyer une requête PUT vide, ou avec des données supplémentaires si nécessaire
  }
}
