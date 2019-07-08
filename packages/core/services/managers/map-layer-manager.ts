import {Injectable, SimpleChanges} from '@angular/core';
import {AgmTransitLayer} from '../../directives/transit-layer';
import {AgmBicyclingLayer} from '../../directives/bicycling-layer';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {MapLayer, MapLayerOptions, GoogleMap} from '../google-maps-types';

/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */

@Injectable()
export class MapLayerManager {
    private _layers: Map<AgmTransitLayer|AgmBicyclingLayer, Promise<MapLayer>> =
        new Map<AgmTransitLayer|AgmBicyclingLayer, Promise<MapLayer>>();

    private static _layerOptions: string[] = [ 'visible'];

    constructor(private _wrapper: GoogleMapsAPIWrapper) {}

    /**
     * Adds a map layer to a map instance. Keep track of that layer in map manager
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - a MapLayer object
     * @param {MapLayerOptions} options - MapLayerOptions options
     * @returns void
     */
    addMapLayer(layer: AgmTransitLayer|AgmBicyclingLayer, options: MapLayerOptions): void {
        const newLayer = this._wrapper.createMapLayer(options, layer.name());
        this._layers.set(layer, newLayer);
    }

    /**
     * Sets layer options
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - a MapLayer object
     * @param {SimpleChanges} changes related to the map later
     * @returns Promise<void>
     */
    setOptions(layer: AgmTransitLayer|AgmBicyclingLayer, changes: SimpleChanges): Promise<void> {
        const options = Object.keys(changes)
            .filter(k => MapLayerManager._layerOptions.indexOf(k) !== -1)
            .reduce((obj: any, k: string) => {
                obj[k] = changes[k].currentValue;
                return obj;
            }, {});
        if (Object.keys(options).length > 0) {
            return this.toggleLayerVisibility(layer, options);
        } else {
            return Promise.resolve();
        }

    }

    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the map layer to delete
     * @returns  Promise<void>
     */
    deleteMapLayer(layer: AgmTransitLayer|AgmBicyclingLayer): Promise<void> {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }

    /**
     * Hide/Show a google map layer layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - a MapLayer object
     * @param {MapLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    toggleLayerVisibility(layer: AgmTransitLayer|AgmBicyclingLayer, options: MapLayerOptions): Promise<void> {
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
