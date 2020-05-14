import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
@Component({
 selector: 'navigation',
 templateUrl: './nav.component.html',
 styleUrls: []
})
export class NavComponent { 


constructor(private authService: AuthService) {}
}