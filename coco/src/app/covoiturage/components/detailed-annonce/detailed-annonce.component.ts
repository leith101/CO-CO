import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detailed-annonce',
  templateUrl: './detailed-annonce.component.html',
  styleUrls: ['./detailed-annonce.component.css']
})
export class DetailedAnnonceComponent implements OnInit {
  annonce: any;
  comments: any[] = [];
  commentText: string = '';
  replyText: string = '';
  loggedInUserId: any;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private userService: ServiceService,
    private cdr: ChangeDetectorRef ,private router: Router

  ) {}

  ngOnInit(): void {
    this.updateAnnouncementStatus();

    this.getAnnonceDetails();
    this.userService.getLoggedInUser().subscribe((user: any) => {
      if (user) {
        this.loggedInUserId = user.id;
      } else {
        console.error('User is not logged in.');
      }
    }, (error) => {
      console.error('Error retrieving logged-in user:', error);
    });
  }

  updateAnnouncementStatus(): void {
    this.annonceService.updateAnnouncementStatus().subscribe(
      (response: string) => {
        console.log('Announcement status updated:', response);
      },
      (error) => {
        console.error('Error updating announcement status:', error);
      }
    );
  }


  getAnnonceDetails(): void {
    const idaString = this.route.snapshot.paramMap.get('ida');
    if (idaString) {
      const ida = +idaString;
      this.annonceService.getAnnonceById(ida).subscribe(
        (annonce: any) => {
          this.annonce = annonce;
          this.fetchComments();
        },
        error => {
          console.error('Error fetching announcement details:', error);
        }
      );
    } else {
      console.error('IDA parameter is null or undefined');
    }
  }

  submitComment(): void {
    this.userService.getLoggedInUser().subscribe(
      (user: any) => {
        const userId = user.id;
        const annonceCovId = this.annonce.ida;
        this.annonceService.addComment(annonceCovId, userId, this.commentText).subscribe(() => {
          this.fetchComments();
          this.commentText = '';
        });
      }
    );

  }



  fetchComments() {
    if (this.annonce && this.annonce.ida) {
      this.annonceService.getCommentsByAnnonce(this.annonce.ida).subscribe((comments: any[]) => {
        const observables = comments.map(comment => {
          return forkJoin([
            this.annonceService.getLikesForComment(comment.idco),
            this.annonceService.getDislikesForComment(comment.idco)
          ]).pipe(
            map(([likes, dislikes]: [number, number]) => { 
              comment.likes = likes;
              comment.dislikes = dislikes;
              return comment;
            })
          );
        });
  
        forkJoin(observables).subscribe((updatedComments: any[]) => { 
          this.comments = updatedComments;
        });
      });
    }
  }
  

  deleteComment(commentUserId: number, idco: number): void {
    this.userService.getLoggedInUser().subscribe(
      (loggedInUser: any) => {
        if (loggedInUser) {
          const userId = loggedInUser.id;
          this.annonceService.deleteCommentByUserIdAndIdco(userId, idco).subscribe(
            (response) => {
              console.log('Delete comment response:', response);
              this.comments = this.comments.filter(comment => comment.idco !== idco);
            },
            (error) => {
              console.error('Error deleting comment:', error);
            }
          );
        } else {
          console.error('User is not logged in.');
        }
      },
      (error) => {
        console.error('Error retrieving logged-in user:', error);
      }
    );
  }
  
  isCommentOwner(commentUserId: number): boolean {
    return this.loggedInUserId === commentUserId;
  }

  likeComments(idco: number): void {
    this.userService.getLoggedInUser().subscribe((user: any) => {
      const userId = user.id;
      this.annonceService.likeComment(idco, userId).subscribe(() => {
        this.updateLikesDislikes(idco);
      }, (error) => {
        console.error('Error liking comment:', error);
      });
    }, (error) => {
      console.error('Error retrieving user information:', error);
    });
  }
  
  dislikeComments(idco: number): void {
    this.userService.getLoggedInUser().subscribe((user: any) => {
      const userId = user.id;
      this.annonceService.dislikeComment(idco, userId).subscribe(() => {
        this.updateLikesDislikes(idco);
      }, (error) => {
        console.error('Error disliking comment:', error);
      });
    }, (error) => {
      console.error('Error retrieving user information:', error);
    });
  }
  
  updateLikesDislikes(idco: number): void {
    this.annonceService.getLikesForComment(idco).subscribe((likes: number) => {
      const index = this.comments.findIndex(comment => comment.idco === idco);
      if (index !== -1) {
        this.comments[index].likes = likes;
      }
    });
  
    this.annonceService.getDislikesForComment(idco).subscribe((dislikes: number) => {
      const index = this.comments.findIndex(comment => comment.idco === idco);
      if (index !== -1) {
        this.comments[index].dislikes = dislikes;
      }
    });
  }
  

  
  
  replyToComment(parentCommentId: number, replyText: string): void {
    this.userService.getLoggedInUser().subscribe((user: any) => {
      const replyComment: any = {
        comments: replyText,
        user: user
      };
      this.annonceService.replyToComment(parentCommentId, replyComment).subscribe((savedReply: any) => {
        console.log('Reply added successfully:', savedReply);
        this.fetchComments();
      }, error => {
        console.error('Error adding reply:', error);
      });
    });
  }

/*  deleteLikeForComment(idco: number): void {
    this.userService.getLoggedInUser().subscribe((user: any) => {
      const userId = user.id;
      this.annonceService.deleteLikeForComment(idco, userId).subscribe(() => {
        this.updateLikesDislikes(idco);
      }, (error) => {
        console.error('Error deleting like:', error);
      });
    }, (error) => {
      console.error('Error retrieving user information:', error);
    });
  }

  deleteDislikeForComment(idco: number): void {
    this.userService.getLoggedInUser().subscribe((user: any) => {
      const userId = user.id;
      this.annonceService.deleteDislikeForComment(idco, userId).subscribe(() => {
        this.updateLikesDislikes(idco);
      }, (error) => {
        console.error('Error deleting dislike:', error);
      });
    }, (error) => {
      console.error('Error retrieving user information:', error);
    });
  }

  */


  reserve(): void {
    this.userService.getLoggedInUser().subscribe(
      (user: any) => {
        const userId = user.id;
        const annonceId = this.annonce.ida;
        this.annonceService.makeReservation(annonceId, userId).subscribe(() => {
          console.log('Reservation successful.');
          alert("reservation added successfully");
          this.router.navigateByUrl('/mesReservations');
        }, (error) => {
          console.error('Error making reservation:', error);
        });
      },
      (error) => {
        console.error('Error retrieving user information:', error);
      }
    );
  }
  


}
