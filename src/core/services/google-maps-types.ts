export var google: any;

export interface GoogleMap extends MVCObject {
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng|LatLngLiteral): void;
  setZoom(zoom: number): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng|LatLngLiteral): void;
  getBounds(): LatLngBounds;
  getZoom(): number;
  setOptions(options: MapOptions): void;
  panToBounds(latLngBounds: LatLngBounds|LatLngBoundsLiteral): void;
  fitBounds(bounds: LatLngBounds|LatLngBoundsLiteral): void;
}

export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker extends MVCObject {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng|LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string|MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  setOpacity(opacity: number): void;
  setVisible(visible: boolean): void;
  setZIndex(zIndex: number): void;
  getLabel(): MarkerLabel;
}

export interface MarkerOptions {
  position: LatLng|LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string|MarkerLabel;
  draggable?: boolean;
  icon?: string;
  opacity?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

export interface Circle extends MVCObject {
  getBounds(): LatLngBounds;
  getCenter(): LatLng;
  getDraggable(): boolean;
  getEditable(): boolean;
  getMap(): GoogleMap;
  getRadius(): number;
  getVisible(): boolean;
  setCenter(center: LatLng|LatLngLiteral): void;
  setDraggable(draggable: boolean): void;
  setEditable(editable: boolean): void;
  setMap(map: GoogleMap): void;
  setOptions(options: CircleOptions): void;
  setRadius(radius: number): void;
  setVisible(visible: boolean): void;
}

export interface CircleOptions {
  center?: LatLng|LatLngLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  map?: GoogleMap;
  radius?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: 'CENTER'|'INSIDE'|'OUTSIDE';
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface LatLngBounds {
  contains(latLng: LatLng): boolean;
  equals(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  extend(point: LatLng): void;
  getCenter(): LatLng;
  getNorthEast(): LatLng;
  getSouthWest(): LatLng;
  intersects(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  isEmpty(): boolean;
  toJSON(): LatLngBoundsLiteral;
  toSpan(): LatLng;
  toString(): string;
  toUrlValue(precision?: number): string;
  union(other: LatLngBounds|LatLngBoundsLiteral): LatLngBounds;
}

export interface LatLngBoundsLiteral {
  east: number;
  north: number;
  south: number;
  west: number;
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
  draggable?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  keyboardShortcuts?: boolean;
  zoomControl?: boolean;
  styles?: MapTypeStyle[];
  streetViewControl?: boolean;
  scaleControl?: boolean;
  mapTypeControl?: boolean;
}

export interface MapTypeStyle {
  elementType?: 'all'|'geometry'|'geometry.fill'|'geometry.stroke'|'labels'|'labels.icon'|
      'labels.text'|'labels.text.fill'|'labels.text.stroke';
  featureType?: 'administrative'|'administrative.country'|'administrative.land_parcel'|
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

export interface MVCObject { addListener(eventName: string, handler: Function): MapsEventListener; }

export interface MapsEventListener { remove(): void; }

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

export interface Point {
  x: number;
  y: number;
  equals(other: Point): boolean;
  toString(): string;
}

export interface GoogleSymbol {
  anchor?: Point;
  fillColor?: string;
  fillOpacity?: string;
  labelOrigin?: Point;
  path?: string;
  rotation?: number;
  scale?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}

export interface IconSequence {
  fixedRotation?: boolean;
  icon?: GoogleSymbol;
  offset?: string;
  repeat?: string;
}

export interface PolylineOptions {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  geodesic?: boolean;
  icon?: Array<IconSequence>;
  map?: GoogleMap;
  path?: Array<LatLng>|Array<LatLng|LatLngLiteral>;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface Polyline extends MVCObject {
  getDraggable(): boolean;
  getEditable(): boolean;
  getMap(): GoogleMap;
  getPath(): Array<LatLng>;
  getVisible(): boolean;
  setDraggable(draggable: boolean): void;
  setEditable(editable: boolean): void;
  setMap(map: GoogleMap): void;
  setOptions(options: PolylineOptions): void;
  setPath(path: Array<LatLng|LatLngLiteral>): void;
  setVisible(visible: boolean): void;
}

/**
 * PolyMouseEvent gets emitted when the user triggers mouse events on a polyline.
 */
export interface PolyMouseEvent extends MouseEvent {
  edge: number;
  path: number;
  vertex: number;
}

export interface PolygonOptions {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  geodesic?: boolean;
  icon?: Array<IconSequence>;
  map?: GoogleMap;
  paths?: Array<LatLng|LatLngLiteral>|Array<Array<LatLng|LatLngLiteral>>;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface Polygon extends MVCObject {
  getDraggable(): boolean;
  getEditable(): boolean;
  getMap(): GoogleMap;
  getPath(): Array<LatLng>;
  getPaths(): Array<Array<LatLng>>;
  getVisible(): boolean;
  setDraggable(draggable: boolean): void;
  setEditable(editable: boolean): void;
  setMap(map: GoogleMap): void;
  setPath(path: Array<LatLng>|Array<LatLng|LatLngLiteral>): void;
  setOptions(options: PolygonOptions): void;
  setPaths(paths: Array<Array<LatLng|LatLngLiteral>>|Array<LatLng|LatLngLiteral>): void;
  setVisible(visible: boolean): void;
}
