import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiKey = '2e635719e9mshced2c939d27c97ep1a4cd8jsn752877391ebb'; // Remplacez par votre clé API RapidAPI

  constructor(private http: HttpClient) { }

  translateText(text: string, sourceLang: string, targetLang: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-rapidapi-key', this.apiKey) // Nom du header et sa valeur
      .set('x-rapidapi-host', 'google-translate1.p.rapidapi.com'); // Nom du header et sa valeur

    const params = new HttpParams()
      .set('text', text)
      .set('source', sourceLang)
      .set('target', targetLang);

    // Modifiez l'URL en fonction de l'API de traduction que vous utilisez
    const apiUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect'; // Remplacez par l'URL de l'API Translate

    return this.http.get(apiUrl, { headers, params });
  }
}
