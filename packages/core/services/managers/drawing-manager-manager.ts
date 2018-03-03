import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {AgmDrawingManager} from './../../directives/drawing-manager';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {DrawingManager} from './../google-maps-types';

declare var google: any;

@Injectable()
export class DrawingManagerManager {

  protected _drawingManagers: Map<AgmDrawingManager, Promise<DrawingManager>> =
    new Map<AgmDrawingManager, Promise<DrawingManager>>();

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {}

  addDrawingManager(drawingManager: AgmDrawingManager) {
    const drawingManagerPromise = this._mapsWrapper.createDrawingManager({
      drawingMode: drawingManager.drawingMode,
      drawingControl: drawingManager.drawingControl,
      drawingControlOptions: drawingManager.drawingControlOptions,
      circleOptions: drawingManager.circleOptions,
      markerOptions: drawingManager.markerOptions,
      polylineOptions: drawingManager.polylineOptions,
      polygonOptions: drawingManager.polygonOptions,
      rectangleOptions: drawingManager.rectangleOptions,
    });
    this._drawingManagers.set(drawingManager, drawingManagerPromise);
  }

  deleteDrawingManager(drawingManager: AgmDrawingManager): Promise<void> {
    const dm = this._drawingManagers.get(drawingManager);
    if (!dm) {
      return Promise.resolve();
    }
    return dm.then((dm: DrawingManager) => {
      return this._zone.run(() => {
        dm.setMap(null);
        this._drawingManagers.delete(drawingManager);
      });
    });
  }

  updateDrawingMode(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({drawingMode: drawingManager.drawingMode}));
  }

  updateDrawingControl(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({drawingControl: drawingManager.drawingControl}));
  }

  updateDrawingControlOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({drawingControlOptions: drawingManager.drawingControlOptions}));
  }

  updateCircleOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({circleOptions: drawingManager.circleOptions}));
  }

  updateMarkerOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({markerOptions: drawingManager.markerOptions}));
  }

  updatePolylineOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({polylineOptions: drawingManager.polylineOptions}));
  }

  updatePolygonOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({polygonOptions: drawingManager.polygonOptions}));
  }

  updateRectangleOptions(drawingManager: AgmDrawingManager): Promise<void> {
    return this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => dm.setOptions({rectangleOptions: drawingManager.rectangleOptions}));
  }

  createEventObservable<T>(eventName: string, drawingManager: AgmDrawingManager): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._drawingManagers.get(drawingManager).then((dm: DrawingManager) => {
        dm.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
