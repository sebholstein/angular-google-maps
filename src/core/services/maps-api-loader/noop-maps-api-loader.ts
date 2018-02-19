import { MapsAPILoader } from './maps-api-loader';
import { InjectionToken } from '@angular/core';

/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export const LAZY_MAPS_API_CONFIG = new InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
export class NoOpMapsAPILoader implements MapsAPILoader {
  load(): Promise<void> {
    if (!(<any>window).google || !(<any>window).google.maps) {
      throw new Error(
        'Google Maps API not loaded on page. Make sure window.google.maps is available!');
    }
    return Promise.resolve();
  };
  getLibraries() {
    return LAZY_MAPS_API_CONFIG;
  }
}
