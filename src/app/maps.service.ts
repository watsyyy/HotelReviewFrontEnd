import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'

interface Location {
    latitude: String,
    longitude: String,
    
}


@Injectable()

export class MapsService {


    constructor(private http: HttpClient){ }

    getLocation(id: String) {
        return this.http.get<Location>('http://localhost:3000/api/hotels/'+ id)
    }

    getLocations() {
        return this.http.get<Location>('http://localhost:3000/api/hotels')
    }
}