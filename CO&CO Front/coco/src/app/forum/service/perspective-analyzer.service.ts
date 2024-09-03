import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveAnalyzerService {
  private apiUrl = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyC1ZJXMsEPSPvCWNlx5Ze-RGJVcIe_qYOI';

  constructor(private http: HttpClient) { }

  analyzeComment(commentText: string): Observable<any> {
    const requestBody = {
      comment: { text: commentText },
      requestedAttributes: { TOXICITY: {} }
    };
    return this.http.post(this.apiUrl, requestBody);
  }
}