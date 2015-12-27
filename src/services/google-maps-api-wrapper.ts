import {Injectable, NgZone} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

import {MapsAPILoader} from './maps-api-loader/maps-api-loader';
import * as mapTypes from './google-maps-types';

// todo: add types for this
declare var google: any;

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  private _map: Promise<mapTypes.GoogleMap>;
  private _mapResolver: (value?: mapTypes.GoogleMap) => void;

  constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
    this._map =
        new Promise<mapTypes.GoogleMap>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void> {
    return this._loader.load().then(() => {
      const map = new google.maps.Map(el, mapOptions);
      this._mapResolver(<mapTypes.GoogleMap>map);
      return;
    });
  }

  setMapOptions(options: mapTypes.MapOptions) {
    this._map.then((m: mapTypes.GoogleMap) => { m.setOptions(options); });
  }

  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):
      Promise<mapTypes.Marker> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      options.map = map;
      return new google.maps.Marker(options);
    });
  }

  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this._map.then((m: mapTypes.GoogleMap) => {
        m.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
      });
    });
  }

  setCenter(latLng: mapTypes.LatLngLiteral): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setCenter(latLng));
  }

  getZoom(): Promise<number> { return this._map.then((map: mapTypes.GoogleMap) => map.getZoom()); }

  setZoom(zoom: number): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setZoom(zoom));
  }

  getCenter(): Promise<mapTypes.LatLng> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getCenter());
  }
}
