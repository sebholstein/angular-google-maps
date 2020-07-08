import { Injectable } from '@angular/core';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';

/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */

@Injectable()
export class LayerManager {
    private _layers: Map<AgmTransitLayer | AgmBicyclingLayer, Promise<google.maps.TransitLayer | google.maps.BicyclingLayer>> =
        new Map<AgmTransitLayer | AgmBicyclingLayer, Promise<google.maps.TransitLayer | google.maps.BicyclingLayer>>();

    constructor(private _wrapper: GoogleMapsAPIWrapper) {}

    /**
     * Adds a transit layer to a map instance.
     * @param layer - a TransitLayer object
     * @param _options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer: AgmTransitLayer): void {
        const newLayer = this._wrapper.createTransitLayer();
        this._layers.set(layer, newLayer);
    }

    /**
     * Adds a bicycling layer to a map instance.
     * @param layer - a bicycling layer object
     * @param _options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer: AgmBicyclingLayer): void {
        const newLayer = this._wrapper.createBicyclingLayer();
        this._layers.set(layer, newLayer);
    }

    /**
     * Deletes a map layer
     * @param layer - the layer to delete
     */
    deleteLayer(layer: AgmTransitLayer | AgmBicyclingLayer): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }
}
