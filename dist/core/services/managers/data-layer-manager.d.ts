import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgmDataLayer } from './../../directives/data-layer';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
import { DataOptions } from './../google-maps-types';
/**
 * Manages all Data Layers for a Google Map instance.
 */
export declare class DataLayerManager {
    private _wrapper;
    private _zone;
    private _layers;
    constructor(_wrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    /**
     * Adds a new Data Layer to the map.
     */
    addDataLayer(layer: AgmDataLayer): void;
    deleteDataLayer(layer: AgmDataLayer): void;
    updateGeoJson(layer: AgmDataLayer, geoJson: Object): void;
    setDataOptions(layer: AgmDataLayer, options: DataOptions): void;
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    createEventObservable<T>(eventName: string, layer: AgmDataLayer): Observable<T>;
}
