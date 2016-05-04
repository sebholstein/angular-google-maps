import {Provider} from 'angular2/core';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';
import {WrapperContainer} from './services/api-wrapper-container';

// main modules
export * from './directives';
export * from './services';
export * from './events';

export const ANGULAR2_GOOGLE_MAPS_PROVIDERS: any[] = [
  new Provider(MapsAPILoader, {useClass: LazyMapsAPILoader}),
  new Provider(WrapperContainer, {useClass: WrapperContainer}),
];
