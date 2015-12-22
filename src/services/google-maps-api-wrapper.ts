import {Injectable} from 'angular2/core';
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

  private _centerChangeObservable: Observable<mapTypes.LatLngLiteral>;
  private _zoomChangeObservable: Observable<number>;

  private _mapResolver: (value?: mapTypes.GoogleMap) => void;

  constructor(private _loader: MapsAPILoader) {
    this._createObservables();
    this._map =
        new Promise<mapTypes.GoogleMap>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, latitude: number, longitude: number): Promise<void> {
    return this._loader.load().then(() => {
      const map = new google.maps.Map(el, {center: {lat: latitude, lng: longitude}});
      this._mapResolver(<mapTypes.GoogleMap>map);
      return;
    });
  }

  createEventObservable<E>(eventName: string, callback: (observer: Observer<E>) => void):
      Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this._map.then(
          (m: mapTypes.GoogleMap) => m.addListener(eventName, () => { callback(observer); }));
    });
  }

  private _createObservables() {
    this._centerChangeObservable = this.createEventObservable<mapTypes.LatLngLiteral>(
        'center_changed', (observer: Observer<mapTypes.LatLngLiteral>) => {
          this._map.then((map: mapTypes.GoogleMap) => {
            const center = map.getCenter();
            observer.next({lat: center.lat(), lng: center.lng()});
          });
        });
    this._zoomChangeObservable =
        this.createEventObservable<number>('zoom_changed', (observer: Observer<number>) => {
          this._map.then((map: mapTypes.GoogleMap) => { observer.next(map.getZoom()); });
        });
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

  getZoomChangeObserable(): Observable<number> { return this._zoomChangeObservable; }

  getCenterChangeObservable(): Observable<mapTypes.LatLngLiteral> {
    return this._centerChangeObservable;
  }

  setCenter(latLng: mapTypes.LatLngLiteral): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setCenter(latLng));
  }

  setZoom(zoom: number): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setZoom(zoom));
  }

  getCenter(): Promise<mapTypes.LatLng> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getCenter());
  }
}
