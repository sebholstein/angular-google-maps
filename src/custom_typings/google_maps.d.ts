declare module google.maps {
  export class Map {
    constructor (el: HTMLElement, opts?: MapOptions);
    panTo(latLng: LatLng|LatLngLiteral): void;
    setZoom(zoom: number): void;
    addListener(eventName: string, fn: Function): void;
    getCenter(): LatLng;
    setCenter(latLng: LatLng|LatLngLiteral): void;
    getZoom(): number;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export interface MapOptions {
    center?: LatLng|LatLngLiteral;
    zoom?: number;
  }
}
