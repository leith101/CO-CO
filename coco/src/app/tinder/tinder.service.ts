import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinderService {
  private baseUrl= 'http://localhost:8089';
  
  constructor(private http:HttpClient) { }

  createMatchIfMutualLike(likeDislike: any, userId: number, profilId: number): Observable<any> {
  // Envoyer l'objet likeDislike ainsi que les IDs d'utilisateur et de profil dans le corps de la requête POST
  return this.http.post(`${this.baseUrl}/api/matches/createMatchIfMutualLike/${userId}/${profilId}`, likeDislike);
}


  saveLikeDislike(likeDislike: any, userId: number, profilId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/likedislikes/${userId}/${profilId}`, likeDislike);
  }
  getProfileById(profileId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profiles/${profileId}`);
  }

  getAllProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles`);
  }
  deletematch(matchid: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/matches/${matchid}`);
  }

  deleteProfile(profileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/profiles/${profileId}`);
  }
  getUserPreferences(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getPreferences/${userId}`);
  }
  getProfilesWithUserNames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles/names`);
  }
  createProfile(formData: FormData): Observable<any> {
    return this.http.post<any>(`localhost:8089/profiles`, formData);
  }
  checkUserLikedProfile(userId: number, profileId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/likedislikes/check/${userId}/${profileId}`);
  }
  getMatchGenderPercentages(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/api/matches/statistics/gender-percentages`);
  }
  getTotalLikes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/likedislikes/totalLikes`);
  }
  getTotalMatchCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/matches/count`);
  }
  getPercentageOfUsersWhoLikedOrDisliked(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/likedislikes/percentage`);
  }
  countGender(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/profiles/count-gender`);
  }
  getMatchsWithUserInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/matches/withUserInfo`);
  }
 
}
