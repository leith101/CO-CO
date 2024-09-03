import { StatsComponent } from './aboutus/components/stats/stats.component';

import { LoginComponent } from './login/component/login/login.component';
import { PanierComponent } from './panier/component/panier/panier.component';
import { HomeComponent } from './home/component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { PreferancesComponent } from './login/component/preferances/preferances.component';
import { ProfileComponent } from './login/component/profile/profile.component';
import { UpdateComponent } from './login/component/update/update.component';
import { SetPasswordComponent } from './login/component/set-password/set-password.component';
import { DashboardComponent } from './backoffice/components/dashboard/dashboard.component';
import { ChatComponent } from './chat/components/chat/chat.component';
import { AnnonceColocListComponent } from './annoceColoc/annonce-coloc-list/annonce-coloc-list.component';
import { CreateAnnonceColocComponent } from './annoceColoc/create-annonce-coloc/create-annonce-coloc.component';
import { MesAnnoncesComponent } from './annoceColoc/mes-annonces/mes-annonces.component';
import { AnnoceColocViewComponent } from './annoceColoc/annoce-coloc-view/annoce-coloc-view.component';
import { UpdateAnnonceColocComponent } from './annoceColoc/update-annonce-coloc/update-annonce-coloc.component';
import { CreateReservationColocComponent } from './reservation/create-reservation-coloc/create-reservation-coloc.component';
  //MaddouriCovoiturage
  import { AnnonceComponent } from './covoiturage/components/annonce/annonce.component';
import { VoitureComponent } from './covoiturage/components/voiture/voiture.component';
import { AjoutervoitureComponent } from './covoiturage/components/ajoutervoiture/ajoutervoiture.component';
import { AjouterannonceComponent } from './covoiturage/components/ajouterannonce/ajouterannonce.component';
import { DetailedAnnonceComponent } from './covoiturage/components/detailed-annonce/detailed-annonce.component';
import { MesannoncesComponent } from './covoiturage/components/mesannonces/mesannonces.component';
import { ReservationComponent } from './covoiturage/components/reservation/reservation.component';
import { BackannonceComponent } from './covoiturage/components/backannonce/backannonce.component';
import { BackupdateannonceComponent } from './covoiturage/components/backupdateannonce/backupdateannonce.component';
import { UpdateannonceComponent } from './covoiturage/components/updateannonce/updateannonce.component';
import { UpdatevoitureComponent } from './covoiturage/components/updatevoiture/updatevoiture.component';
import { StatComponent } from './covoiturage/components/stat/stat.component';
import { BackreservationComponent } from './covoiturage/components/backreservation/backreservation.component';
import { BackvoitureComponent } from './covoiturage/components/backvoiture/backvoiture.component';
import { BackupdatevoitureComponent } from './covoiturage/components/backupdatevoiture/backupdatevoiture.component';
import { BackcommentComponent } from './covoiturage/components/backcomment/backcomment.component';
import { NotificationComponent } from './covoiturage/components/notification/notification.component';
import { StatisComponent } from './covoiturage/components/statis/statis.component';
import { DashboardsComponent } from './covoiturage/components/dashboards/dashboards.component';
import { AfficherpostComponent } from './forum/components/afficherpost/afficherpost.component';
import { ConsulterComponent } from './reclamation/components/consulter/consulter.component';
import { CreateprofileComponent } from './tinder/createprofile/createprofile.component';
import { TinderComponent } from './tinder/tinder/tinder.component';
import { PostComponent } from './forum/components/post/post.component';
import { AfficherComponent } from './reclamation/components/afficher/afficher.component';
import { AjoutComponent } from './reclamation/components/ajout/ajout.component';
import { CertificationComponent } from './certi/certification/certification.component';
import { ScheduleComponent } from './certi/schedule/schedule.component';
import { CalendrierComponent } from './eventt/calendrier/calendrier.component';
import { TicketComponent } from './eventt/ticket/ticket.component';
import { EventComponent } from './eventt/event.component';
import { ShopComponent } from './user-airbnb/shop/shop.component';
import { CartComponent } from './user-airbnb/cart/cart.component';
import { PaimementComponent } from './user-airbnb/paimement/paimement.component';
import { CertistatisComponent } from './certi/certistatis/certistatis.component';
import { ShowcertComponent } from './certi/showcert/showcert.component';
import { BackcertiComponent } from './certi/backcerti/backcerti.component';
import { ShowscheduleComponent } from './certi/showschedule/showschedule.component';

import { BackofficeComponent } from './backoffice1/backoffice.component';
import { ContractComponent } from './contract/contract.component';
import { Back2Component } from './back2/back2.component';
const routes: Routes = [

  {path:"home" , component:HomeComponent},
  {path:"panier" , component:PanierComponent},
  {path:"profile" , component:ProfileComponent},
  {path:"update" , component:UpdateComponent},
  {path:"password" , component:SetPasswordComponent},
  {path:"back" , component:DashboardComponent},
  {path:"backk" , component:DashboardsComponent},
  {path:"login" , component:LoginComponent},
  { path: 'chat/:userId', component: ChatComponent },
  { path: "annoncesColoc", component: AnnonceColocListComponent }, 
  { path: "annoncesColoc/add", component: CreateAnnonceColocComponent }, 
  { path: "annoncesColoc/mesannonces", component: MesAnnoncesComponent }, 
  { path: "annoncesColoc/view/:id", component: AnnoceColocViewComponent }, 
  { path: "annoncesColoc/:id", component: UpdateAnnonceColocComponent }, 
  { path: "annoncesColoc/view/:id/reservationColoc", component: CreateReservationColocComponent },
  { path: "back1", component: BackofficeComponent }, // Utilisez le bon nom de composant
  { path: "annoncesColoc/view/:id/reservationColoc/contract/:reservationid", component: ContractComponent },
  { path: "back2", component: Back2Component }, // Utilisez le bon nom de composant

  //MaddouriCovoiturage
  {path:"annonceCOV" , component:AnnonceComponent},
  {path:"voiture" , component:VoitureComponent},
  {path:"ajoutervoiture" , component:AjoutervoitureComponent},
  {path:"ajouterannonce" , component:AjouterannonceComponent},
  { path: 'annonces/:ida', component: DetailedAnnonceComponent },
  { path: "annonces", component: MesannoncesComponent },
  { path: "mesReservations", component: ReservationComponent },
  { path: "bannonce", component: BackannonceComponent },
  { path: "bupdate/:ida", component: BackupdateannonceComponent },
  { path: "updatevoiture/:idv", component:UpdatevoitureComponent  },   
  { path: "updateannonce/:ida", component:UpdateannonceComponent     },
  { path: "stats", component:StatComponent},                    
  { path: "reserv", component:BackreservationComponent},     
  { path: "bvoiture", component:BackvoitureComponent},                    
  { path: "buvoiture/:idv", component:BackupdatevoitureComponent},   
  { path: "bcomment", component:BackcommentComponent},                 
  { path: "not", component:NotificationComponent},                    
  { path: "stat", component:StatisComponent},
  {path:"affichpost" , component:AfficherpostComponent},
  {path:"consult" , component:ConsulterComponent},
  {path:"tinder" , component:TinderComponent},
  {path:"create" , component:CreateprofileComponent},
  {path:"aboutus" , component:StatsComponent},
  {path:"ajoutrecl" , component:AjoutComponent},
  {path:"affichrecl" , component:AfficherComponent},
  {path:"ajoutpost" , component:PostComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:"preferances" , component:PreferancesComponent},
  {path :"ticket",  component:TicketComponent},
  {path :"calendrier" , component: CalendrierComponent},
  {path :"certification" , component: CertificationComponent},
  {path :"schedule" , component: ScheduleComponent},
  { path: 'event', component: EventComponent },
  //{path:"**",redirectTo:"home" ,pathMatch:"full"} 

  {path:"shop" , component:ShopComponent},
  {path:"cart" , component:CartComponent},
  {path:"paiement" , component:PaimementComponent},

  { path: 'admin', loadChildren: () => import('./admin-airbnb/admin-airbnb.module').then(m => m.AdminAirbnbModule) },



  { path: 'event', component: EventComponent },
  {path :"ticket",  component:TicketComponent},
  {path :"calendrier" , component: CalendrierComponent},
  {path :"certification" , component: CertificationComponent},
  {path :"schedule" , component: ScheduleComponent},
  {path :"statiscerti" , component : CertistatisComponent},
  {path :"showsc" , component : ShowcertComponent},
  {path : "backcerti", component : BackcertiComponent},
  {path : "showme", component: ShowscheduleComponent},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
