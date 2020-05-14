import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MapsService } from './maps.Service';

@Component({
  selector: 'addHotels',
  templateUrl: './addHotels.component.html',
  styleUrls: ['./addHotels.component.css']
})
export class AddHotelsComponent {
  

  hotelsForm;
  
  hotels = {
    Name: '',
    Location: '',
    HotelType: '',
    Country: '',
    Image: '',
    Website: '',
    review_count: '',
    latitude: '',
    longitude: ''
    }

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService, private map: MapsService) {

    this.hotelsForm = formBuilder.group({
      Name: ['', Validators.required],
      Loction: ['', Validators.required],
      HotelType: ['', Validators.required],
      Country: ['', Validators.required],
      Image: ['', Validators.required],
      Website: ['', Validators.required],
      review_count: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]

    });
  }

  onSubmit() {
    this.webService.postHotels(this.hotels);
    this.hotelsForm.reset();
  }

  
  isIncomplete() {
    return this.isInvalid('Name') ||
    this.isInvalid('hotel');
      }


  isInvalid(control) {
    return this.hotelsForm.controls[control].invalid &&
    this.hotelsForm.controls[control].touched
    }
  

  AddHotels;

}