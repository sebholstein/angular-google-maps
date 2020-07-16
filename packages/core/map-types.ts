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
  MarkerIcon,
  Geocoder,
  GeocoderAddressComponent,
  GeocoderComponentRestrictions,
  GeocoderGeometry,
  GeocoderLocationType,
  GeocoderRequest,
  GeocoderResult,
  GeocoderStatus,
  MapTypeStyle,
  Padding,
  ControlPosition,
  OverviewMapControlOptions,
  PanControlOptions,
  RotateControlOptions,
  MapTypeControlOptions,
  MapTypeId,
  ScaleControlOptions,
  ScaleControlStyle,
  StreetViewControlOptions,
  ZoomControlOptions,
  ZoomControlStyle,
  FullscreenControlOptions,
  CircleOptions,
  Circle,
  Polyline,
  PolylineOptions,
  Polygon,
  PolygonOptions,
  Rectangle,
  RectangleOptions,
  Marker,
  MarkerOptions,
  GoogleSymbol,
} from './services/google-maps-types';

/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent {
  coords: LatLngLiteral;
  placeId?: string;
}
