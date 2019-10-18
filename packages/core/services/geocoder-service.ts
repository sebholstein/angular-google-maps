import { Injectable } from '@angular/core';
import { bindCallback, ConnectableObservable, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { Geocoder, GeocoderRequest, GeocoderResult, GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

declare var google: any;

@Injectable({ providedIn: 'root' })
export class AgmGeocoder {
  protected readonly geocoder$: Observable<Geocoder>;

  constructor(loader: MapsAPILoader) {
    const connectableGeocoder$ = new Observable(subscriber => {
      loader.load().then(() => subscriber.next());
    })
      .pipe(
        map(() => this._createGeocoder()),
        multicast(new ReplaySubject(1)),
      ) as ConnectableObservable<Geocoder>;

    connectableGeocoder$.connect(); // ignore the subscription
    // since we will remain subscribed till application exits

    this.geocoder$ = connectableGeocoder$;
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
