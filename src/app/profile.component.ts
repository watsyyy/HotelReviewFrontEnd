// src/app/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

public isCollapsed = false;

profile: any;

  constructor(private authService: AuthService) {}
      
  ngOnInit() {
            
    if(this.authService.userProfile) {
    this.profile = this.authService.userProfile;
    console.log(this.profile);
    } else {
        console.log(this.profile);
        this.authService.getProfile((err, profile) => {
            this.profile = profile;
        });
    }
     
}    

}