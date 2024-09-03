import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationComponent } from './certification/certification.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from './schedule/schedule.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CertistatisComponent } from './certistatis/certistatis.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ShowcertComponent } from './showcert/showcert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BackcertiComponent } from './backcerti/backcerti.component';
import { ShowscheduleComponent } from './showschedule/showschedule.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
  declarations: [
    CertificationComponent,
    ScheduleComponent,
    DialogComponent,
    CertistatisComponent,
    ShowcertComponent,
    BackcertiComponent,
    ShowscheduleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
    HttpClientModule,
    GoogleMapsModule,
    MatCardModule,
    MatDatepickerModule,
    SharedModule,
    MatDialogModule,
    CanvasJSAngularChartsModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, // Add MatNativeDateModule or MatMomentDateModule based on your date handling choice
    MatMomentDateModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    RouterModule,
    BrowserModule,
  ],
  exports:[
    CertificationComponent,
    ScheduleComponent,
  ]
})
export class CertiModule { }
