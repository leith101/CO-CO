import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QrCodeService } from '../../qr-code.service';




@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrl: './qr-dialog.component.css'
})
export class QrDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private qrCodeService: QrCodeService) {}
  myAngularxQrCode: string = 'hello'




}
