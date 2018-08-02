import { Injectable, Optional } from '@angular/core';

import {AgmHeatmapLayer} from '../../directives/heatmap-layer';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';

/**
 * Manages all Heatmap Layers for a Google Map instance.
 */

@Injectable()
export class HeatmapLayerManager {
  private _layers: Map<AgmHeatmapLayer, Promise<google.maps.visualization.HeatmapLayer>> =
      new Map<AgmHeatmapLayer, Promise<google.maps.visualization.HeatmapLayer>>();
  constructor(private _wrapper: GoogleMapsAPIWrapper) {}
  // 'data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options'
  addHeatmapLayer(layer: AgmHeatmapLayer): void{
    const newLayer = this._wrapper.getNativeMap().then(map => {
      return new google.maps.visualization.HeatmapLayer(<google.maps.visualization.HeatmapLayerOptions>{
        data: layer.data,
        dissipating: layer.dissipating,
        gradient: layer.gradient,
        maxIntensity: layer.maxIntensity,
        opacity: layer.opacity,
        radius: layer.radius
      });
    });
    this._layers.set(layer, newLayer);
  }

  // as far as I can tell there is no way to change the options of a heat map layer though you can change the data
  setOptions(layer: AgmHeatmapLayer) {
    this.deleteHeatmapLayer(layer);
    this.addHeatmapLayer(layer);
  }

  setData(layer: AgmHeatmapLayer , data: google.maps.MVCArray<google.maps.LatLng|google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[]) {
    return this._layers.get(layer).then(l => {
      l.setData(data);
    });
  }

  deleteHeatmapLayer(layer: AgmHeatmapLayer) {
    return this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }
}
