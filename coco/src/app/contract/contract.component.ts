import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract-service.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationColocServiceService } from '../reservation/reservation-coloc-service.service';
import { AnnonceColocService } from '../annoceColoc/annonce-coloc.service';
import { ServiceService } from '../login/services/service.service';
import { TranslateService } from './translate-service.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  reservation: any = {};
  showGeneratePDFButton: boolean = false;
  savedReservation: any = {};
  dateReservation: Date | undefined; // Ajouté
  annonce: any; // Ajouté
  Contract:any={}
  userReservation:any
  userAnnonce:any
  userAnnonce1:any

  reservationId!: number;

  constructor(contractService: ContractService, private router: Router,private reservationservice:ReservationColocServiceService,    private route: ActivatedRoute,
  private contract:ContractService,private annonceservice:AnnonceColocService,private Userservice:ServiceService,    private translateService: TranslateService // Injectez votre service de traduction
) {
    
  
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation) { // Vérifiez si navigation est null
      const state = navigation.extras.state as {dateReservation: Date, annonce: any};
  
      this.dateReservation = state.dateReservation;
      this.annonce = state.annonce;
    }
  }
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reservationId = +params['reservationid'];  })
    }


    onSubmit(): void {
     
        this.contract.createContract(this.Contract, this.reservationId).subscribe(
          (data) => {
            console.log('Contract created successfully:', data);
            this.Contract=data; 
             this.Contract.date_contract = new Date();
            this.showGeneratePDFButton=true;
            // Navigate to wherever you want after creating the contract
            if (data.users && data.users.length > 0) {
              this.userReservation = data.users[0].nom;
              this.userAnnonce=data.users[0].telephone;
              this.userAnnonce1=data.users[0].email;


            } else {
              console.error('No user found in the contract data');
            }
          },
          (error) => {
            console.error('Error creating contract:', error);
          }
        );
      
  
      }

      getUserByreservation(): void {
        this.reservationservice.getUserByIdReservation(this.reservationId).subscribe(
          (data) => {
            console.log('User retrieved successfully:', data);
            this.userReservation = data;
          },
          (error) => {
            console.error('Error retrieving user:', error);
          }
        );
      }

      getUserByannonce(): void {
        // Utilisez l'identifiant de l'annonce pour récupérer les informations sur l'utilisateur associé à l'annonce
        const annonceId = this.annonce.id; // Assurez-vous que votre objet annonce a une propriété id qui contient l'identifiant de l'annonce
      
        // Appelez le service pour récupérer les informations sur l'utilisateur associé à l'annonce en utilisant son identifiant
        this.annonceservice.retreiveUserFromAnnonce(annonceId).subscribe(
          (data) => {
            console.log('User retrieved successfully:', data);
            this.userAnnonce = data;
          },
          (error) => {
            console.error('Error retrieving user:', error);
          }
        );
      }
      

      

      
      


      generatePDF() {
        // Utiliser les données sauvegardées pour générer le PDF
        console.log(this.userAnnonce)
        const documentDefinition: TDocumentDefinitions = {
          content: [
            { text: 'Contrat de colocation', style: 'header' },
      
            { text: 'Date du contrat: ' + this.Contract.date_contract },
            { text: 'Contenu du contrat:', style: 'subheader' },
            { text: 'Le présent contrat a pour objet de définir les modalités de la colocation entre les parties suivantes :' },
            { text: 'Nom du locataire: ' + this.userReservation },
            { text: 'Numero de telephone: ' + this.userAnnonce },
            { text: 'Adresse email: ' + this.userAnnonce1 },
            { text: 'Nom du locateur ' + this.annonce.nomProp },
            { text: 'Numero de telephone: ' + this.annonce.numT },

            { text: 'Disponibilité du local: ', style: 'subheader' },

            { text: 'Ce local sera reservé pour la date  ' + this.dateReservation   },
            { text: 'La durée du contrat est définie initialement pour ' + this.Contract.DureeC + 'mois et extensible en cas d accord entre les deux parties' },

            
      
            { text: 'Obligations du Locateur: ', style: 'subheader' },
            { text: '1-Assurer que le logement est conforme aux normes de sécurité et de salubrité. ' },
            { text: '2-Effectuer les réparations nécessaires dans un délai raisonnable. ' },
            { text: '3-Respecter la tranquillité des locataires. ' },
            { text: 'Obligations du Locataire: ', style: 'subheader' },
            { text: '1-Payer le loyer mensuel de '+this.annonce.prix +' DT à la date convenue.   ' },
            { text: '2-Partager les charges relatives aux services publics tels que l électricité, l eau et le gaz.  ' },
            { text: '3-Maintenir le logement propre et en bon état.   ' },
            { text: '4-Respecter les règles de vie en communauté, y compris les règles de bruit et de propreté.   ' },
            { text: 'Résiliation du contrat: ', style: 'subheader' },
            { text: 'Le contrat peut être résilié par une des parties si l une des obligations n est pas respectée.  ' },
            '\n\n', // Ajout de sauts de ligne pour déplacer la signature vers le bas
            { text: 'NB: ', style: 'subheader' },

            { text: 'Ce contrat ne represente en aucun cas un accord légal vis a vis la loi.   ' },
            '\n\n', // Ajout de sauts de ligne pour déplacer la signature vers le bas

            { text: 'Signature: ' + (this.Contract.signature ? 'Oui' : 'Non'), style: 'signature' },



          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 20]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            signature: {
              fontSize: 14,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 40, 40] // Marge en bas et à droite
            }
          }
        };
        pdfMake.createPdf(documentDefinition).open();
      }
      
  
  
}
