import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {AgmMarker} from './../../directives/marker';
import {AgmHtmlMarker} from './../../directives/html-marker';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {Marker, HTMLMarker} from './../google-maps-types';

@Injectable()
export class MarkerManager {
  private _markers: Map<AgmMarker, Promise<Marker>> = new Map<AgmMarker, Promise<Marker>>();
  private _htmlmarkers: Map<AgmHtmlMarker, Promise<HTMLMarker>> = new Map<AgmHtmlMarker, Promise<HTMLMarker>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) { }

  deleteMarker(marker: AgmMarker): Promise<void> {
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

  deleteHtmlMarker(marker: AgmHtmlMarker): Promise<void> {
    const m = this._htmlmarkers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return m.then((m: HTMLMarker) => {
      return this._zone.run(() => {
        m.setMap(null);
        if (m.div) {
          m.div.parentNode.removeChild(m.div);
          m.div = null;
        }
        this._htmlmarkers.delete(marker);
      });
    });
  }

  updateMarkerPosition(marker: any): Promise<void> {
    return this._markers.get(marker).then(
      (m: any) => m.setPosition({ lat: marker.latitude, lng: marker.longitude }));
  }

  updateTitle(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setTitle(marker.title));
  }

  updateLabel(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => { m.setLabel(marker.label); });
  }

  updateInnerHTML(marker: AgmHtmlMarker): Promise<void> {
    return this._htmlmarkers.get(marker).then((m: HTMLMarker) => {
      let div: any = m.div;
      if (!div) {
        div = m.div = document.createElement('div');
      }
      div.innerHTML = marker.innerHTML
    });
  }

  updateInnerHTMLClass(marker: AgmHtmlMarker): Promise<void> {
    return this._htmlmarkers.get(marker).then((m: HTMLMarker) => {
      let div = m.div;
      if (!div) {
        div = m.div = document.createElement('div');
      }
      div.className = marker.className;
    });
  }

  updateDraggable(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setDraggable(marker.draggable));
  }

  updateIcon(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setIcon(marker.iconUrl));
  }

  updateOpacity(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setOpacity(marker.opacity));
  }

  updateVisible(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setVisible(marker.visible));
  }

  updateZIndex(marker: AgmMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setZIndex(marker.zIndex));
  }

  addMarker(marker: AgmMarker) {
    const markerPromise = this._mapsWrapper.createMarker({
      position: { lat: marker.latitude, lng: marker.longitude },
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

  addHtmlMarker(marker: AgmHtmlMarker) {
    const markerPromise = this._mapsWrapper.createHtmlMarker({
      position: { lat: marker.latitude, lng: marker.longitude },
      //   label: marker.label,
      //   draggable: marker.draggable,
      //   icon: marker.iconUrl,
      //   opacity: marker.opacity,
      //   visible: marker.visible,
      //   zIndex: marker.zIndex,
      //   title: marker.title
    });
    this._htmlmarkers.set(marker, markerPromise);
  }

  getNativeMarker(marker: AgmMarker): Promise<Marker> {
    return this._markers.get(marker);
  }

  createEventObservable<T>(eventName: string, marker: AgmMarker): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._markers.get(marker).then((m: Marker) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  createEventObservableHTMLMarker<T>(eventName: string, marker: AgmHtmlMarker): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._htmlmarkers.get(marker).then((m: HTMLMarker) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
