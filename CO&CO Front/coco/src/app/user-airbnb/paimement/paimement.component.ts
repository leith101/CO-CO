import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderService } from '../../shared/services/order.service';
import * as XLSX from 'xlsx'; // Import xlsx library for Excel file generation
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paimement',
  templateUrl: './paimement.component.html',
  styleUrl: './paimement.component.css'
})
export class PaimementComponent {
  constructor(private router : Router, private orderService: OrderService, private http: HttpClient){}
  products: any[] = [];
  customer: any = {}; 


  ngOnInit(): void {
  }


  submitPaymentForm(): void {
    if (this.customer.phone && this.customer.phone.length === 8 && this.customer.fullname && this.customer.address) {
      const order = {
        fullName: this.customer.fullname,
        address: this.customer.address,
        phone: this.customer.phone,
        items: JSON.parse(localStorage.getItem('cart')!)
      };
      const flattenedItems = order.items.map((item: any) => ({
        productName: item.nom,
        productDescription: item.description,
        productPrice: item.prix,
        quantity: item.quantity
      }));
      // Generate the Excel file content
      const ws = XLSX.utils.json_to_sheet(flattenedItems);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Order Details');
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Convert array buffer to Blob
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      // Save the Blob as a file locally using FileSaver.js
      saveAs(blob, 'order_details.xlsx');

      // Clear cart and navigate to shop page upon successful order creation
      this.router.navigate(['/shop']);
      localStorage.clear();

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Order confirmed. Downloading order details...'
      });
    } else {
      // Show error message if form is not filled out correctly
      Swal.fire({
        icon: 'error',
        title: 'Warning',
        text: 'Please fill out the form correctly.'
      });
    }
  }
}