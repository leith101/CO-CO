import { TranslationService } from './../../service/translation.service';
import { Component, OnInit } from '@angular/core';
import { ServiceforumService } from '../../service/serviceforum.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentAnalysis } from '../../../shared/model/analyse.comment';
import swal from 'sweetalert2';
@Component({
  selector: 'app-afficherpost',
  templateUrl: './afficherpost.component.html',
  styleUrls: ['./afficherpost.component.css']
})
export class AfficherpostComponent implements OnInit {
  posts: any[] = [];
  translatedText: string='';

  postForm: FormGroup;
  CommentForm: FormGroup;
  comments: any = {}; // Utilisation d'un objet pour stocker les commentaires associés à chaque post
  selectedPostId: number | null = null;
  userId: number = 8;
  toxicityThreshold: number = 0.008;
  toxicityResult: any = null;
  
  translatedPosts: any[] = [];
  selectedLanguage: string = 'fr';
  translatedComments: any[] = [];

  constructor(private http: HttpClient, private service: ServiceforumService, private formBuilder: FormBuilder,private translationService: TranslationService) {
    this.postForm = this.formBuilder.group({
      descriptionPost: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });
    this.CommentForm = this.formBuilder.group({
      description_comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      postId: Number
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.service.afficherpost().subscribe((posts: any[]) => {
      console.log(posts);
      this.posts = posts;
      this.translatePosts(); // Appeler la méthode pour traduire les posts
      this.posts.forEach(post => {
        this.countTotalReactions(post.idPost); // Appeler la méthode pour chaque post
      });
    });
  }
  switchLanguage(): void {
    // Réexécuter la traduction des posts
    this.translatePosts();
    // Réexécuter la traduction des commentaires pour chaque post
    this.posts.forEach(post => {
      this.translateComments(post.idPost);
    });
  }
  getTranslatedPostDescription(post: any): string {
    // Recherchez la description traduite du post dans le tableau translatedPosts
    const translatedPost = this.translatedPosts.find(tp => tp.idPost === post.idPost);
    // Si une description traduite est trouvée, retournez-la, sinon, retournez la description d'origine
    return translatedPost ? translatedPost.descriptionPost : (post.descriptionPost ? post.descriptionPost : 'Description non disponible');
}
  translatePosts(): void {
    this.translatedPosts = []; // Réinitialiser le tableau des posts traduits
    this.posts.forEach(post => {
      this.translationService.translateText(post.descriptionPost, 'en', this.selectedLanguage).subscribe((response: any) => {
        const translatedPost = {
          idPost: post.idPost,
          descriptionPost: response.data.translations[0].translatedText
        };
        this.translatedPosts.push(translatedPost); // Ajouter le post traduit au tableau
      });
    });
  }
  
  countTotalReactions(postId: number): void {
    this.service.countTotalReactionsForPost(postId).subscribe(
      (count: number) => {
        const postIndex = this.posts.findIndex(post => post.idPost === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].totalReactions = count; // Stocker le nombre total de réactions dans l'objet post
        }
      },
      (error: any) => {
        console.error("Error counting total reactions:", error);
      }
    );
  }

  ajouterLikeAuPost(postId: number, userId: number): void {
    this.service.attribuerLike(postId, userId)
      .subscribe(
        (response: any) => {
          // Mettre à jour la liste des posts après l'ajout du like
          this.getPosts();
          // Vérifier si la réponse est une chaîne de caractères (probablement un message de succès)
          if (typeof response === 'string') {
            // Afficher la réponse dans la console ou dans une notification
            console.log(response);
            // Afficher une notification de succès
            swal.fire({
              title: 'Success',
              text: response,
              icon: 'success'
            });
          }
        },
        (error: any) => {
          this.countTotalReactions(postId);
          // Afficher une notification d'erreur
          swal.fire({
            title: 'Like',
            icon: 'success'
          });
        }
      );
}
getCommentsForPost(postId: number): void {
  this.service.afficherCommentParPost(postId).subscribe((comments: any[]) => {
    this.comments[postId] = comments;
    this.translateComments(postId);
  });
}

translateComments(postId: number): void {
  const commentsForPost: any[] = this.comments[postId];
  this.translatedComments[postId] = [];
  commentsForPost.forEach((comment: any) => {
    this.translationService.translateText(comment.description_comment, 'en', this.selectedLanguage).subscribe((response: any) => {
      const translatedComment = {
        idComment: comment.idComment,
        description_comment: response.data.translations[0].translatedText
      };
      this.translatedComments[postId].push(translatedComment);
    });
  });
}


  ajouterDislikeAuPost(postId: number, userId: number): void {
    this.service.attribuerDislike(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du dislike
          this.getPosts();
          swal.fire({
            title: 'Dislike',
           
            icon: 'success'
          });
        },
        (error: any) => {
          swal.fire({
            title: 'Dislike',
            
            icon: 'success'
          });
        }
      );
  }

  ajouterHahaAuPost(postId: number, userId: number): void {
    this.service.attribuerHaha(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du haha
          this.getPosts();
        },
        (error: any) => {
          this.countTotalReactions(postId);

          swal.fire({
            title: 'Haha',
            
            icon: 'success'
          });
        }
      );
  }

  ajouterLoveAuPost(postId: number, userId: number): void {
    this.service.attribuerLove(postId, userId)
      .subscribe(
        () => {
          // Mettre à jour la liste des posts après l'ajout du love
          this.getPosts();
        },
        (error: any) => {
          this.countTotalReactions(postId);

          
          swal.fire({
            title: 'Love',
            
            icon: 'success'
          });
        }
      );
  }

  submitPost(): void {
    if (this.postForm.valid) {
      const nouveauPost = {
        descriptionPost: this.postForm.value.descriptionPost
      };

      this.service.ajouterPostParUtilisateur(9, nouveauPost).subscribe(
        (response: any) => {
          console.log("Post ajouté avec succès :", response);
          swal.fire({
            title: 'Success!',
            text: 'Post Added Successfully.',
            icon: 'success'
          });
          // Réinitialiser la liste des posts après l'ajout
          this.getPosts();
          // Réinitialiser le formulaire
          this.postForm.reset();
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du post :", error);
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }

  afficherFormulaireCommentaire(postId: number): void {
    if (this.selectedPostId === postId) {
      this.selectedPostId = null;
    } else {
      this.selectedPostId = postId;
      this.afficherCommentaires(postId);
      // Traduire les commentaires lorsque le formulaire est affiché
      
    }
    console.log('ID du post sélectionné :', this.selectedPostId);
  }

  afficherCommentaires(postId: number): void {
    this.service.afficherCommentParPost(postId)
      .subscribe((comments: any[]) => {
        console.log(comments);
        this.comments[postId] = comments;
        this.translateComments(postId); // Stocker les commentaires associés au post sélectionné
      });
  }

  hideComments(postId: number): void {
    // Supprimer les commentaires associés au post sélectionné
    delete this.comments[postId];
  }

  submitComment(postId: number): void {
    if (this.CommentForm.valid) {
      const description_comment = this.CommentForm.value.description_comment;

      this.service.ajouterCommentaireAUnePublication(postId, description_comment).subscribe(
        (response: any) => {
          console.log("Commentaire ajouté avec succès :", response);
          this.afficherCommentaires(postId);

          // Afficher une notification de succès
          swal.fire({
            title: 'Succès!',
            text: 'Commentaire ajouté avec succès.',
            icon: 'success'
          });
        },
        (error: any) => {
          if (error.status != 200)
          
            console.error("Erreur lors de l'ajout du commentaire :", error);
            this.afficherCommentaires(postId);
          this.analyzeCommentToxicity(this.userId, description_comment, postId);

          // Afficher une notification d'erreur en cas d'échec
          swal.fire({
            title: 'Success!',
            text: 'Comment Added Successfully.',
            icon: 'success'
          });
        }
      );

    }
}



  analyzeCommentToxicity(userId: number, commentText: string, postId: number): void {
    this.service.analyzeComment(commentText).subscribe(
        (result: any) => {
            console.log("Résultat de l'analyse du commentaire :", result);
            
            // Extraire la valeur de summaryScore
            const summaryScoreValue = result?.attributeScores?.TOXICITY?.summaryScore?.value;
            
            if (summaryScoreValue && summaryScoreValue > 0.2) {
                swal.fire({
                    title: 'Warning',
                    text: 'Your Comment is toxic',
                    icon: 'warning'
                });
            }
        },
        (error: any) => {
            console.error("Erreur lors de l'analyse du commentaire :", error);
        }
    );
}
}