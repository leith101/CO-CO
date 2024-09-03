import { Component } from '@angular/core';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {

  password: string = '';
  confirmPassword: string = '';
  passwordMatchError: boolean = false;

  onSubmit(): void {
    // Check if the passwords match
    if (this.password !== this.confirmPassword) {
      this.passwordMatchError = true;
    } else {
      // Passwords match, proceed with setting the password
      // Implement your logic here, such as making an HTTP request to set the password
      console.log('Password set successfully:', this.password);
      // Optionally, navigate the user to the next step or redirect to another page
    }
  }

}
