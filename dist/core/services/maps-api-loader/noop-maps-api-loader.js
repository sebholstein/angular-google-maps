import { InjectionToken } from '@angular/core';
/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export var LAZY_MAPS_API_CONFIG = new InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    ;
    NoOpMapsAPILoader.prototype.getLibraries = function () {
        return LAZY_MAPS_API_CONFIG;
    };
    return NoOpMapsAPILoader;
}());
export { NoOpMapsAPILoader };
//# sourceMappingURL=noop-maps-api-loader.js.map