import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AjoutService } from '../../service/ajout.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


// Définition de la liste des mots interdits
const badWordsList: string[] = ['mot1', 'mot2', 'mot3']; // Ajoutez vos mots interdits ici

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent {
  reclamationForm: FormGroup;
  categories: string[] = ['Opinion', 'Complaint', 'Incident'];
  userId: number = 6


  constructor(private service: AjoutService, private _snackBar: MatSnackBar,private router: Router) {
    
    this.reclamationForm = new FormGroup({
      categorie_reclamation: new FormControl('', [Validators.required]),
      objet_reclamation: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100), this.badWordsValidator(badWordsList)]),
      description_reclamation: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500), this.badWordsValidator(badWordsList)]),
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.reclamationForm.get(fieldName);
    return field !== null && field.invalid && field.touched;
}
redirectToConsult(): void {
  this.router.navigate(['/consult']); // Redirection vers la page de consultation
}

save() {
  if (this.reclamationForm.valid) {
      const nouvelleReclamation = this.reclamationForm.value;
      nouvelleReclamation.date_reclamation = new Date();
      

      // Passer l'ID utilisateur statique comme deuxième argument
      this.service.ajoutReclamationAssignToUser(nouvelleReclamation, this.userId).subscribe(
          (response: any) => {
              this.openSnackBar('Claim successfully added', 'Close');
              console.log("Réclamation ajoutée avec succès :", response);
              this.reclamationForm.reset(); // Réinitialiser le formulaire après l'ajout
          },
          (error: any) => {
              this.openSnackBar("Error while adding the complaint", 'Close');
              console.error("Erreur lors de l'ajout de la réclamation :", error);
          }
      );
  } else {
      this.openSnackBar("Form is not valid", 'Fermer');
      console.log('Form is not valid');

      // Marquer les champs requis comme touchés pour afficher les messages d'erreur
      this.reclamationForm.markAllAsTouched();

      // Ajouter une classe shake aux champs invalides pour déclencher l'animation
      Object.keys(this.reclamationForm.controls).forEach(controlName => {
          if (this.isFieldInvalid(controlName)) {
              const element = document.getElementById(controlName);
              if (element) {
                  // Ajouter la classe shake pour déclencher l'animation
                  element.classList.add('shake');

                  // Retirer la classe shake après un délai pour répéter l'effet
                  setTimeout(() => {
                      element.classList.remove('shake');
                  }, 500); // 500 ms est la durée de l'animation définie dans le CSS
              }
          }
      });
  }
}





  openSnackBar(message: string, action: string) {
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';

    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition
    });
  }

  // Validation personnalisée pour les mots interdits
  badWordsValidator(badWords: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value.toLowerCase(); // Convertir le texte en minuscules pour la comparaison
      const foundBadWords: string[] = badWords.filter(word => value.includes(word.toLowerCase()));

      if (foundBadWords.length > 0) {
        const message = `Your complaint contains forbidden words : ${foundBadWords.join(', ')}`;
        this.openSnackBar(message, 'OK');
        return { 'badWords': foundBadWords };
      } else {
        return null;
      }
    };
  }
}
