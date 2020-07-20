import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AgmDataLayer } from './../../directives/data-layer';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';

/**
 * Manages all Data Layers for a Google Map instance.
 */
@Injectable()
export class DataLayerManager {
  private _layers: Map<AgmDataLayer, Promise<google.maps.Data>> =
  new Map<AgmDataLayer, Promise<google.maps.Data>>();

  constructor(private _wrapper: GoogleMapsAPIWrapper, private _zone: NgZone) { }

  /**
   * Adds a new Data Layer to the map.
   */
  addDataLayer(layer: AgmDataLayer) {
    const newLayer = this._wrapper.createDataLayer({
      style: layer.style,
    } as google.maps.Data.DataOptions)
    .then(d => {
      if (layer.geoJson) {
        // NOTE: accessing "features" on google.maps.Data is undocumented
        this.getDataFeatures(d, layer.geoJson).then(features => (d as any).features = features);
      }
      return d;
    });
    this._layers.set(layer, newLayer);
  }

  deleteDataLayer(layer: AgmDataLayer) {
    this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }

  updateGeoJson(layer: AgmDataLayer, geoJson: object | string) {
    this._layers.get(layer).then(l => {
      l.forEach(feature => {
        l.remove(feature);

        // NOTE: accessing "features" on google.maps.Data is undocumented
        const index = (l as any).features.indexOf(feature, 0);
        if (index > -1) {
          (l as any).features.splice(index, 1);
        }
      });
      this.getDataFeatures(l, geoJson).then(features => (l as any).features = features);
    });
  }

  setDataOptions(layer: AgmDataLayer, options: google.maps.Data.DataOptions)
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
    return new Observable((observer: Observer<T>) => {
      this._layers.get(layer).then((d: google.maps.Data) => {
        d.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }

  /**
   * Extract features from a geoJson using google.maps Data Class
   * @param d : google.maps.Data class instance
   * @param geoJson : url or geojson object
   */
  getDataFeatures(d: google.maps.Data, geoJson: object | string): Promise<google.maps.Data.Feature[]> {
    return new Promise<google.maps.Data.Feature[]>((resolve, reject) => {
        if (typeof geoJson === 'object') {
          try {
            const features = d.addGeoJson(geoJson);
            resolve(features);
          } catch (e) {
            reject(e);
          }
        } else if (typeof geoJson === 'string') {
          d.loadGeoJson(geoJson, null, resolve);
        } else {
          reject(`Impossible to extract features from geoJson: wrong argument type`);
        }
      });
  }
}
