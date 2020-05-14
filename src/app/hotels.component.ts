
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import { Http } from '@angular/http';
import { MapsService } from './maps.Service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'hotels',
    templateUrl: './hotels.component.html',
    styleUrls: ['./hotels.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsComponent  {
    result: any;
    lat: String = ''
    lng: String = ''
    
    location: Object;
    //API URL
   
   pages = {};
    constructor(private webService: WebService, private authService: AuthService, private http: Http, private map: MapsService, private route: ActivatedRoute,) {

    }

   
    

   ngOnInit() {
       
    if (sessionStorage.start) {
        this.start = sessionStorage.start;
        } 
    this.webService.getHotels(this.start);
    this.map.getLocations().subscribe(data => {
        console.log(data)
        this.lat = data.latitude;
        this.lng = data.longitude;
        
      })
    }

    nextPage() {
        this.start = Number(this.start) + 5;
        sessionStorage.start = Number(this.start);
        this.webService.getHotels(this.start);
       }
       previousPage() {
        if (this.start > 0) {
        this.start = Number(this.start) - 5;
        sessionStorage.start = Number(this.start);
        this.webService.getHotels(this.start);
        }
       }

 hotel_list;    
start = 0;



 }