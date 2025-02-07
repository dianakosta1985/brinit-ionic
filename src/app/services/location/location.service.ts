import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, StateOrProvince } from 'utiles/types';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  geocode(position: { latitude: number; longitude: number }): Observable<any> {
    return new Observable<any>((observer) => {
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(
        position.latitude,
        position.longitude
      );
      geocoder.geocode({ latLng }, (results: any, status: any) => {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0]);
        } else {
          observer.error(status);
        }
        observer.complete();
      });
    });
  }

  private apiCountriesUrl = 'http://127.0.0.1:8000/api/v1/brinit/counties';
  private apiStateUrl = 'http://127.0.0.1:8000/api/v1/brinit/states_provinces';

  fetchCountries(): Observable<Country[]> {
    return this.http.get<any>(this.apiCountriesUrl);
  }

  fetchStateOrProvince(country_id: string): Observable<StateOrProvince[]> {
    return this.http.get<any>(`${this.apiStateUrl}/${country_id}`);
  }
}
