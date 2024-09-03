import { TinderService } from './../tinder.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent {
  profileData: any = {}; 
file: any = null;
onFileChange(event: any): void {
  this.file = event.target.files[0];

  
}
  constructor(private tinderService: TinderService) { }
  createProfile() {
    if(this.file != null){
    const userId = "9"; 
    const formData = new FormData();
    
    formData.append('image', this.file); 
    formData.append('userId', userId);
    formData.append('description', this.profileData.description);
    formData.append('age', this.profileData.age);
    formData.append('localisation', this.profileData.localisation);
    formData.append('preferencesRecherche', this.profileData.preferencesRecherche);
    this.tinderService.createProfile(this.profileData).subscribe(
      (response) => {
        console.log('Profile created successfully:', response);
        
      },
      (error) => {
        console.error('Error creating profile:', error);
      }
    );
  }
}
  
}
