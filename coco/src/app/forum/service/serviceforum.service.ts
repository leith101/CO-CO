import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceforumService {
  private baseUrl = 'http://localhost:8089';
  
  constructor(private http: HttpClient) { }
  

  // Méthode pour ajouter un post
  ajoutpost(post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/create`, post);
  }

  // Méthode pour afficher les posts
  afficherpost(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  // Méthode pour afficher les commentaires
  affichercomment(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  // Méthode pour ajouter un commentaire à un post
  ajouterCommentaireAUnePublication(idPost: number, description_comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/${idPost}/commentpost`, { description_comment: description_comment });
  }

  // Méthode pour afficher les commentaires par post
  afficherCommentParPost(idPost: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/byPost/${idPost}`);
  }

  // Méthode pour ajouter un post par utilisateur
  ajouterPostParUtilisateur(userId: number, post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/users/${userId}`, post);
  }

  // Méthode pour supprimer un like du post
  supprimerLikeDuPost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${postId}/like`);
  }

  // Méthode pour attribuer un like au post
  attribuerLike(postId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/like?postId=${postId}&userId=${userId}`;
    return this.http.post(url, {});
  }

  // Méthode pour attribuer un dislike au post
  attribuerDislike(postId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/dislike?postId=${postId}&userId=${userId}`;
    return this.http.post(url, {});
  }

  // Méthode pour attribuer un haha au post
  attribuerHaha(postId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/haha?postId=${postId}&userId=${userId}`;
    return this.http.post(url, {});
  }

  // Méthode pour attribuer un love au post
  attribuerLove(postId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/love?postId=${postId}&userId=${userId}`;
    return this.http.post(url, {});
  }
  utilisateurAAttribueReac(postId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check?postId=${postId}&userId=${userId}`);
  }
  getTypeReaction(postId: number, userId: number): Observable<'like' | 'dislike' | 'haha' | 'love'> {
    return this.http.get<'like' | 'dislike' | 'haha' | 'love'>(
      `${this.baseUrl}/type-reaction?postId=${postId}&userId=${userId}`
    );
  }
  countReactionsForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}/reactions/count`);
  }
  countTotalReactionsForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}/count`);
  }
  analyzeComment(commentText: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/analyze-comment`, { commentText });
  }
  getTotalNumberOfPosts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/posts/total`);
  }
  supprimerPost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/delete/${id}`);
  }
  getAveragePostsPerUser(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/posts/average-posts-per-user`);
  }
  getTotalReactionsForPosts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/posts/total`);
  }
  getPostWithMostReactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/most-reacted`);
  }
  
}  