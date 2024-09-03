// mailgun.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailgunService {

  private apiKey = '452a5c9a6b62548c136f5137a7af146f-4c205c86-dfa37af3';
  private domain = 'sandboxb81730416dd14e62a64f712bd1b918fb.mailgun.org';
  private mailgunUrl = `https://api.mailgun.net/v3/${this.domain}/messages`;

  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`api:${this.apiKey}`)}`
    });

    return this.http.post(this.mailgunUrl, data, { headers });
  }
}
