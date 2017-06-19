import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {AgmPolygon} from '../../directives/polygon';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {Polygon} from '../google-maps-types';

@Injectable()
export class PolygonManager {
  private _polygons: Map<AgmPolygon, Promise<Polygon>> =
      new Map<AgmPolygon, Promise<Polygon>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  addPolygon(path: AgmPolygon) {
    const polygonPromise = this._mapsWrapper.createPolygon({
      clickable: path.clickable,
      draggable: path.draggable,
      editable: path.editable,
      fillColor: path.fillColor,
      fillOpacity: path.fillOpacity,
      geodesic: path.geodesic,
      paths: path.paths,
      strokeColor: path.strokeColor,
      strokeOpacity: path.strokeOpacity,
      strokeWeight: path.strokeWeight,
      visible: path.visible,
      zIndex: path.zIndex,
    });
    this._polygons.set(path, polygonPromise);
  }

  updatePolygon(polygon: AgmPolygon): Promise<void> {
    const m = this._polygons.get(polygon);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: Polygon) => this._zone.run(() => { l.setPaths(polygon.paths); }));
  }

  setPolygonOptions(path: AgmPolygon, options: {[propName: string]: any}): Promise<void> {
    return this._polygons.get(path).then((l: Polygon) => { l.setOptions(options); });
  }

  deletePolygon(paths: AgmPolygon): Promise<void> {
    const m = this._polygons.get(paths);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: Polygon) => {
      return this._zone.run(() => {
        l.setMap(null);
        this._polygons.delete(paths);
      });
    });
  }

  createEventObservable<T>(eventName: string, path: AgmPolygon): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._polygons.get(path).then((l: Polygon) => {
        l.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
