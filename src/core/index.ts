// main modules
export * from './directives';
export * from './services';
export * from './map-types';

// Google Maps types
export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle, PolyMouseEvent} from './services/google-maps-types';

// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/
export {AgmCoreModule} from './core-module';
