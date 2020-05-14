import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels.component';
import { AddHotelsComponent } from './addHotels.component';
import { HttpModule } from '@angular/http';
import { WebService } from './web.service';
import { FormsModule, ReactiveFormsModule }
 from '@angular/forms';
 import { AgmCoreModule} from '@agm/core';
import { HomeComponent } from './home.component';
import { HotelComponent } from './hotel.component';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';
import { NavComponent } from './nav.component';
import { hotelFilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MapsService } from './maps.Service';
import { shareReplay } from 'rxjs/operators';
import {ProfileComponent} from'./profile.component'
var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
path: 'profiles',
component: ProfileComponent
  },
  {
    path: 'hotels',
    component: HotelsComponent
  },
  {
  path: 'hotels/:id',
  component: HotelComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'addHotels',
    component: AddHotelsComponent
  },
  {
    path: 'maps',
    component: HotelComponent
  }
];



@NgModule({
  declarations: [
    AppComponent, ProfileComponent, AddHotelsComponent,  HotelsComponent, HomeComponent, HotelComponent, CallbackComponent, NavComponent, hotelFilterPipe
  ],
  imports: [
    BrowserModule, HttpClientModule,  NgxPaginationModule, HttpModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, AgmCoreModule.forRoot({
      apiKey:'AIzaSyBRFsa-dHdhmOby3jILQNuPU98nAwsAn7k'
    })
  ],
  providers: [WebService, AuthService, MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

