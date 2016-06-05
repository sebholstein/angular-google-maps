export var google: any;

export interface GoogleMap {
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng|LatLngLiteral): void;
  setZoom(zoom: number): void;
  addListener(eventName: string, fn: Function): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng|LatLngLiteral): void;
  getZoom(): number;
  setOptions(options: MapOptions): void;
}

export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng|LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string|MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  getLabel(): MarkerLabel;
  addListener(eventType: string, fn: Function): void;
}

export interface MarkerOptions {
  position: LatLng|LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string|MarkerLabel;
  draggable?: boolean;
  icon?: string;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MouseEvent { latLng: LatLng; }

export interface MapOptions {
  center?: LatLng|LatLngLiteral;
  zoom?: number;
  disableDoubleClickZoom?: boolean;
  disableDefaultUI?: boolean;
  backgroundColor?: string;
  draggableCursor?: string;
  draggingCursor?: string;
  keyboardShortcuts?: boolean;
  zoomControl?: boolean;
  styles?: MapTypeStyle[];
}

export interface MapTypeStyle {
  elementType: 'all'|'geometry'|'geometry.fill'|'geometry.stroke'|'labels'|'labels.icon'|
      'labels.text'|'labels.text.fill'|'labels.text.stroke';
  featureType: 'administrative'|'administrative.country'|'administrative.land_parcel'|
      'administrative.locality'|'administrative.neighborhood'|'administrative.province'|'all'|
      'landscape'|'landscape.man_made'|'landscape.natural'|'landscape.natural.landcover'|
      'landscape.natural.terrain'|'poi'|'poi.attraction'|'poi.business'|'poi.government'|
      'poi.medical'|'poi.park'|'poi.place_of_worship'|'poi.school'|'poi.sports_complex'|'road'|
      'road.arterial'|'road.highway'|'road.highway.controlled_access'|'road.local'|'transit'|
      'transit.line'|'transit.station'|'transit.station.airport'|'transit.station.bus'|
      'transit.station.rail'|'water';
  stylers: MapTypeStyler[];
}

/**
 *  If more than one key is specified in a single MapTypeStyler, all but one will be ignored.
 */
export interface MapTypeStyler {
  color?: string;
  gamma?: number;
  hue?: string;
  invert_lightness?: boolean;
  lightness?: number;
  saturation?: number;
  visibility?: string;
  weight?: number;
}

export interface InfoWindow {
  constructor(opts?: InfoWindowOptions): void;
  close(): void;
  getContent(): string|Node;
  getPosition(): LatLng;
  getZIndex(): number;
  open(map?: GoogleMap, anchor?: MVCObject): void;
  setContent(content: string|Node): void;
  setOptions(options: InfoWindowOptions): void;
  setPosition(position: LatLng|LatLngLiteral): void;
  setZIndex(zIndex: number): void;
}

export interface MVCObject { constructor(): void; }

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  content?: string|Node;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng|LatLngLiteral;
  zIndex?: number;
}
