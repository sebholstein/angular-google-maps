import {Provider} from 'angular2/angular2';

import {MapsAPILoader} from './services/maps_api_loader/maps_api_loader';
import {LazyMapsAPILoader} from './services/maps_api_loader/lazy_maps_api_loader';

// main module
export * from './components';
export * from './services';

export const ANGULAR2_GOOGLE_MAPS_PROVIDERS: any[] = [
  new Provider(MapsAPILoader, {useClass: LazyMapsAPILoader}),
];
