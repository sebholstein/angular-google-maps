import {ModuleWithProviders, NgModule, provide} from '@angular/core';

import {GOOGLE_MAPS_DIRECTIVES} from './directives-const';
import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {BROWSER_GLOBALS_PROVIDERS} from './utils/browser-globals';

// main modules
export * from './directives';
export * from './services';
export * from './map-types';

// Google Maps types
export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle} from './services/google-maps-types';

/** @deprecated */
export const GOOGLE_MAPS_PROVIDERS: any[] = [
  BROWSER_GLOBALS_PROVIDERS,
  provide(MapsAPILoader, {useClass: LazyMapsAPILoader}),
];

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 *
 * @experimental
 */
@NgModule({declarations: GOOGLE_MAPS_DIRECTIVES, exports: GOOGLE_MAPS_DIRECTIVES})
export class AgmCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AgmCoreModule,
      providers: GOOGLE_MAPS_PROVIDERS,
    };
  }
}
