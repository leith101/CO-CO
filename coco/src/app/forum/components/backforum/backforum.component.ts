import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceforumService } from '../../service/serviceforum.service';  

@Component({
  selector: 'app-backforum',
  templateUrl: './backforum.component.html',
  styleUrls: ['./backforum.component.css'] // Changement de styleUrl à styleUrls
})
export class BackforumComponent implements OnInit {
  posts: any[] = []; // Déclaration de la propriété posts
  totalNumberOfPosts:  number = 0;
  averagePostsPerUser: number = 0;
  totalReactions: number = 0;
  postWithMostReactions: any;

  constructor(private http: HttpClient, private service: ServiceforumService) { } // Fermeture correcte du constructeur

  ngOnInit(): void {
    this.getPosts();
    this.getAveragePostsPerUser();
    this.getTotalReactionsForPosts();
    this.getPostWithMostReactions(); 
    
  }

  getPosts(): void {
    this.service.afficherpost().subscribe((posts: any[]) => {
      console.log(posts);
      this.posts = posts;
      // this.translatePosts(); // Appeler la méthode pour traduire les posts (à définir)
      this.posts.forEach(post => {
        // this.countTotalReactions(post.idPost); // Appeler la méthode pour chaque post (à définir)
      });
    });
    this.service.getTotalNumberOfPosts().subscribe(total => {
      this.totalNumberOfPosts = total;
    });
  }
  supprimerPost(id: number): void {
    this.service.supprimerPost(id)
      .subscribe(
        () => {
          console.log('Post supprimé avec succès');
          this.getPosts();
          // Ajoutez ici d'autres actions à effectuer après la suppression du post
        },
        error => {
          console.error('Erreur lors de la suppression du post : ', error);
          // Gérez l'erreur comme vous le souhaitez
        }
      );
  }
  getTotalReactionsForPosts(): void {
    // Appel de la méthode pour récupérer le nombre total de réactions sur les posts
    this.service.getTotalReactionsForPosts().subscribe(totalReactions => {
      console.log(totalReactions)
      this.totalReactions = totalReactions;
    });
  }
  getAveragePostsPerUser(): void {
    this.service.getAveragePostsPerUser().subscribe(average => {
      this.averagePostsPerUser = average;
    });
  }
  getPostWithMostReactions(): void {
    // Appel de la méthode pour récupérer le post avec le plus de réactions
    this.service.getPostWithMostReactions().subscribe(
      post => {
        // Affichage des détails du post dans la console
        console.log('Post avec le plus de réactions :', post);
        // Affectation du post à la propriété postWithMostReactions
        this.postWithMostReactions = post;
      },
      error => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération du post avec le plus de réactions :', error);
      }
    );
  }
  

  filterTable() {
    const filter = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const rows = document.querySelectorAll('table tr');
    for (let i = 1; i < rows.length; i++) {
      const cols = (rows[i] as HTMLElement).querySelectorAll('td');
      let visible = false;
      for (let j = 0; j < cols.length; j++) {
        const cell = cols[j];
        if ((cell as HTMLElement).innerText.toUpperCase().indexOf(filter) > -1) {
          visible = true;
          break;
        }
      }
      (rows[i] as HTMLElement).style.display = visible ? '' : 'none';
    }
  }
}
