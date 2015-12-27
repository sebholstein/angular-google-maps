export var google: any;

export interface GoogleMap {
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng | LatLngLiteral): void;
  setZoom(zoom: number): void;
  addListener(eventName: string, fn: Function): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng | LatLngLiteral): void;
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
  setPosition(latLng: LatLng | LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string | MarkerLabel): void;
  getLabel(): MarkerLabel;
  addListener(eventType: string, fn: Function): void;
}

export interface MarkerOptions {
  position: LatLng | LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string | MarkerLabel;
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

export interface MapOptions {
  center?: LatLng | LatLngLiteral;
  zoom?: number;
  disableDoubleClickZoom?: boolean;
}
