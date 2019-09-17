import { Injectable, NgZone } from '@angular/core';
import { merge, Observable, Observer } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';

import { AgmPolygon, PathChangePolygonPathEvent, PathCollectionChangePolygonPathEvent, PolygonPathEvent } from '../../directives/polygon';
import { createMVCEventObservable, MVCEvent } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { LatLng, MVCArray, Polygon } from '../google-maps-types';

@Injectable()
export class PolygonManager {
  private _polygons: Map<AgmPolygon, Promise<Polygon>> =
    new Map<AgmPolygon, Promise<Polygon>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) { }

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

  setPolygonOptions(path: AgmPolygon, options: { [propName: string]: any }): Promise<void> {
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

  getPath(polygon: AgmPolygon): Promise<Array<LatLng>> {
    return this._polygons.get(polygon)
      .then((polygon) => polygon.getPath().getArray());
  }

  getPaths(polygon: AgmPolygon): Promise<Array<Array<LatLng>>> {
    return this._polygons.get(polygon)
      .then((polygon) => polygon.getPaths().getArray().map((p) => p.getArray()));
  }

  createEventObservable<T>(eventName: string, path: AgmPolygon): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._polygons.get(path).then((l: Polygon) => {
        l.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  async createPathEventObservable(agmPolygon: AgmPolygon): Promise<Observable<PolygonPathEvent<any>>> {
    const polygon = await this._polygons.get(agmPolygon);
    const paths = polygon.getPaths();
    const pathsChanges$ = createMVCEventObservable(paths);
    return pathsChanges$.pipe(startWith(({ newArr: paths.getArray() } as MVCEvent<MVCArray<LatLng>>)), // in order to subscribe to them all
      switchMap(parentMVEvent => merge(...// rest parameter
        parentMVEvent.newArr.map((chMVC, index) =>
          createMVCEventObservable(chMVC)
          .pipe(map(chMVCEvent => ({ parentMVEvent, chMVCEvent, pathIndex: index })))))
        .pipe(startWith({ parentMVEvent, chMVCEvent: null, pathIndex: null }))), // start the merged ob with an event signinifing change to parent
      skip(1), // skip the manually added event
      map(({ parentMVEvent, chMVCEvent, pathIndex }) => {
        let retVal;
        if (!chMVCEvent) {
          retVal = {
            newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
            eventName: parentMVEvent.evName,
            index: parentMVEvent.index,
          } as PathCollectionChangePolygonPathEvent;
          if (parentMVEvent.previous) {
            retVal.previous =  parentMVEvent.previous.getArray();
          }
        } else {
          retVal = {
            newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
            pathIndex,
            eventName: chMVCEvent.evName,
            index: chMVCEvent.index,
          } as PathChangePolygonPathEvent;
          if (chMVCEvent.previous) {
            retVal.previous = chMVCEvent.previous;
          }
        }
        return retVal;
      }));
  }
}
