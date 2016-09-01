import {ModuleWithProviders, NgModule, provide} from '@angular/core';

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
export * from './directives';
export * from './services';
export * from './map-types';

// Google Maps types
export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle} from './services/google-maps-types';

const GOOGLE_MAPS_PROVIDERS: any[] = [
  BROWSER_GLOBALS_PROVIDERS,
  provide(MapsAPILoader, {useClass: LazyMapsAPILoader}),
];

const CORE_DIRECTIVES: any[] = [
  SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
  SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
];

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
@NgModule({declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES})
export class AgmCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AgmCoreModule,
      providers: GOOGLE_MAPS_PROVIDERS,
    };
  }
}
