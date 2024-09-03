import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private baseUrl = 'http://localhost:8089';
    constructor(private http:HttpClient) { }


    afficherannonce(): Observable<any> {
      return this.http.get(`${this.baseUrl}/annonces/retrieve-all-annonces`);
    }
    afficherannoncess(): Observable<any> {
      return this.http.get(`${this.baseUrl}/annonces/recent`);
    }

    affichercomment(): Observable<any> {
      return this.http.get(`${this.baseUrl}/commentaires/all`);
    }

    affichervoitures(): Observable<any> {
      return this.http.get(`${this.baseUrl}/voitures/all-cars`);
    }

    afficherreservation(): Observable<any> {
      return this.http.get(`${this.baseUrl}/reservations/retrieve-all-reservations`)
        .pipe(
          catchError(error => {
            console.error('Error fetching reservations:', error);
            return throwError('An error occurred while fetching  reservations.');
          })
        );}
                  
    getAnnonceById(ida: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/annonces/retrieve-annonce/${ida}`);
    }
    getVoitureById(idv: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/voitures/${idv}`);
    }
   

    registerVoiture(voiture: any):Observable<any> {
      const{userId}=voiture;
      return this.http.post(`${this.baseUrl}/voitures/add-voiture/${userId}`, voiture);
    }
    registerAnnonce(annonce: any):Observable<any> {
      const{userId}=annonce;
      const{matricule}=annonce;
      return this.http.post(`${this.baseUrl}/voitures/add/${userId}/${matricule}`, annonce);
    }

    afficherannonces(userId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/annonces/user/${userId}`)
        .pipe(
          catchError(error => {
            console.error('Error fetching user annonces:', error);
            return throwError('An error occurred while fetching user annonces.');
          })
        );}
        
    

    getVoitureByMatricule(matricule: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/voitures/matricule/${matricule}`);
    }
    
    affichervoiture(userId: number): Observable<any[]> {
      console.log('Requesting user voitures for user ID:', userId);
      return this.http.get<any[]>(`${this.baseUrl}/voitures/voiture/${userId}`).pipe(
        tap((response: any[]) => {
          console.log('Received user voitures:', response);
        }),
        catchError((error) => {
          console.error('Error fetching user voitures:', error);
          return throwError(error); 
        })
      );
    }
    
  
    registerAnnonceWithCircuitAndUserAndVoiture(formData: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/annonces/add/${formData.userId}/${formData.matricule}`, formData).pipe(
        catchError((error) => {
          console.error('Error adding annonce:', error);
          return throwError(error); 
        })
      );
    }
    getVoitures(userId: number): Observable<string[]> {
      const url = `${this.baseUrl}/voitures/voiture/${userId}`;
      return this.http.get<string[]>(url);    }

      getVoiture(userId: number): Observable<string[]> {
        const url = `${this.baseUrl}/voitures/user/${userId}`;
        return this.http.get<string[]>(url);    }

      addComment(annonceCovId: number, userId: number, commentText: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/commentaires/add/${userId}/${annonceCovId}`, { comments: commentText })
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while adding comment:', error);
              return throwError('Failed to add comment.');
            })
          );
      }

      getCommentsByAnnonce(annonceCovId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/commentaires/annonce/${annonceCovId}`);
      }

      getComments(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/commentaires/all}`);
      }

      likeComment(idco: number, userId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/commentaires/like/${idco}/${userId}`, {})
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while liking comment:', error);
              return throwError('Failed to like comment.');
            })
          );
      }
    
      dislikeComment(idco: number, userId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/commentaires/dislike/${idco}/${userId}`, {})
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while disliking comment:', error);
              return throwError('Failed to dislike comment.');
            })
          );
      }
    
    
      
      getLikesForComment(idco: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/commentaires/${idco}/likes`);
      }
      
      getDislikesForComment(idco: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/commentaires/${idco}/dislikes`);
      }
      
    
      replyToComment(parentCommentId: number, replyComment: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/commentaires/${parentCommentId}/reply`, replyComment);
      }

      getUserVoitureByMatricule(userId: number, matricule: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/voitures/${userId}/${matricule}`);
      }
    
      addAnnonceCov(userId: number, matricule: string, formData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/annonces/add/${userId}/${matricule}`, formData);
      }

      deleteCommentByUserIdAndIdco(userId: number, idco: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/commentaires/delete/${userId}/${idco}`)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while deleting comment:', error);
              return throwError('Failed to delete comment.');
            })
          );
      }



      deleteLikeForComment(idco: number, userId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/commentaires/${idco}/likes/${userId}`)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while deleting like for comment:', error);
              return throwError('Failed to delete like for comment.');
            })
          );
      }
      
      deleteDislikeForComment(idco: number, userId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/commentaires/${idco}/dislikes/${userId}`)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while deleting dislike for comment:', error);
              return throwError('Failed to delete dislike for comment.');
            })
          );
      }

      
      makeReservation(ida: number, userId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/reservations/make-reservation/${ida}/${userId}`, {})
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('An error occurred while making reservation:', error);
              return throwError('Failed to make reservation.');
            })
          );
      }
      
      afficherreservations(userId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/reservations/${userId}`)
          .pipe(
            catchError(error => {
              console.error('Error fetching user reservations:', error);
              return throwError('An error occurred while fetching user reservations.');
            })
          );}
       
          afficherReservationOwner(idr: number): Observable<any> {
            return this.http.get(`${this.baseUrl}/reservations/owner-name/${idr}`, { responseType: 'text' }) // Set responseType to 'text'
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  console.error('Error fetching reservation owner:', error);
                  const errorMessage = `Error fetching owner name. Status: ${error.status}, Message: ${error.message}`;
                  return throwError(errorMessage);
                })
              );
          }
          afficherReservationOwnerPhone(idr: number): Observable<any> {
            return this.http.get(`${this.baseUrl}/reservations/owner-phone/${idr}`, { responseType: 'text' }) // Set responseType to 'text'
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  console.error('Error fetching reservation owner:', error);
                  const errorMessage = `Error fetching owner phone. Status: ${error.status}, Message: ${error.message}`;
                  return throwError(errorMessage);
                })
              );
          }
          afficherCommentOwner(idco: number): Observable<any> {
            return this.http.get(`${this.baseUrl}/commentaires/owner-name/${idco}`, { responseType: 'text' })
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  console.error('Error fetching comment owner:', error);
                  const errorMessage = `Error fetching owner name. Status: ${error.status}, Message: ${error.message}`;
                  return throwError(errorMessage);
                })
              );
          }
          
          
        
           

          deleteAnnonce(userId: number, ida: number): Observable<any> {
            return this.http.delete(`${this.baseUrl}/annonces/delete/${userId}/${ida}`)
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  console.error('An error occurred while deleting annonce:', error);
                  return throwError('Failed to delete annonce.');
                })
              );
          }

          deleteReservation(ida: number): Observable<any> {
            return this.http.delete(`${this.baseUrl}/annonces/deleteReservations/${ida}`)
            .pipe(
              catchError((error: any) => {
                  if (error && error.status === 200 && error.error && error.error.includes('less than 48 hours ago')) {
                      return throwError('Cannot delete AnnonceCov because there are reservations made less than 48 hours ago.');
                  } else {
                      console.error('An error occurred while deleting reservations:', error);
                      return throwError('Failed to delete reservations.');
                  }
              })
            );
        }

        removeReservation(idr: number): Observable<any> {
          return this.http.delete(`${this.baseUrl}/reservations/cancel-reservation/${idr}`)
          .pipe(
            catchError((error: any) => {
                if (error && error.status === 200 && error.error && error.error.includes('less than 48 hours ago')) {
                    return throwError('Cannot delete AnnonceCov because there are reservations made less than 48 hours ago.');
                } else {
                    console.error('An error occurred while deleting reservations:', error);
                    return throwError('Failed to delete reservations.');
                }
            })
          );
      }


      removeComment(idco: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/commentaires/delete/${idco}`)
        .pipe(
          catchError((error: any) => {
              if (error && error.status === 200 && error.error && error.error.includes('less than 48 hours ago')) {
                  return throwError('Cannot delete AnnonceCov because there are reservations made less than 48 hours ago.');
              } else {
                  console.error('An error occurred while deleting reservations:', error);
                  return throwError('Failed to delete reservations.');
              }
          })
        );
    }


      removeVoiture(idv: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/voitures/delete-voiture/${idv}`)
        .pipe(
          catchError((error: any) => {
              if (error && error.status === 200 && error.error && error.error.includes('less than 48 hours ago')) {
                  return throwError('Cannot delete voiture b.');
              } else {
                  console.error('An error occurred while deleting :', error);
                  return throwError('Failed to delete .');
              }
          })
        );
    }
      
        
        deleteReservationByUserIdAndIdr(userId: number, idr: number): Observable<any> {
          return this.http.delete<any>(`${this.baseUrl}/reservations/delete/${userId}/${idr}`)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('An error occurred while deleting reservation:', error);
                return throwError('Failed to delete reservation.');
              })
            );
        }

        deleteVoitureByUserIdAndIdv(userId: number, idv: number): Observable<any> {
          return this.http.delete<any>(`${this.baseUrl}/voitures/delete/${userId}/${idv}`)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('An error occurred while deleting voiture:', error);
                return throwError('Failed to delete voiture.');
              })
            );
        }

        deleteVoiture( idv: number): Observable<any> {
          return this.http.delete<any>(`${this.baseUrl}/voitures/delete-voiture/${idv}`)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('An error occurred while deleting voiture:', error);
                return throwError('Failed to delete voiture.');
              })
            );
        }
        getStatistics(): Observable<any> {
          const url = `${this.baseUrl}/annonces/count`; 
          return this.http.get<any>(url).pipe(
            tap(response => console.log('Statistics Response:', response)),
            catchError(error => {
              console.error('Error fetching statistics:', error);
              throw error;
            })
          );
      }

      getStat(): Observable<any> {
        const url = `${this.baseUrl}/annonces/daily-stats`; 
        return this.http.get<any>(url).pipe(
          tap(response => console.log('Statistics Response:', response)),
          catchError(error => {
            console.error('Error fetching statistics:', error);
            throw error;
          })
        );
    }
      getUserNotifications(userId: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.baseUrl}/notifications/user/${userId}`);
      }
    
      markAsRead(notificationId: number): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/notifications/mark-as-read/${notificationId}`, {});
      }

      
    



  updateAnnouncementStatus(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/annonces/updateAnnouncementStatus`);
  }

  removeAnnonce( ida: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/annonces/remove-annonce/${ida}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred while deleting annonce:', error);
          return throwError('Failed to delete annonce.');
        })
      );
  }


  updateAnnonce(ida: number, updatedAnnonceCov: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/annonces/update-annonce/${ida}`, updatedAnnonceCov)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred while updating annonce:', error);
          return throwError('Failed to update annonce.');
        })
      );
  }
  
  updateVoiture(idv: number, updatedvoiture: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/voitures/update-voiture/${idv}`, updatedvoiture)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred while updating voiture:', error);
          return throwError('Failed to update voiture.');
        })
      );
  }

}
