import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap , throwError} from 'rxjs';
//import { AnnonceColoc } from './annonce-coloc';
import { ServiceService } from '../login/services/service.service';
import { catchError,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AnnonceColocService {
  private baseUrl = "http://localhost:8089/api/annonces";

  constructor(private httpClient: HttpClient,
    private service:ServiceService) { }

    createAnnonce(annonce: any, userId: number): Observable<any> {
      return this.httpClient.post<any>(`${this.baseUrl}/ajout?id=${userId}`, annonce);
    }

  getAnnonceColocsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`);
  }

  createAnnonceWithImage(annonceColoc: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    
    // Vérifier si l'image est définie avant de l'ajouter à FormData
    if (annonceColoc.image) {
      formData.append('image', imageFile);
    }
    
    // Ajouter d'autres champs de l'annonce à FormData
    formData.append('titre', annonceColoc.titre || '');
    formData.append('description', annonceColoc.description || '');
    formData.append('prix', annonceColoc.prix?.toString() || ''); // Utilisation de l'opérateur de navigation sécurisée '?'
    
    // Envoyer la requête POST avec l'objet FormData
    return this.httpClient.post(`${this.baseUrl}`, formData);
  }
  
  getAnnonceColocById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }
   // Méthode pour récupérer les annonces d'un utilisateur spécifique par son ID
   getAnnoncesUtilisateurConnecte(): Observable<any[]> {
    const userId = this.service.getLoggedInUserId(); // Obtenez l'ID de l'utilisateur connecté

    if (!userId) {
      throw new Error('User ID not found'); // Gérer le cas où l'ID de l'utilisateur n'est pas trouvé
    }

    return this.httpClient.get<any[]>(`${this.baseUrl}/userannonces/${userId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des annonces de l\'utilisateur:', error);
        throw error;
      })
    );
  }
  getAnnoncesTrieParVues(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`).pipe(
      map(annonces => annonces.sort((a, b) => b.nombreVues - a.nombreVues)), // Trie les annonces par nombre de vues décroissant
      catchError(error => {
        console.error('Erreur lors de la récupération des annonces triées par nombre de vues:', error);
        throw error;
      })
    );
  }




  retreiveAnnoncefromReservation(reservationid: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getannoncebyreservation/${reservationid}`);
  }



  retreiveUserFromAnnonce(annoceid: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/afficheruserbyannonce/${annoceid}`);
  }

   // Méthode pour effectuer une recherche d'annonces par terme de recherche
   searchAnnonces(query: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/search?query=${query}`);
  }
  // Méthode pour mettre à jour une annonce de colocation
  updateAnnonce(id: number, annonceColoc: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, annonceColoc);
  }
  deleteAnnonce(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
  getAnnoncesSelonPreferences(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/preferences/${userId}`);
  }
  getReservationPercentageByAnnonce(): Observable<Map<number, number>> {
    return this.httpClient.get<Map<number, number>>(`${this.baseUrl}/stats/reservationPercentage`);
  }
 
} 




