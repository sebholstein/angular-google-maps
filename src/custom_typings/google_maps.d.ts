declare module google.maps {
  export class Map {
    constructor (el: HTMLElement, opts?: MapOptions);
    panTo(latLng: LatLng|LatLngOptions): void;
    setZoom(zoom: number): void;
    addListener(eventName: string, fn: Function): void;
    getCenter(): LatLng;
    getZoom(): number;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  export interface LatLngOptions {
    lat: number;
    lng: number;
  }

  export interface MapOptions {
    center: LatLng|LatLngOptions;
    zoom: number;
  }
}
