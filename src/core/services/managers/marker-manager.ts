import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {SebmGoogleMapMarker} from './../../directives/google-map-marker';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {Marker} from './../google-maps-types';

@Injectable()
export class MarkerManager {
  private _markers: Map<SebmGoogleMapMarker, Promise<Marker>> =
      new Map<SebmGoogleMapMarker, Promise<Marker>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  deleteMarker(marker: SebmGoogleMapMarker): Promise<void> {
    const m = this._markers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return m.then((m: Marker) => {
      return this._zone.run(() => {
        m.setMap(null);
        this._markers.delete(marker);
      });
    });
  }

  updateMarkerPosition(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then(
        (m: Marker) => m.setPosition({lat: marker.latitude, lng: marker.longitude}));
  }

  updateTitle(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setTitle(marker.title));
  }

  updateLabel(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => { m.setLabel(marker.label); });
  }

  updateDraggable(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setDraggable(marker.draggable));
  }

  updateIcon(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setIcon(marker.iconUrl));
  }

  updateOpacity(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setOpacity(marker.opacity));
  }

  updateVisible(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setVisible(marker.visible));
  }

  updateZIndex(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setZIndex(marker.zIndex));
  }

  addMarker(marker: SebmGoogleMapMarker) {
    const markerPromise = this._mapsWrapper.createMarker({
      position: {lat: marker.latitude, lng: marker.longitude},
      label: marker.label,
      draggable: marker.draggable,
      icon: marker.iconUrl,
      opacity: marker.opacity,
      visible: marker.visible,
      zIndex: marker.zIndex,
      title: marker.title
    });
    this._markers.set(marker, markerPromise);
  }

  getNativeMarker(marker: SebmGoogleMapMarker): Promise<Marker> {
    return this._markers.get(marker);
  }

  createEventObservable<T>(eventName: string, marker: SebmGoogleMapMarker): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._markers.get(marker).then((m: Marker) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
