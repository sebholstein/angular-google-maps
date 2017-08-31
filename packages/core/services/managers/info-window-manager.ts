import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {Injectable, NgZone} from '@angular/core';

import {AgmInfoWindow} from '../../directives/info-window';

import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {InfoWindow, InfoWindowOptions} from '../google-maps-types';
import {MarkerManager} from './marker-manager';

@Injectable()
export class InfoWindowManager {
  private _infoWindows: Map<AgmInfoWindow, Promise<InfoWindow>> =
      new Map<AgmInfoWindow, Promise<InfoWindow>>();

  constructor(
      private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone,
      private _markerManager: MarkerManager) {}

  deleteInfoWindow(infoWindow: AgmInfoWindow): Promise<void> {
    const iWindow = this._infoWindows.get(infoWindow);
    if (iWindow == null) {
      // info window already deleted
      return Promise.resolve();
    }
    return iWindow.then((i: InfoWindow) => {
      return this._zone.run(() => {
        i.close();
        this._infoWindows.delete(infoWindow);
      });
    });
  }

  setPosition(infoWindow: AgmInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((i: InfoWindow) => i.setPosition({
      lat: infoWindow.latitude,
      lng: infoWindow.longitude
    }));
  }

  setZIndex(infoWindow: AgmInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow)
        .then((i: InfoWindow) => i.setZIndex(infoWindow.zIndex));
  }

  open(infoWindow: AgmInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((w) => {
      if (infoWindow.hostMarker != null) {
        return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
          return this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));
        });
      }
      return this._mapsWrapper.getNativeMap().then((map) => w.open(map));
    });
  }

  close(infoWindow: AgmInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((w) => w.close());
  }

  setOptions(infoWindow: AgmInfoWindow, options: InfoWindowOptions) {
    return this._infoWindows.get(infoWindow).then((i: InfoWindow) => i.setOptions(options));
  }

  addInfoWindow(infoWindow: AgmInfoWindow) {
    const options: InfoWindowOptions = {
      content: infoWindow.content,
      maxWidth: infoWindow.maxWidth,
      zIndex: infoWindow.zIndex,
      disableAutoPan: infoWindow.disableAutoPan
    };
    if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
      options.position = {lat: infoWindow.latitude, lng: infoWindow.longitude};
    }
    const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
    this._infoWindows.set(infoWindow, infoWindowPromise);
  }

   /**
    * Creates a Google Maps event listener for the given InfoWindow as an Observable
    */
  createEventObservable<T>(eventName: string, infoWindow: AgmInfoWindow): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._infoWindows.get(infoWindow).then((i: InfoWindow) => {
        i.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
