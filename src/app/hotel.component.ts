import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { MapsService } from './maps.Service';

@Component({
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {
  lat: String = ''
  lng: String = ''
  
  location: Object;

  reviewForm;
  hotelID;
  review = {
    hotelID: '',
    name: '',
    review: '',
    stars: 5
    }

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService, private map: MapsService) {

    this.reviewForm = formBuilder.group({
      name: ['', Validators.required],
      review: ['', Validators.required],
      stars: 5
    });
  }

  onSubmit() {
    this.review.hotelID = this.webService.hotelID;
    this.webService.postReview(this.review);
    this.reviewForm.reset();
  }

  
  isIncomplete() {
    return this.isInvalid('name') ||
    this.isInvalid('review');
      }


  isInvalid(control) {
    return this.reviewForm.controls[control].invalid &&
    this.reviewForm.controls[control].touched
    }

    onDeleteHotel() {
      console.log("Hotel deleted");
      this.webService.deleteHotel(this.webService.hotelID);
    }

    onDeleteReview() {
      console.log("Review deleted");
      this.webService.deleteReview(this.webService.reviewID);
    }

  async ngOnInit() {
    this.webService.getHotel(this.route.snapshot.params.id);
    this.webService.getReviews(this.route.snapshot.params.id);
    this.map.getLocation(this.route.snapshot.params.id).subscribe(data => {
      console.log(data)
      this.lat = data.latitude;
      this.lng = data.longitude;
      
    })
  }

  

  booking;

}