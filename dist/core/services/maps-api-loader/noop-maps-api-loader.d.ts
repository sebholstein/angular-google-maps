import { MapsAPILoader } from './maps-api-loader';
import { InjectionToken } from '@angular/core';
/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export declare const LAZY_MAPS_API_CONFIG: InjectionToken<{}>;
export declare class NoOpMapsAPILoader implements MapsAPILoader {
    load(): Promise<void>;
    getLibraries(): InjectionToken<{}>;
}
