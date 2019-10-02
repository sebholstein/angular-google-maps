import { Injectable } from '@angular/core';
import { of, throwError, from, Observable } from 'rxjs';
import { GeocoderRequest, GeocoderStatus, Geocoder } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import { WindowRef } from '../utils/browser-globals';
import { map } from 'rxjs/operators';

declare var google: any;

@Injectable()
export class AgmGeocoder {
  private geocoder$: Observable<Geocoder>;
  protected _windowRef: WindowRef;

  constructor(private loader: MapsAPILoader) {
    this.geocoder$ = from(loader.load()).pipe(
      map(() => {
        return new google.maps.Geocoder() as Geocoder;
      })
    )
  }


  geocode(request: GeocoderRequest) {
    return this.geocoder$.pipe(
      map(geocoder => {
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
