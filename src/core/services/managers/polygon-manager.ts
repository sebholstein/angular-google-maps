import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import { AgmPolygon } from "../../directives/polygon";
import { GoogleMapsAPIWrapper } from "../google-maps-api-wrapper";
import { Polygon } from "../google-maps-types";

declare var google: any;

@Injectable()
export class PolygonManager {
  private _polygons: Map<AgmPolygon, Promise<Polygon>> = new Map<
    AgmPolygon,
    Promise<Polygon>
    >();

  constructor(
    private _mapsWrapper: GoogleMapsAPIWrapper,
    private _zone: NgZone
  ) { }

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
      zIndex: path.zIndex
    });
    this._polygons.set(path, polygonPromise);
  }

  updatePolygon(polygon: AgmPolygon): Promise<void> {
    const m = this._polygons.get(polygon);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: Polygon) =>
      this._zone.run(() => {
        l.setPaths(polygon.paths);
      })
    );
  }

  setPolygonOptions(
    path: AgmPolygon,
    options: { [propName: string]: any }
  ): Promise<void> {
    return this._polygons.get(path).then((l: Polygon) => {
      l.setOptions(options);
      if (options['paths']) {
        this.updatePolygon(path);
      }
    });
  }

  deletePolygon(paths?: AgmPolygon): Promise<void> {
    const m = this._polygons.get(paths) || null;
    if (m == null) {
      this._polygons.forEach((p: any) => {
        this._polygons.delete(p);
      });
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
        l.addListener(eventName, (e: T) =>
          this._zone.run(() => observer.next(e))
        );
      });
    });
  }

  createDragEventObservable<T>(
    eventName: string,
    path: AgmPolygon
  ): Observable<T> {
    return Observable.create((observer: Observer<any>) => {
      this._polygons.get(path).then((l: Polygon) => {
        l.addListener(eventName, () =>
          this._zone.run(() => observer.next(this.getBounds(l)))
        );
        // google.maps.event.addListener(l, eventName, () =>
        //   this._zone.run(() => observer.next(this.getBounds(l)))
        // );
      });
    });
  }

  createPolyChangesObservable<T>(
    eventName: string,
    path: AgmPolygon
  ): Observable<T> {
    return Observable.create((observer: Observer<any>) => {
      this._polygons.get(path).then((l: Polygon) => {
        l.getPaths().forEach(path => {
          google.maps.event.addListener(path, eventName, () =>
            this._zone.run(() => observer.next(this.getBounds(l)))
          );
        });
      });
    });
  }

  getBounds(polygon: Polygon) {
    let bounds = [];
    let length = polygon.getPath().getLength();
    for (let i = 0; i < length; i++) {
      let ln = {
        lat: polygon
          .getPath()
          .getAt(i)
          .lat(),
        lng: polygon
          .getPath()
          .getAt(i)
          .lng()
      };
      bounds.push(ln);
    }
    return bounds;
  }
}
