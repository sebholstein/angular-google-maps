import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { BicyclingLayerOptions, TransitLayerOptions } from '../google-maps-types';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
export declare class LayerManager {
    private _wrapper;
    private _layers;
    constructor(_wrapper: GoogleMapsAPIWrapper);
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer: AgmTransitLayer, options: TransitLayerOptions): void;
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer: AgmBicyclingLayer, options: BicyclingLayerOptions): void;
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    deleteLayer(layer: AgmTransitLayer | AgmBicyclingLayer): Promise<void>;
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    toggleLayerVisibility(layer: AgmTransitLayer | AgmBicyclingLayer, options: TransitLayerOptions | BicyclingLayerOptions): Promise<void>;
}
