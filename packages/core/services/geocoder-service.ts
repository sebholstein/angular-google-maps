import { Injectable } from '@angular/core';
import { of, throwError, from } from 'rxjs';
import { GeocoderRequest, GeocoderStatus, google, Geocoder } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import { WindowRef } from '../utils/browser-globals';
import { map } from 'rxjs/operators';

@Injectable()
export class AgmGeocoder {
  protected _windowRef: WindowRef;

  constructor(private loader: MapsAPILoader) { }


  geocode(request: GeocoderRequest) {
    return from(this.loader.load()).pipe(
      map(() => {
        const geocoder = new google.maps.Geocoder() as Geocoder;

        geocoder.geocode(request, (results, status) => {
          if (status === GeocoderStatus.OK) {
            return of(results);
          }

          return throwError(status);
        });
      })
    )
  }
}
