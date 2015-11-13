declare module google.maps {
  export class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    panTo(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    addListener(eventName: string, fn: Function): void;
    getCenter(): LatLng;
    setCenter(latLng: LatLng | LatLngLiteral): void;
    getZoom(): number;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  export class Marker {
    constructor(options?: MarkerOptions);
    setMap(map: Map): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setTitle(title: string): void;
    setLabel(label: string | MarkerLabel): void;
  }

  export interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    title?: string;
    map?: Map;
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
  }
}
