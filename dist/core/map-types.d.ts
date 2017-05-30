import { LatLngLiteral } from './services/google-maps-types';
export { KmlMouseEvent, DataMouseEvent, LatLngBounds, LatLngBoundsLiteral, LatLngLiteral, PolyMouseEvent } from './services/google-maps-types';
/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent {
    coords: LatLngLiteral;
}
