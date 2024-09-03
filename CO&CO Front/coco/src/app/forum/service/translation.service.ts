import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  translateText(text: string, sourceLang: string, targetLang: string) {
    const url = 'https://google-translator9.p.rapidapi.com/v2';
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-RapidAPI-Key', '6568953ff4msh241c68ad78f9940p17a591jsnb05f4fd35176')
      .set('X-RapidAPI-Host', 'google-translator9.p.rapidapi.com');

    const body = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    };

    return this.http.post(url, body, { headers });
  }
}
