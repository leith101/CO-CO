import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TinderService } from '../tinder.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-backofficetinder',
  templateUrl: './backofficetinder.component.html',
  styleUrls: ['./backofficetinder.component.css']
})
export class BackofficetinderComponent implements OnInit, AfterViewInit {
  genderPercentages: number[] = [];
  totalLikes: number = 0;
  totalMatches: number = 0; 
  percentageOfUsersWhoLikedOrDisliked: number = 0;
  genderCount: Map<string, number> = new Map();
  matchsWithUserInfo: any[] = [];

  constructor(private tinderService: TinderService) { }

  ngOnInit(): void {
    this.getMatchsWithUserInfo();
    // Appeler la méthode pour récupérer les pourcentages des matchs par genre
    this.tinderService.getMatchGenderPercentages().subscribe(
      (percentages) => {
        // Stocker les pourcentages dans une variable
        this.genderPercentages = percentages;
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération des pourcentages des matchs par genre', error);
      }
    );
    this.tinderService.countGender().subscribe(
      (genderCount) => {
        // Stocker les données dans une variable
        this.genderCount = genderCount;
        console.log(this.genderCount);
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération du nombre total d\'hommes et de femmes', error);
      }
    );
    this.tinderService.getTotalLikes().subscribe(
      (total) => {
        // Stocker le nombre total de likes dans la variable
        this.totalLikes = total;
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération du nombre total de likes', error);
      }
    );
    this.tinderService.getTotalMatchCount().subscribe(
      (count) => {
        // Stocker le nombre total de matchs dans la variable
        this.totalMatches = count;
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération du nombre total de matchs', error);
      }
    );
    this.tinderService.getPercentageOfUsersWhoLikedOrDisliked().subscribe(
      (percentage) => {
        // Stocker le pourcentage des utilisateurs qui ont aimé ou désaimé dans la variable
        this.percentageOfUsersWhoLikedOrDisliked = percentage;
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération du pourcentage des utilisateurs qui ont aimé ou désaimé', error);
      }
    );
  }
  
  ngAfterViewInit(): void {
    // Une fois que la vue est initialisée, dessinez le graphique
    this.drawChart();
  }
  getMatchsWithUserInfo(): void {
    this.tinderService.getMatchsWithUserInfo().subscribe(
      (matches) => {
        this.matchsWithUserInfo = matches;
        console.log(this.matchsWithUserInfo); // Vérifiez la console pour vous assurer que les données sont récupérées correctement
      },
      (error) => {
        console.error('Erreur lors de la récupération des matchs avec les informations des utilisateurs', error);
      }
    );
  }
  deleteMatch(matchId: string): void {
    // Appelez la méthode de service pour supprimer le match avec l'ID correspondant
    this.tinderService.deletematch(Number(matchId)).subscribe(
      () => {
        // Suppression réussie, actualisez la liste des matchs
        this.getMatchsWithUserInfo();
        // Appelez à nouveau la méthode pour récupérer les pourcentages des matchs par genre
        this.tinderService.getMatchGenderPercentages().subscribe(
          (percentages) => {
            // Stocker les nouveaux pourcentages dans une variable
            this.genderPercentages = percentages;
            // Redessinez le graphique avec les nouveaux pourcentages
            this.drawChart();
          },
          (error) => {
            // Gérer les erreurs ici
            console.error('Erreur lors de la récupération des pourcentages des matchs par genre', error);
          }
        );
        // Affichez un message de confirmation ou effectuez d'autres actions si nécessaire
        console.log('Match supprimé avec succès.');
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la suppression du match', error);
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
  
  drawChart(): void {
    const ctx = document.getElementById('genderDonutChart') as HTMLCanvasElement;
  
    // Vérifiez s'il existe déjà une instance de Chart.js attachée au canevas
    if (Chart.getChart(ctx)) {
      // Si oui, détruisez l'instance existante
      Chart.getChart(ctx)?.destroy();
    }
  
    // Créez une nouvelle instance de Chart.js
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Homme-Homme', 'Femme-Femme', 'Homme-Femme'],
        datasets: [{
          label: 'Pourcentage des matchs par genre',
          data: this.genderPercentages,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '70%', // Pourcentage de coupure pour créer le trou au milieu (70% crée un petit trou)
        plugins: {
          legend: {
            position: 'right', // Position de la légende
          },
          title: {
            display: true,
            text: 'Pourcentage des matchs par genre' // Titre du graphique
          }
        }
      }
    });
  }
  
}
