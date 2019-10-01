import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { GeocoderRequest, GeocoderResult, GeocoderStatus, google } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

@Injectable()
export class AgmGeocoder {
  private googleGeocoderInstance: any;

  constructor(private loader: MapsAPILoader) {
    this.loader.load().then(() => {
      this.googleGeocoderInstance = new google.maps.Geocoder();
    });

  }

  geocode(request: GeocoderRequest) {
    if (!this.googleGeocoderInstance) {
      return of([]);
    }

    this.googleGeocoderInstance.geocode(request, (results: GeocoderResult, status: GeocoderStatus) => {
      if (status === GeocoderStatus.OK) {
        return of(results);
      }

      return throwError(status);
    });
  }
}
