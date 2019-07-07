import {Injectable} from '@angular/core';
import {AgmTransitLayer} from '../../directives/transit-layer';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {TransitLayer, TransitLayerOptions, GoogleMap} from '../google-maps-types';

/**
 * This class manages a Transit Layer for a Google Map instance.
 */

@Injectable()
export class TransitLayerManager {
    private _layers: Map<AgmTransitLayer, Promise<TransitLayer>> =
        new Map<AgmTransitLayer, Promise<TransitLayer>>();

    constructor(private _wrapper: GoogleMapsAPIWrapper) {}

    /**
     * Adds a transit layer to a map and local layer manager
     * @param {AgmTransitLayer} layer - a transitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer: AgmTransitLayer, options: TransitLayerOptions): void {
        const newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    }

    /**
     * Sets layer options
     * @param {AgmTransitLayer} transitLayer object
     * @param {options} TransitLayerOptions
     * @returns Promise<void>
     */
    setOptions(layer: AgmTransitLayer, options: TransitLayerOptions): Promise<void> {
        return this.toggleTransitLayerVisibility(layer, options);
    }

    /**
     * Deletes a transit layer
     * @param {AgmTransitLayer} layer - the transit layer to delete
     * @returns  Promise<void>
     */
    deleteTransitLayer(layer: AgmTransitLayer): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }

    /**
     * Hide/Show a Google Map transit layer
     * @param {AgmTransitLayer} transitLayer object
     * @param {options} TransitLayerOptions
     * @returns Promise<void>
     */
    toggleTransitLayerVisibility(layer: AgmTransitLayer, options: TransitLayerOptions): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            if (!options.visible) {
                currentLayer.setMap(null);
                return Promise.resolve();
            } else {
               return this._wrapper.getNativeMap().then( (map: GoogleMap) => {
                    currentLayer.setMap(map);
                });
            }
        });
    }
}
