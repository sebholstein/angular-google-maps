import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AgmPolyline } from '../../directives/polyline';
import { AgmPolylinePoint } from '../../directives/polyline-point';
import { createMVCEventObservable, MVCEvent } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';

@Injectable()
export class PolylineManager {
  private _polylines: Map<AgmPolyline, Promise<google.maps.Polyline>> =
      new Map<AgmPolyline, Promise<google.maps.Polyline>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  private static _convertPoints(line: AgmPolyline): google.maps.LatLngLiteral[] {
    return line._getPoints().map((point: AgmPolylinePoint) => {
      return {lat: point.latitude, lng: point.longitude} as google.maps.LatLngLiteral;
    });
  }

  private static _convertPath(path: keyof typeof google.maps.SymbolPath | string): google.maps.SymbolPath | string {
    const symbolPath = google.maps.SymbolPath[path as keyof typeof google.maps.SymbolPath];
    if (typeof symbolPath === 'number') {
      return symbolPath;
    } else{
      return path;
    }
  }

  private static _convertIcons(line: AgmPolyline): Array<google.maps.IconSequence> {
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
    } as google.maps.IconSequence));
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
    .then(([path, icons]: [google.maps.LatLngLiteral[], google.maps.IconSequence[]]) =>
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
        path,
        icons,
    }));
    this._polylines.set(line, polylinePromise);
  }

  updatePolylinePoints(line: AgmPolyline): Promise<void> {
    const path = PolylineManager._convertPoints(line);
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l) => this._zone.run(() => l.setPath(path)));
  }

  async updateIconSequences(line: AgmPolyline): Promise<void> {
    await this._mapsWrapper.getNativeMap();
    const icons = PolylineManager._convertIcons(line);
    const m = this._polylines.get(line);
    if (m == null) {
      return;
    }
    return m.then(l => this._zone.run(() => l.setOptions({icons}) ) );
  }

  setPolylineOptions(line: AgmPolyline, options: {[propName: string]: any}):
      Promise<void> {
    return this._polylines.get(line).then((l: google.maps.Polyline) => { l.setOptions(options); });
  }

  deletePolyline(line: AgmPolyline): Promise<void> {
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l: google.maps.Polyline) => {
      return this._zone.run(() => {
        l.setMap(null);
        this._polylines.delete(line);
      });
    });
  }

  private async getMVCPath(agmPolyline: AgmPolyline): Promise<google.maps.MVCArray<google.maps.LatLng>> {
    const polyline = await this._polylines.get(agmPolyline);
    return polyline.getPath();
  }

  async getPath(agmPolyline: AgmPolyline): Promise<google.maps.LatLng[]> {
    return (await this.getMVCPath(agmPolyline)).getArray();
  }

  createEventObservable<T>(eventName: string, line: AgmPolyline): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._polylines.get(line).then((l: google.maps.Polyline) => {
        l.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  async createPathEventObservable(line: AgmPolyline): Promise<Observable<MVCEvent<google.maps.LatLng>>> {
    const mvcPath = await this.getMVCPath(line);
    return createMVCEventObservable(mvcPath);
  }
}
