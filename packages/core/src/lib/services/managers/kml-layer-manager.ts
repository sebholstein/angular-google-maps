import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AgmKmlLayer } from './../../directives/kml-layer';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';

/**
 * Manages all KML Layers for a Google Map instance.
 */
@Injectable()
export class KmlLayerManager {
  private _layers: Map<AgmKmlLayer, Promise<google.maps.KmlLayer>> =
      new Map<AgmKmlLayer, Promise<google.maps.KmlLayer>>();

  constructor(private _wrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  /**
   * Adds a new KML Layer to the map.
   */
  addKmlLayer(layer: AgmKmlLayer) {
    const newLayer = this._wrapper.getNativeMap().then(m => {
      return new google.maps.KmlLayer({
        clickable: layer.clickable,
        map: m,
        preserveViewport: layer.preserveViewport,
        screenOverlays: layer.screenOverlays,
        suppressInfoWindows: layer.suppressInfoWindows,
        url: layer.url,
        zIndex: layer.zIndex,
      });
    });
    this._layers.set(layer, newLayer);
  }

  setOptions(layer: AgmKmlLayer, options: google.maps.KmlLayerOptions) {
    this._layers.get(layer).then(l => l.setOptions(options));
  }

  deleteKmlLayer(layer: AgmKmlLayer) {
    this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }

  /**
   * Creates a Google Maps event listener for the given KmlLayer as an Observable
   */
  createEventObservable<T>(eventName: string, layer: AgmKmlLayer): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._layers.get(layer).then((m: google.maps.KmlLayer) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
