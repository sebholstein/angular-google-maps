import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';

import {AgmFusionTablesLayer} from './../../directives/fusion-tables-layer';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {FusionTablesLayer, FusionTablesLayerOptions} from './../google-maps-types';

declare var google: any;

/**
 * Manages all FusionTablesLayers for a Google Map instance.
 */
@Injectable()
export class FusionTablesLayerManager {
  private _layers: Map<AgmFusionTablesLayer, Promise<FusionTablesLayer>> =
      new Map<AgmFusionTablesLayer, Promise<FusionTablesLayer>>();

  constructor(private _wrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  /**
   * Adds a new FusionTablesLayer to the map.
   */
  addFusionTablesLayer(layer: AgmFusionTablesLayer) {
    const newLayer = this._wrapper.createFusionTablesLayer(layer.options);
    return this._layers.set(layer, newLayer);
  }

  /**
   * Deletes an existing FusionTablesLayer
   */
  deleteFusionTablesLayer(layer: AgmFusionTablesLayer) {
    return this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }

  /**
   * Creates a Google Maps event listener for the given FusionTablesLayer as an Observable
   */
  createEventObservable<T>(eventName: string, layer: AgmFusionTablesLayer): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this._layers.get(layer).then((d: FusionTablesLayer) => {
        d.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  /**
   * Updates the options for a FusionTablesLayer
   */
  updateFusionTablesLayerOptions(layer: AgmFusionTablesLayer, options: FusionTablesLayerOptions) {
    return this._layers.get(layer).then(l => {
      l.setOptions(options);
    });
  }
}
