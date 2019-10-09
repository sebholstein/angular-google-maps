import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AgmPolyline, PathEvent } from '../../directives/polyline';
import { AgmPolylinePoint } from '../../directives/polyline-point';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { IconSequence, LatLng, LatLngLiteral, MVCArray, Polyline } from '../google-maps-types';

declare var google: any;

@Injectable()
export class PolylineManager {
  private _polylines: Map<AgmPolyline, Promise<Polyline>> =
      new Map<AgmPolyline, Promise<Polyline>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  private static _convertPoints(line: AgmPolyline): Array<LatLngLiteral> {
    const path = line._getPoints().map((point: AgmPolylinePoint) => {
      return {lat: point.latitude, lng: point.longitude} as LatLngLiteral;
    });
    return path;
  }

  private static _convertPath(path: 'CIRCLE' | 'BACKWARD_CLOSED_ARROW' | 'BACKWARD_OPEN_ARROW' | 'FORWARD_CLOSED_ARROW' |
  'FORWARD_CLOSED_ARROW' | string): number | string{
    const symbolPath = google.maps.SymbolPath[path];
    if (typeof symbolPath === 'number') {
      return symbolPath;
    } else{
      return path;
    }
  }

  private static _convertIcons(line: AgmPolyline): Array<IconSequence> {
    const icons = line._getIcons().map(agmIcon => ({
      fixedRotation: agmIcon.fixedRotation,
      offset: agmIcon.offset,
      repeat: agmIcon.repeat,
      icon: {
        anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
        fillColor: agmIcon.fillColor,
        fillOpacity: agmIcon.fillOpacity,
        path: PolylineManager._convertPath(agmIcon.path),
        rotation: agmIcon.rotation,
        scale: agmIcon.scale,
        strokeColor: agmIcon.strokeColor,
        strokeOpacity: agmIcon.strokeOpacity,
        strokeWeight: agmIcon.strokeWeight,
      },
    } as IconSequence));
    // prune undefineds;
    icons.forEach(icon => {
      Object.entries(icon).forEach(([key, val]) => {
        if (typeof val === 'undefined') {
          delete (icon as any)[key];
        }
      });
      if (typeof icon.icon.anchor.x === 'undefined' ||
        typeof icon.icon.anchor.y === 'undefined') {
          delete icon.icon.anchor;
        }
    });
    return icons;
  }

  addPolyline(line: AgmPolyline) {
    const polylinePromise = this._mapsWrapper.getNativeMap()
    .then(() => [ PolylineManager._convertPoints(line),
                  PolylineManager._convertIcons(line)])
    .then(([path, icons]: [LatLngLiteral[], IconSequence[]]) =>
      this._mapsWrapper.createPolyline({
        clickable: line.clickable,
        draggable: line.draggable,
        editable: line.editable,
        geodesic: line.geodesic,
        strokeColor: line.strokeColor,
        strokeOpacity: line.strokeOpacity,
        strokeWeight: line.strokeWeight,
        visible: line.visible,
        zIndex: line.zIndex,
        path: path,
        icons: icons,
    }));
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

  async updateIconSequences(line: AgmPolyline): Promise<void> {
    await this._mapsWrapper.getNativeMap();
    const icons = PolylineManager._convertIcons(line);
    const m = this._polylines.get(line);
    if (m == null) {
      return;
    }
    return m.then(l => this._zone.run(() => l.setOptions({icons: icons}) ) );
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

  private async getMVCPath(agmPolyline: AgmPolyline): Promise<MVCArray<LatLng>> {
    const polyline = await this._polylines.get(agmPolyline);
    return polyline.getPath();
  }

  async getPath(agmPolyline: AgmPolyline): Promise<Array<LatLng>> {
    return (await this.getMVCPath(agmPolyline)).getArray();
  }

  createEventObservable<T>(eventName: string, line: AgmPolyline): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._polylines.get(line).then((l: Polyline) => {
        l.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  async createPathEventObservable(line: AgmPolyline): Promise<Observable<PathEvent>> {
    const mvcPath = await this.getMVCPath(line);
    return createMVCEventObservable(mvcPath);
  }
}
