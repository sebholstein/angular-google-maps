import {Injectable} from '@angular/core';

import {AgmHeatmapLayer} from '../../directives/heatmap-layer';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {HeatmapLayer, HeatmapLayerOptions} from '../google-maps-types';

declare var google: any;

/**
 * Manages all Heatmap Layers for a Google Map instance.
 */

@Injectable()
export class HeatmapLayerManager {
  private _layers: Map<AgmHeatmapLayer, Promise<HeatmapLayer>> =
      new Map<AgmHeatmapLayer, Promise<HeatmapLayer>>();
  constructor(private _wrapper: GoogleMapsAPIWrapper) {}

  addHeatmapLayer(layer: AgmHeatmapLayer) {
    const newLayer = this._wrapper.getNativeMap().then(map => {
      return new google.maps.visualization.HeatmapLayer({map, data: []});
    });
    this._layers.set(layer, newLayer);

    return newLayer;
  }

  setOptions(layer: AgmHeatmapLayer, options: HeatmapLayerOptions) {
    return this._layers.get(layer).then(l => l.setOptions(options));
  }

  deleteHeatmapLayer(layer: AgmHeatmapLayer) {
    return this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }
}
