import { Injectable, NgZone } from '@angular/core';

import { Observable, Observer } from 'rxjs';

import { AgmCircle } from '../../directives/circle';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';

@Injectable()
export class CircleManager {
  private _circles: Map<AgmCircle, Promise<google.maps.Circle>> =
      new Map<AgmCircle, Promise<google.maps.Circle>>();

  constructor(private _apiWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  addCircle(circle: AgmCircle) {
    return this._circles.set(circle, this._apiWrapper.getNativeMap().then( () =>
      this._apiWrapper.createCircle({
        center: {lat: circle.latitude, lng: circle.longitude},
        clickable: circle.clickable,
        draggable: circle.draggable,
        editable: circle.editable,
        fillColor: circle.fillColor,
        fillOpacity: circle.fillOpacity,
        radius: circle.radius,
        strokeColor: circle.strokeColor,
        strokeOpacity: circle.strokeOpacity,
        strokePosition: google.maps.StrokePosition[circle.strokePosition],
        strokeWeight: circle.strokeWeight,
        visible: circle.visible,
        zIndex: circle.zIndex,
      }))
    );
  }

  /**
   * Removes the given circle from the map.
   */
  removeCircle(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then((c) => {
      c.setMap(null);
      this._circles.delete(circle);
    });
  }

  async setOptions(circle: AgmCircle, options: google.maps.CircleOptions) {
    return this._circles.get(circle).then((c) => {
      const actualParam = options.strokePosition as any as keyof typeof google.maps.StrokePosition;
      options.strokePosition = google.maps.StrokePosition[actualParam];
      c.setOptions(options);
    });
  }

  getBounds(circle: AgmCircle): Promise<google.maps.LatLngBounds> {
    return this._circles.get(circle).then((c) => c.getBounds());
  }

  getCenter(circle: AgmCircle): Promise<google.maps.LatLng> {
    return this._circles.get(circle).then((c) => c.getCenter());
  }

  getRadius(circle: AgmCircle): Promise<number> {
    return this._circles.get(circle).then((c) => c.getRadius());
  }

  setCenter(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then(
        c => c.setCenter({lat: circle.latitude, lng: circle.longitude}));
  }

  setEditable(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then(c => c.setEditable(circle.editable));
  }

  setDraggable(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then(c => c.setDraggable(circle.draggable));
  }

  setVisible(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then(c => c.setVisible(circle.visible));
  }

  setRadius(circle: AgmCircle): Promise<void> {
    return this._circles.get(circle).then(c => c.setRadius(circle.radius));
  }

  getNativeCircle(circle: AgmCircle): Promise<google.maps.Circle> {
    return this._circles.get(circle);
  }

  createEventObservable<T>(eventName: string, circle: AgmCircle): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      let listener: google.maps.MapsEventListener = null;
      this._circles.get(circle).then((c) => {
        listener = c.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });

      return () => {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  }
}
