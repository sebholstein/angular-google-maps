import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { AgmDataLayer } from './../../directives/data-layer';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
import { Data, DataOptions, Feature } from './../google-maps-types';

declare var google: any;

/**
 * Manages all Data Layers for a Google Map instance.
 */
@Injectable()
export class DataLayerManager {
  private _layers: Map<AgmDataLayer, Promise<Data>> =
  new Map<AgmDataLayer, Promise<Data>>();

  constructor(private _wrapper: GoogleMapsAPIWrapper, private _zone: NgZone) { }

  /**
   * Adds a new Data Layer to the map.
   */
  addDataLayer(layer: AgmDataLayer) {
    const newLayer = this._wrapper.getNativeMap().then(m => {
      var dataLayer = new google.maps.Data(<DataOptions>{
        map: m,
        style: layer.style
      });
      if (layer.geoJson) {
        dataLayer.features = dataLayer.addGeoJson(layer.geoJson);
      }
      return dataLayer;
    });
    this._layers.set(layer, newLayer);
  }

  deleteDataLayer(layer: AgmDataLayer) {
    this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }

  updateGeoJson(layer: AgmDataLayer, geoJson: Object) {
    this._layers.get(layer).then(l => {
      l.forEach(function (feature: Feature) {
        l.remove(feature);

        var index = l.features.indexOf(feature, 0);
        if (index > -1) {
          l.features.splice(index, 1);
        }
      });
      l.features = l.addGeoJson(geoJson);
    });
  }

  setDataOptions(layer: AgmDataLayer, options: DataOptions)
  {
    this._layers.get(layer).then(l => {
      l.setControlPosition(options.controlPosition);
      l.setControls(options.controls);
      l.setDrawingMode(options.drawingMode);
      l.setStyle(options.style);
    });
  }

  /**
   * Creates a Google Maps event listener for the given DataLayer as an Observable
   */
  createEventObservable<T>(eventName: string, layer: AgmDataLayer): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._layers.get(layer).then((d: Data) => {
        d.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
