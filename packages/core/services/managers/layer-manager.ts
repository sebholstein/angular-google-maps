import { Injectable } from '@angular/core';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { BicyclingLayer, BicyclingLayerOptions, GoogleMap, TransitLayer, TransitLayerOptions } from '../google-maps-types';

/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */

@Injectable()
export class LayerManager {
    private _layers: Map<AgmTransitLayer | AgmBicyclingLayer, Promise<TransitLayer | BicyclingLayer>> =
        new Map<AgmTransitLayer | AgmBicyclingLayer, Promise<TransitLayer | BicyclingLayer>>();

    constructor(private _wrapper: GoogleMapsAPIWrapper) {}

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
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    deleteLayer(layer: AgmTransitLayer | AgmBicyclingLayer): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }

    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    toggleLayerVisibility(layer: AgmTransitLayer | AgmBicyclingLayer, options: TransitLayerOptions | BicyclingLayerOptions): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            } else {
               return this._wrapper.getNativeMap().then( (map: GoogleMap) => {
                   currentLayer.setMap(map);
                });
            }
        });
    }
}
