import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AjouterannonceComponent } from './components/ajouterannonce/ajouterannonce.component';
import { VoitureComponent } from './components/voiture/voiture.component';
import { AjoutervoitureComponent } from './components/ajoutervoiture/ajoutervoiture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailedAnnonceComponent } from './components/detailed-annonce/detailed-annonce.component';
import { MesannoncesComponent } from './components/mesannonces/mesannonces.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BackannonceComponent } from './components/backannonce/backannonce.component';
import { BackupdateannonceComponent } from './components/backupdateannonce/backupdateannonce.component';
import { UpdateannonceComponent } from './components/updateannonce/updateannonce.component';
import { UpdatevoitureComponent } from './components/updatevoiture/updatevoiture.component';
import { StatComponent } from './components/stat/stat.component';
import { BackreservationComponent } from './components/backreservation/backreservation.component';
import { BackvoitureComponent } from './components/backvoiture/backvoiture.component';
import { BackupdatevoitureComponent } from './components/backupdatevoiture/backupdatevoiture.component';
import { BackcommentComponent } from './components/backcomment/backcomment.component';
import { NotificationComponent } from './components/notification/notification.component';
import { StatisComponent } from './components/statis/statis.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';



@NgModule({
  declarations: [
    AnnonceComponent,
    AjouterannonceComponent,
    VoitureComponent,
    AjoutervoitureComponent,
    MesannoncesComponent,
    DetailedAnnonceComponent,
    ReservationComponent,
    BackannonceComponent,
    BackupdateannonceComponent,
    UpdateannonceComponent,
    UpdatevoitureComponent,
    StatComponent,
    BackreservationComponent,
    BackvoitureComponent,
    BackupdatevoitureComponent,
    BackcommentComponent,
    NotificationComponent,
    StatisComponent,
    DashboardsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    RouterModule,

  
  ],
  exports:[
    AnnonceComponent,
    AjouterannonceComponent,
    VoitureComponent,
    AjoutervoitureComponent,
    MesannoncesComponent,
    DetailedAnnonceComponent,
    ReservationComponent,
    DashboardsComponent,
    BackannonceComponent,
    BackupdateannonceComponent,
    UpdateannonceComponent,
    UpdatevoitureComponent,
    StatComponent,
    BackreservationComponent,
    BackvoitureComponent,
    BackupdatevoitureComponent,
    BackcommentComponent,
    NotificationComponent,
    StatisComponent,

  ],

})
export class CovoiturageModule { }
