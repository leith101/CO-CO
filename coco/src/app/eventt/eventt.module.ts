import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { QRCodeModule } from 'angularx-qrcode';
import {DatePickerModule, MaskedDateTimeService} from '@syncfusion/ej2-angular-calendars';
import { GoogleMapsModule } from '@angular/google-maps';

import { CalendrierComponent } from './calendrier/calendrier.component';
import { EventComponent } from './event.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { QrDialogComponent } from './qr-dialog/qr-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';






@NgModule({
    declarations: [
        TicketComponent,
        EventComponent,
        QrDialogComponent,
    ],
    providers: [MaskedDateTimeService],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        QRCodeModule,
        DatePickerModule,
        GoogleMapsModule,
        QRCodeModule,
        MatDialogModule,
        
       
    ]
})
export class EventtModule { }
