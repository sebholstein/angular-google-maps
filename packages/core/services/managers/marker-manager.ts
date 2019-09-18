import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AgmMarker } from './../../directives/marker';

import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';

@Injectable()
export class MarkerManager {
  protected _markers: Map<AgmMarker, Promise<google.maps.Marker>> =
      new Map<AgmMarker, Promise<google.maps.Marker>>();

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {}

  async convertAnimation(uiAnim: keyof typeof google.maps.Animation | null): Promise<any>{
    if (uiAnim === null) {
      return null;
    } else {
      return this._mapsWrapper.getNativeMap().then(() => google.maps.Animation[uiAnim]);
    }
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    const m = this._markers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return m.then((m: google.maps.Marker) => {
      return this._zone.run(() => {
        m.setMap(null);
        this._markers.delete(marker);
      });
    });
  }

  updateMarkerPosition(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then(
        (m: google.maps.Marker) => m.setPosition({lat: marker.latitude, lng: marker.longitude}));
  }

  updateTitle(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setTitle(marker.title));
  }

  updateLabel(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => { m.setLabel(marker.label); });
  }

  updateDraggable(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setDraggable(marker.draggable));
  }

  updateIcon(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setIcon(marker.iconUrl));
  }

  updateOpacity(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setOpacity(marker.opacity));
  }

  updateVisible(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setVisible(marker.visible));
  }

  updateZIndex(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setZIndex(marker.zIndex));
  }

  updateClickable(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setClickable(marker.clickable));
  }

  async updateAnimation(marker: AgmMarker) {
    const m = await this._markers.get(marker);
    m.setAnimation(await this.convertAnimation(marker.animation));
  }

  addMarker(marker: AgmMarker) {
    const markerPromise = new Promise<google.maps.Marker>(async (resolve) =>
     this._mapsWrapper.createMarker({
        position: {lat: marker.latitude, lng: marker.longitude},
        label: marker.label,
        draggable: marker.draggable,
        icon: marker.iconUrl,
        opacity: marker.opacity,
        visible: marker.visible,
        zIndex: marker.zIndex,
        title: marker.title,
        clickable: marker.clickable,
        animation: await this.convertAnimation(marker.animation),
      }).then(resolve));
    this._markers.set(marker, markerPromise);
  }

  getNativeMarker(marker: AgmMarker): Promise<google.maps.Marker> {
    return this._markers.get(marker);
  }

  createEventObservable<T>(eventName: string, marker: AgmMarker): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._markers.get(marker).then((m: google.maps.Marker) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
