import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseURL = 'https://dialogflow.googleapis.com/v2/projects/minou-wblu-416018/agent/sessions/SESSION_ID:detectIntent';
  private token = 'd1d50d4418887a0baf3dcd4ec17f379068ac3247';

  constructor(private http: HttpClient) { }

  sendMessage(message: string) {
    const body = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        }
      }
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token);

    return this.http.post(this.baseURL, body, { headers });
  }
}
