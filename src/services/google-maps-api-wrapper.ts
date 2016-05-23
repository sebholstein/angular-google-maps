import {Injectable, NgZone} from '@angular/core';
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

  createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow> {
    return this._map.then(() => { return new google.maps.InfoWindow(options); });
  }

  createControl(position: mapTypes.MapControlPosition, controlEl: HTMLElement): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      this._getPositionsMap().then(
          (positionsMap) => map.controls[positionsMap[position]].push(controlEl));
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

  getMap(): Promise<mapTypes.GoogleMap> { return this._map; }

  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName: string): Promise<void> {
    return this._map.then((m) => google.maps.event.trigger(m, eventName));
  }

  private _getPositionsMap(): Promise<Array<any>> {
    return new Promise<Array<any>>((resolve) => {
      this._map.then(() => {
        resolve([
          google.maps.ControlPosition.BOTTOM_CENTER, google.maps.ControlPosition.BOTTOM_LEFT,
          google.maps.ControlPosition.BOTTOM_RIGHT, google.maps.ControlPosition.LEFT_BOTTOM,
          google.maps.ControlPosition.LEFT_CENTER, google.maps.ControlPosition.LEFT_TOP,
          google.maps.ControlPosition.RIGHT_BOTTOM, google.maps.ControlPosition.RIGHT_CENTER,
          google.maps.ControlPosition.RIGHT_TOP, google.maps.ControlPosition.TOP_CENTER,
          google.maps.ControlPosition.TOP_LEFT, google.maps.ControlPosition.TOP_RIGHT
        ]);
      });
    });
  }
}
