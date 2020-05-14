import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class WebService {

    hotelID;

    reviewID;

    private hotels_private_list = [];
    private hotelsSubject = new Subject();
    hotel_list = this.hotelsSubject.asObservable();

    private hotel_private_list = [];
    private hotelSubject = new Subject();
    hotel = this.hotelSubject.asObservable();

    private reviews_private_list = [];
    private reviewsSubject = new Subject();
    reviews = this.reviewsSubject.asObservable();
    



    constructor(private http: Http) {

    }


    getHotels(start) {
        return this.http.get(
            'http://localhost:3000/api/hotels?start=' + start)
            .subscribe(response => {
                this.hotels_private_list = response.json();
                this.hotelsSubject.next(this.hotels_private_list);
            })
    }






    getHotel(id: string) {
        return this.http.get(
            'http://localhost:3000/api/hotels/' + id)
            .subscribe(response => {
                this.hotel_private_list = [];
                this.hotel_private_list.push(response.json());
                this.hotelSubject.next(this.hotel_private_list);
                this.hotelID = id;
            })
    }

    getReviews(id) {
        this.http.get(
            'http://localhost:3000/api/hotels/' + id + '/reviews')
            .subscribe(
                response => {
                    this.reviews_private_list = response.json();
                    this.reviewsSubject.next(
                        this.reviews_private_list);

                }
            )
    }

    postReview(review) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', review.name);
        urlSearchParams.append('text', review.review);
        urlSearchParams.append('stars', review.stars);

        this.http.post(
            "http://localhost:3000/api/hotels/" +
            review.hotelID + "/reviews",
            urlSearchParams)
            .subscribe(
                response => {
                    this.getReviews(review.hotelID);
                }
            )
    }

    deleteHotel(id) {
        this.http.delete('http://localhost:3000/api/hotels/' + id)
        .subscribe(response => {
            this.hotelID = id;
            console.log("deleted hotel");
        })
    }

    deleteReview(id) {
        this.http.delete('http://localhost:3000/api/hotels/reviews/' + id)
        .subscribe(response => {
            this.reviewID = id;
            console.log("deleted review");
        })
    }

    postHotels(hotels) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Name', hotels.Name);
        urlSearchParams.append('Location', hotels.Location);
        urlSearchParams.append('HotelType', hotels.HotelType);
        urlSearchParams.append('Country', hotels.Country);
        urlSearchParams.append('Image', hotels.Image);
        urlSearchParams.append('Website', hotels.Website);
        urlSearchParams.append('latitude', hotels.latitude);
        urlSearchParams.append('longitude', hotels.longitude);

        this.http.post(
            "http://localhost:3000/api/hotels/",
            urlSearchParams)
            .subscribe(
                response => {
                    console.log(hotels);
                }
            )
    }


}
