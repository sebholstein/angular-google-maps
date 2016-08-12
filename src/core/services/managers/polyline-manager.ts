import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {SebmGoogleMapPolyline} from '../../directives/google-map-polyline';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import * as mapTypes from '../google-maps-types';

@Injectable()
export class PolylineManager {
  private _polylines: Map<SebmGoogleMapPolyline, Promise<mapTypes.Polyline>> =
    new Map<SebmGoogleMapPolyline, Promise<mapTypes.Polyline>>();

  constructor(private _apiWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  addPolyline(polyline: SebmGoogleMapPolyline) {
    console.log("adding new polyline");
    this._polylines.set(polyline, this._apiWrapper.createPolyline({
      clickable: polyline.clickable,
      draggable: polyline.draggable,
      editable: polyline.editable,
      strokeColor: polyline.strokeColor,
      strokeOpacity: polyline.strokeOpacity,
      strokeWeight: polyline.strokeWeight,
      visible: polyline.visible,
      zIndex: polyline.zIndex,
      path: polyline.path
    }));
  };

  setOptions(polyline: SebmGoogleMapPolyline, options: mapTypes.PolylineOptions): Promise<void> {
    return this._polylines.get(polyline).then((c) => c.setOptions(options));
  };

  setEditable(polyline: SebmGoogleMapPolyline): Promise<void> {
    return this._polylines.get(polyline).then((c) => { return c.setEditable(polyline.editable); });
  };

  setDraggable(polyline: SebmGoogleMapPolyline): Promise<void> {
    return this._polylines.get(polyline).then((c) => { return c.setDraggable(polyline.draggable); });
  };

  setPath(polyline: SebmGoogleMapPolyline): Promise<void> {
    return this._polylines.get(polyline).then((c) => { return c.setPath(polyline.path); });
  };

  setVisible(polyline: SebmGoogleMapPolyline): Promise<void> {
    return this._polylines.get(polyline).then((c) => { return c.setVisible(polyline.visible); });
  };
  
  deletePolyline(polyline: SebmGoogleMapPolyline): Promise<void> {
    return this._polylines.get(polyline).then((c) => { return c.setMap(null); });
  };

  createEventObservable<T>(eventName: string, polyline: SebmGoogleMapPolyline): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      let listener: mapTypes.MapsEventListener = null;
      this._polylines.get(polyline).then((p) => {
        listener = p.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });

      return () => {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  }
}
