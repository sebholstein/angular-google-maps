import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs';
import {Observer} from 'rxjs';

import {AgmRectangle} from '../../directives/rectangle';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import * as mapTypes from '../google-maps-types';

@Injectable()
export class RectangleManager {
  private _rectangles: Map<AgmRectangle, Promise<mapTypes.Rectangle>> =
      new Map<AgmRectangle, Promise<mapTypes.Rectangle>>();

  constructor(private _apiWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  addRectangle(rectangle: AgmRectangle) {
    this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
      bounds: {
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      },
      clickable: rectangle.clickable,
      draggable: rectangle.draggable,
      editable: rectangle.editable,
      fillColor: rectangle.fillColor,
      fillOpacity: rectangle.fillOpacity,
      strokeColor: rectangle.strokeColor,
      strokeOpacity: rectangle.strokeOpacity,
      strokePosition: rectangle.strokePosition,
      strokeWeight: rectangle.strokeWeight,
      visible: rectangle.visible,
      zIndex: rectangle.zIndex
    }));
  }

  /**
   * Removes the given rectangle from the map.
   */
  removeRectangle(rectangle: AgmRectangle): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => {
      r.setMap(null);
      this._rectangles.delete(rectangle);
    });
  }

  setOptions(rectangle: AgmRectangle, options: mapTypes.RectangleOptions): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => r.setOptions(options));
  }

  getBounds(rectangle: AgmRectangle): Promise<mapTypes.LatLngBounds> {
    return this._rectangles.get(rectangle).then((r) => r.getBounds());
  }

  setBounds(rectangle: AgmRectangle): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setBounds({
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      });
    });
  }

  setEditable(rectangle: AgmRectangle): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setEditable(rectangle.editable);
    });
  }

  setDraggable(rectangle: AgmRectangle): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setDraggable(rectangle.draggable);
    });
  }

  setVisible(rectangle: AgmRectangle): Promise<void> {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setVisible(rectangle.visible);
    });
  }

  createEventObservable<T>(eventName: string, rectangle: AgmRectangle): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      let listener: mapTypes.MapsEventListener = null;
      this._rectangles.get(rectangle).then((r) => {
        listener = r.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });

      return () => {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  }
}
