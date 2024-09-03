import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceforumService } from '../../service/serviceforum.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  postForm: FormGroup;
  commentForm: FormGroup;

  constructor(private http: HttpClient, private service: ServiceforumService) {
    this.postForm = new FormGroup({
      description_post: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    });

    this.commentForm = new FormGroup({
      commentaire: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
  }

  submitPost() {
    if (this.postForm.valid) {
      const nouvelleReclamation = {
        descriptionPost: this.postForm.value.description_post, // Assurez-vous que la propriété est correctement liée
      };

      this.service.ajoutpost(nouvelleReclamation).subscribe(
        (response: any) => {
          console.log("Post ajoutée avec succès :", response);
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du post :", error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  
  }
