import { Injectable } from '@angular/core';
import { bindCallback, from, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Geocoder, GeocoderRequest, GeocoderResult, GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

declare var google: any;

@Injectable()
export class AgmGeocoder {
  protected readonly geocoder$: Observable<Geocoder>;

  constructor(loader: MapsAPILoader) {
    this.geocoder$ = from(loader.load()).pipe(
      map(() => this._createGeocoder())
    );
  }

  geocode(request: GeocoderRequest): Observable<GeocoderResult[]> {
    return this.geocoder$.pipe(
      switchMap((geocoder) => this._getGoogleResults(geocoder, request))
    );
  }

  private _getGoogleResults(geocoder: Geocoder, request: GeocoderRequest): Observable<GeocoderResult[]> {
    const geocodeObservable = bindCallback(geocoder.geocode);
    return geocodeObservable(request).pipe(
      switchMap(([results, status]) => {
        if (status === GeocoderStatus.OK) {
          return of(results);
        }

        return throwError(status);
      })
    );
  }

  private _createGeocoder(): Geocoder {
    return new google.maps.Geocoder() as Geocoder;
  }
}
