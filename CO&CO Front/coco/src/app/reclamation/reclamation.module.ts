
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutComponent } from './components/ajout/ajout.component';
import { AfficherComponent } from './components/afficher/afficher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConsulterComponent } from './components/consulter/consulter.component';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@NgModule({

  declarations: [
    AjoutComponent,
    
    
    AfficherComponent,
                ConsulterComponent,
               
                ChatbotComponent,
              
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,

    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule.forRoot([]),
    
  ],
  exports:[
    AjoutComponent
  ],
})
export class ReclamationModule { }
