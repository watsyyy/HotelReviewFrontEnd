import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  private observer: Observer<String>;
  userImageChange$: Observable<String> = new Observable(obs => this.observer = obs);

  auth0 = new auth0.WebAuth({
    clientID: 'kDSsASI0Wf9Yqru6hF4kTl7sOgGKwt8w',
    domain: 'hotelapi.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });
  map: any;
  userProfile: any;
  
  
  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  public login(): void {
    sessionStorage.url = window.location.href;
    this.auth0.authorize();
  //  this._accessToken
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }


  public getProfile(cb): void {
    if (!this._accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
       this.localLogin(authResult);
       this.getProfile(authResult.accessToken);
       this.router.navigate(['/']);
      } else if (err) {
       this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

}