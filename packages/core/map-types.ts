import { LatLngLiteral } from './services/google-maps-types';

// exported map types
export {
  KmlMouseEvent,
  DataMouseEvent,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLng,
  LatLngLiteral,
  PolyMouseEvent,
  MarkerLabel,
  Geocoder,
  GeocoderAddressComponent,
  GeocoderComponentRestrictions,
  GeocoderGeometry,
  GeocoderLocationType,
  GeocoderRequest,
  GeocoderResult,
  GeocoderStatus,
} from './services/google-maps-types';

/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent {
  coords: LatLngLiteral;
  placeId?: string;
}
