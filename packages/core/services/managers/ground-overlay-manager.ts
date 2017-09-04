import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {AgmGroundOverlay} from './../../directives/ground-overlay';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {GroundOverlay, GroundOverlayOptions} from './../google-maps-types';

/**
 * Manages all Ground Overlays for a Google Map instance.
 */
@Injectable()
export class GroundOverlayManager {
  private _groundOverlays: Map<AgmGroundOverlay, Promise<GroundOverlay>> =
      new Map<AgmGroundOverlay, Promise<GroundOverlay>>();

  constructor(private _wrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  /**
   * Adds a new Data Layer to the map.
   */
  addGroundOverlay(groundOverlay: AgmGroundOverlay) {
    const newGroundOverlayPromise = this._wrapper.createGroundOverlay(
        groundOverlay.imageUrl, groundOverlay.bounds,
        <GroundOverlayOptions>{clickable: groundOverlay.clickable, opacity: groundOverlay.opacity});
    this._groundOverlays.set(groundOverlay, newGroundOverlayPromise);
  }

  /**
   * Removes the given ground overlay from the map.
   */
  deleteGroundOverlay(groundOverlay: AgmGroundOverlay) {
    return this._groundOverlays.get(groundOverlay).then(l => {
      l.setMap(null);
      this._groundOverlays.delete(groundOverlay);
    });
  }

  setOptions(groundOverlay: AgmGroundOverlay, options: GroundOverlayOptions) {
    return this._groundOverlays.get(groundOverlay).then(l => {
      l.setOpacity(options.opacity);
    });
  }

  /**
   * Creates a Google Maps event listener for the given KmlLayer as an Observable
   */
  createEventObservable<T>(eventName: string, layer: AgmGroundOverlay): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._groundOverlays.get(layer).then((m: GroundOverlay) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
