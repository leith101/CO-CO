import { TinderService } from './../tinder.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tinder',
  templateUrl: './tinder.component.html',
  styleUrls: ['./tinder.component.css']
})

export class TinderComponent {
  profiles: any[] = []; 
  localisation: string = '';
  preference: string = '';
  filteredProfiles: any[] = [];


  constructor(private TinderService: TinderService) { }
  ngOnInit(): void {
    this.getProfilesWithUserNames(); // Utilisation de la méthode getProfilesWithUserNames
  }

 
 

  
  getProfileById(profileId: number) {
    this.TinderService.getProfileById(profileId).subscribe(
      (response) => {
        console.log('Profil récupéré avec succès :', response);
        // Traitez la réponse ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil :', error);
        // Gérez l'erreur ici si nécessaire
      }
    );
  }
  getAllProfiles() {
    this.TinderService.getAllProfiles().subscribe(
      (response) => {
        console.log('Tous les profils récupérés avec succès :', response);
        this.profiles = response; // Assignez la réponse à la variable profiles
      },
      (error) => {
        console.error('Erreur lors de la récupération de tous les profils :', error);
      }
    );
  }
  getProfilesWithUserNames() {
    this.TinderService.getProfilesWithUserNames().subscribe(
      (response) => {
        this.profiles = response;
        this.filteredProfiles = [...this.profiles];
      },
      (error) => {
        console.error('Erreur lors de la récupération des profils avec noms :', error);
      }
    );
  }

  createMatchIfMutualLike(likeDislike: any, userId: number, profilId: number) {
    this.TinderService.createMatchIfMutualLike(likeDislike, userId, profilId).subscribe(
      (response) => {
        Swal.fire('Match créé avec succès', '', 'success');
        // Traitez la réponse ici si nécessaire
      },
      (error) => {
        // Gérez l'erreur ici si nécessaire
      }
    );
  }
  
  filterProfiles() {
    this.filteredProfiles = this.profiles.filter(profile => {
      const localisationMatch = this.localisation ? profile['localisation du profil'].toLowerCase().includes(this.localisation.toLowerCase()) : true;
      const preferenceMatch = this.preference ? profile['prefernce du profil'].toLowerCase().includes(this.preference.toLowerCase()) : true;
      return localisationMatch && preferenceMatch;
    });
  }
  saveLikeDislike(like: boolean, userId: number, profileId: number) {
    // Convertir le booléen en MatchStatus enum
    const matchStatus = like ? 'LIKE' : 'DISLIKE';
    console.log("Profile ID:", profileId); // Vérifiez l'ID du profil
    console.log("Profile:", this.profiles.find(profile => profile['id du profil'] === profileId)); // Vérifiez les données de profil
    console.log("User ID:", userId); // Vérifiez l'ID de l'utilisateur
    
    // Créer l'objet likeDislike à envoyer au service
    const likeDislike = {
      timestamp: new Date(), // Utilisez la date actuelle
      matchStatus: matchStatus,
    };

    // Appelez le service pour vérifier si l'utilisateur a déjà aimé ce profil
    this.TinderService.checkUserLikedProfile(userId, profileId).subscribe(
      (alreadyLiked) => {
        if (alreadyLiked) {
          // L'utilisateur a déjà aimé ce profil, vous pouvez gérer cela ici
          Swal.fire('Vous avez déjà aimé ce profil', '', 'warning');
        } else {
          // L'utilisateur n'a pas encore aimé ce profil, enregistrez le like/dislike
          // Appelez le service pour enregistrer le like ou le dislike
          this.TinderService.saveLikeDislike(likeDislike, userId, profileId).subscribe(
            (response) => {
              // Mettez à jour les profils après l'action de like/dislike
              this.getProfilesWithUserNames();
              // Vérifiez si c'est un like mutuel et créez un match
              this.createMatchIfMutualLike(likeDislike, userId, profileId);
              // Affichez la notification en fonction du résultat
              if (response && response.createdMatch) {
                Swal.fire('Match créé avec succès', '', 'success');
              } else {
                Swal.fire('Like enregistré avec succès', '', 'success');
              }
            },
            (error) => {
              Swal.fire('Erreur lors de l\'enregistrement du like/dislike', error.message, 'error');
            }
          );
        }
      },
      (error) => {
        Swal.fire('Erreur lors de la vérification du like/dislike', error.message, 'error');
      }
    );
  }

  
  
}
