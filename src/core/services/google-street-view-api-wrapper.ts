import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';
import {Polyline} from './google-maps-types';
import {PolylineOptions} from './google-maps-types';
import {MapsAPILoader} from './maps-api-loader/maps-api-loader';
import {Handler} from './google-maps-types';

// todo: add types for this
declare var google: any;

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
@Injectable()
export class GoogleStreetViewAPIWrapper {
  private _view: Promise<mapTypes.GoogleStreetViewPanorama>;
  private _viewResolver: (value?: mapTypes.GoogleStreetViewPanorama) => void;

  constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
    this._view =
        new Promise<mapTypes.GoogleStreetViewPanorama>((resolve: () => void) => { this._viewResolver = resolve; });
  }

  createView(el: HTMLElement, viewOptions: mapTypes.StreetViewPanoramaOptions): Promise<void> {
    return this._loader.load().then(() => {
      const view = new google.maps.StreetViewPanorama(el, viewOptions);
      this._viewResolver(<mapTypes.GoogleStreetViewPanorama>view);
      return;
    });
  }

  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):
      Promise<mapTypes.Marker> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => {
      options.map = view;
      return new google.maps.Marker(options);
    });
  }

  createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow> {
    return this._view.then(() => { return new google.maps.InfoWindow(options); });
  }

  /**
   * Creates a google.map.Circle for the current map.
   */
  createCircle(options: mapTypes.CircleOptions): Promise<mapTypes.Circle> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => {
      options.map = view;
      return new google.maps.Circle(options);
    });
  }

  public createPolyline(options: PolylineOptions): Promise<Polyline> {
    return this.getNativeMap().then((map: mapTypes.GoogleStreetViewPanorama) => {
      let line = new google.maps.Polyline(options);
      line.setMap(map);
      return line;
    });
  }

  subscribeToViewEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this._view.then((m: mapTypes.GoogleStreetViewPanorama) => {
        m.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
      });
    });
  }

  getLinks(): Promise<Array<string>> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.getLinks());
  }

  getPano(): Promise<string> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.getPano());
  }

  setPano(pano: string): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.setPano(pano));
  }

  getPosition(): Promise<mapTypes.LatLng> {
    return this._view.then((map: mapTypes.GoogleStreetViewPanorama) => map.getPosition());
  }

  setPosition(latLng: mapTypes.LatLngLiteral): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.setPosition(latLng));
  }

  getPov(): Promise<mapTypes.StreetViewPov> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.getPov());
  }

  setPov(pov: mapTypes.StreetViewPov|mapTypes.StreetViewPov): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.setPov(pov));
  }

  getVisible(): Promise<boolean> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.getVisible());
  }

  setVisible(visible: boolean): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.setVisible(visible));
  }

  addCloseClickHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addCloseClickHandler(handler));
  }

  addLinksChangeHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addLinksChangeHandler(handler));
  }

  addPanoChangeHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addPanoChangeHandler(handler));
  }

  addPositionChangeHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addPositionChangeHandler(handler));
  }

  addPovChangeHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addPovChangeHandler(handler));
  }

  addVisibleChangeHandler(handler: Handler): Promise<void> {
    return this._view.then((view: mapTypes.GoogleStreetViewPanorama) => view.addVisibleChangeHandler(handler));
  }

  /**
   * Returns the native Google Maps Map instance. Be careful when using this instance directly.
   */
  getNativeMap(): Promise<mapTypes.GoogleStreetViewPanorama> { return this._view; }

  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName: string): Promise<void> {
    return this._view.then((m) => google.maps.event.trigger(m, eventName));
  }
}
