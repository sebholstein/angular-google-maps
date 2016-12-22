import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {AgmPolyline} from '../../directives/polyline';
import {AgmPolylinePoint} from '../../directives/polyline-point';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {LatLngLiteral, Polyline} from '../google-maps-types';

@Injectable()
export class PolylineManager {
  private _polylines: Map<AgmPolyline, Promise<Polyline>> =
      new Map<AgmPolyline, Promise<Polyline>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  private static _convertPoints(line: AgmPolyline): Array<LatLngLiteral> {
    const path = line._getPoints().map((point: AgmPolylinePoint) => {
      return <LatLngLiteral>{lat: point.latitude, lng: point.longitude};
    });
    return path;
  }

  addPolyline(line: AgmPolyline) {
    const path = PolylineManager._convertPoints(line);
    const polylinePromise = this._mapsWrapper.createPolyline({
      clickable: line.clickable,
      draggable: line.draggable,
      editable: line.editable,
      geodesic: line.geodesic,
      strokeColor: line.strokeColor,
      strokeOpacity: line.strokeOpacity,
      strokeWeight: line.strokeWeight,
      visible: line.visible,
      zIndex: line.zIndex,
      path: path
    });
    this._polylines.set(line, polylinePromise);
  }

  updatePolylinePoints(line: AgmPolyline): Promise<void> {
    const path = PolylineManager._convertPoints(line);
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: Polyline) => { return this._zone.run(() => { l.setPath(path); }); });
  }

  setPolylineOptions(line: AgmPolyline, options: {[propName: string]: any}):
      Promise<void> {
    return this._polylines.get(line).then((l: Polyline) => { l.setOptions(options); });
  }

  deletePolyline(line: AgmPolyline): Promise<void> {
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: Polyline) => {
      return this._zone.run(() => {
        l.setMap(null);
        this._polylines.delete(line);
      });
    });
  }

  createEventObservable<T>(eventName: string, line: AgmPolyline): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._polylines.get(line).then((l: Polyline) => {
        l.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
