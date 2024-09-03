import { Component, OnInit } from '@angular/core';
import { BackServiceService } from '../../services/back-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  connectedUsers: any[] = []; 
  utilisateursRecents: any[]=[];
    bannedCount: number;
  allUsers: number;

  constructor(private service:BackServiceService) {
    this.bannedCount = 0;
    this.allUsers = 0; // Initializing with a default value
  }
  
status = false;
addToggle()
{
  this.status = !this.status;       
}


ngOnInit(): void {
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keyup', this.filterTable);
    }
  });
  this.fetchUtilisateursRecents();
  this.getBannedCount();
  this.getAll();

  this.service.getConnectedUsers().subscribe((users) => {
    this.connectedUsers = users;
  });
}

banUser(user: any): void {
  // Mettre à jour la liste connectedUsers immédiatement avant d'appeler le service
  this.connectedUsers = this.connectedUsers.map(u => {
    if (u === user) {
      // Mettre à jour le statut de l'utilisateur à true (banni)
      u.banned = true;
    }
    return u;
  });

  this.service.banUserByEmail(user.email).subscribe(response => {
    // Gérer la réponse du serveur ici
    console.log(response);
    // Mettre à jour le compteur bannedCount si nécessaire
    this.bannedCount++;
  });
}


banUserTemp(user: any): void {
  // Mettre à jour la liste connectedUsers immédiatement avant d'appeler le service
  this.connectedUsers = this.connectedUsers.map(u => {
    if (u === user) {
      // Mettre à jour le statut de l'utilisateur à true (banni)
      u.banned = true;
    }
    return u;
  });

  this.service.banTemp(user.email).subscribe(response => {
    // Gérer la réponse du serveur ici
    console.log(response);
    // Mettre à jour le compteur bannedCount si nécessaire
    this.bannedCount++;
  });
}


supprimerUtilisateur(email: string): void {
  Swal.fire({
    title: "Êtes-vous sûr(e) ?",
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprimer !"
  }).then((result) => {
    if (result.isConfirmed) {
      // Mettre à jour la liste connectedUsers immédiatement avant d'appeler le service
      this.connectedUsers = this.connectedUsers.filter(u => u.email !== email);

      this.service.supprimerUtilisateurParEmail(email).subscribe(response => {
        console.log(response);
        // Gérer la réponse du serveur ici
        Swal.fire({
          title: "Supprimé !",
          text: "Votre fichier a été supprimé.",
          icon: "success"
        });
      }, error => {
        console.error(error); // Gérer les erreurs ici
      });
    }
  });
}

getBannedCount(): void {
  this.service.getCountBanned()
    .subscribe(count => {
      this.bannedCount = count;
    });
}

getAll(): void {
  this.service.getCountAll()
    .subscribe(count => {
      this.allUsers = count;
    });
}

refresh(): void {
  this.service.getConnectedUsers()
    
}

calculateRotation(bannedCount: number, allUsers: number): number {
  // If there are no users, return 0 degrees to avoid division by zero
  if (allUsers === 0) {
    return 0;
  }
  
  // Calculate the rotation angle based on the ratio of bannedCount to allUsers
  return (bannedCount / allUsers) * 360;
}

fetchUtilisateursRecents() {
  this.service.getUtilisateursRecents().subscribe(
    (data: any[]) => {
      this.utilisateursRecents = data;
      console.log('Utilisateurs récemment enregistrés :', this.utilisateursRecents);
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs récemment enregistrés :', error);
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

exportUsers(): void {
  this.service.exportUsersToExcel().subscribe(
    (data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'utilisateurs.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error => {
      console.error('Une erreur est survenue lors du téléchargement du fichier Excel : ', error);
    }
  );
}


filterUsersByBanStatus(): void {
  this.connectedUsers.sort((a, b) => {
    if (a.banned && !b.banned) {
      return -1; // Mettre les utilisateurs bannis en premier
    } else if (!a.banned && b.banned) {
      return 1; // Mettre les utilisateurs non bannis après
    } else {
      return 0; // Ne rien changer s'ils ont le même statut de bannissement
    }
  });
}


}
