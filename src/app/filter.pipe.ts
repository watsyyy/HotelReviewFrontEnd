import { Pipe, PipeTransform } from '@angular/core';
import { hostViewClassName } from '@angular/compiler';

@Pipe({
  name: 'hotelFilter'
})
export class hotelFilterPipe implements PipeTransform {

  transform(hotels: any[], searchTerm: string) {

    if (!hotels || !searchTerm) {
      return hotels;
    }
   return hotels.filter(hotel => hotel.Name.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1)
  }
  
}