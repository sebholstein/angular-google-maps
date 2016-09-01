/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import {ModuleWithProviders, NgModule} from '@angular/core';
import {SebmGoogleMap} from './directives/google-map';
import {SebmGoogleMapCircle} from './directives/google-map-circle';
import {SebmGoogleMapInfoWindow} from './directives/google-map-info-window';
import {SebmGoogleMapMarker} from './directives/google-map-marker';
import {SebmGoogleMapPolyline} from './directives/google-map-polyline';
import {SebmGoogleMapPolylinePoint} from './directives/google-map-polyline-point';
import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {BROWSER_GLOBALS_PROVIDERS} from './utils/browser-globals';

// main modules
export * from './services';
export * from './map-types'; 

// Google Maps types
export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle} from './services/google-maps-types';

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 *
 * @experimental
 */
@NgModule({
  declarations: [
    SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
    SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
  ],
  exports: [
    SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
    SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
  ]
})
export class AgmCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AgmCoreModule,
      providers: [BROWSER_GLOBALS_PROVIDERS, {provide: MapsAPILoader, useClass: LazyMapsAPILoader}],
    };
  }
}
