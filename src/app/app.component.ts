 import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent {
  title = 'My Web App';
  
  
  
 

  constructor (private authService: AuthService) {
    authService.handleAuthentication();
   
  };

}