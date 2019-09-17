import { Injectable } from '@angular/core';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmHeatmapLayer } from '../../directives/heatmap-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { BicyclingLayer, BicyclingLayerOptions, GoogleMap, HeatmapLayer, HeatmapLayerOptions, TransitLayer, TransitLayerOptions } from '../google-maps-types';

type AgmLayer = AgmBicyclingLayer | AgmHeatmapLayer | AgmTransitLayer;
type GoogleLayer = BicyclingLayer | HeatmapLayer | TransitLayer;

/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */

@Injectable()
export class LayerManager {
    private _layers: Map<AgmLayer, Promise<GoogleLayer>> = new Map<AgmLayer, Promise<GoogleLayer>>();

    constructor(private _wrapper: GoogleMapsAPIWrapper) {}

    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer: AgmBicyclingLayer, options: BicyclingLayerOptions): void {
        const newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    }

    /**
     * Adds a heatmap layer to a map instance.
     * @param {AgmHeatmapLayer} layer - a heatmap layer object
     * @param {HeatmapLayerOptions} options - HeatmapLayer options
     * @returns void
     */
    addHeatmapLayer(layer: AgmHeatmapLayer, options: HeatmapLayerOptions): void {
        const newLayer = this._wrapper.createHeatmapLayer(options);
        this._layers.set(layer, newLayer);
    }

    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer: AgmTransitLayer, options: TransitLayerOptions): void {
        const newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    }

    /**
     * Deletes a map layer
     * @param {AgmLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    deleteLayer(layer: AgmLayer): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }

    /**
     * Hide/Show a google map layer
     * @param {AgmLayer} layer - the layer to hide/show
     * @param {boolean} visible - set visibility of the layer
     * @returns Promise<void>
     */
    setLayerVisibility(layer: AgmLayer, visible: boolean): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            if (!visible) {
                currentLayer.setMap(null);
                return;
            } else {
               return this._wrapper.getNativeMap().then( (map: GoogleMap) => {
                   currentLayer.setMap(map);
                });
            }
        });
    }

    /**
     * Set heatmap layer options
     * @param {AgmHeatmapLayer} layer - the layer to set options on
     * @param {LayerOptions} options - layer options
     * @returns Promise<void>
     */
    setOptions(layer: AgmHeatmapLayer, options: HeatmapLayerOptions): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            (currentLayer as HeatmapLayer).setOptions(options);
        });
    }
}
