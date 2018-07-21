import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MapsAPILoader} from './maps-api-loader/maps-api-loader';

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  _map: Promise<google.maps.Map>;
  _mapResolver: (value?: google.maps.Map) => void;

  constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
    this._map =
        new Promise<google.maps.Map>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, mapOptions: google.maps.MapOptions): Promise<void> {
    return this._zone.runOutsideAngular( () => {
      return this._loader.load().then(() => {
        const map = new google.maps.Map(el, mapOptions);
        this._mapResolver(<google.maps.Map>map);
        return;
      });
    });
  }

  setMapOptions(options: google.maps.MapOptions) {
    this._map.then((m: google.maps.Map) => { m.setOptions(options); });
  }

  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: google.maps.MarkerOptions = <google.maps.MarkerOptions>{}, addToMap: boolean = true):
      Promise<google.maps.Marker> {
    return this._map.then((map: google.maps.Map) => {
      if (addToMap) {
        options.map = map;
      }
      return new google.maps.Marker(options);
    });
  }

  createInfoWindow(options?: google.maps.InfoWindowOptions): Promise<google.maps.InfoWindow> {
    return this._map.then(() => { return new google.maps.InfoWindow(options); });
  }

  /**
   * Creates a google.map.Circle for the current map.
   */
  createCircle(options: google.maps.CircleOptions): Promise<google.maps.Circle> {
    return this._map.then((map: google.maps.Map) => {
      options.map = map;
      return new google.maps.Circle(options);
    });
  }

  /**
   * Creates a google.map.Rectangle for the current map.
   */
  createRectangle(options: google.maps.RectangleOptions): Promise<google.maps.Rectangle> {
    return this._map.then((map: google.maps.Map) => {
      options.map = map;
      return new google.maps.Rectangle(options);
    });
  }

  createPolyline(options: google.maps.PolylineOptions): Promise<google.maps.Polyline> {
    return this.getNativeMap().then((map: google.maps.Map) => {
      let line = new google.maps.Polyline(options);
      line.setMap(map);
      return line;
    });
  }

  createPolygon(options: google.maps.PolygonOptions): Promise<google.maps.Polygon> {
    return this.getNativeMap().then((map: google.maps.Map) => {
      let polygon = new google.maps.Polygon(options);
      polygon.setMap(map);
      return polygon;
    });
  }

  /**
   * Creates a new google.map.Data layer for the current map
   */
  createDataLayer(options?: google.maps.Data.DataOptions): Promise<google.maps.Data> {
    return this._map.then(m => {
      let data = new google.maps.Data(options);
      data.setMap(m);
      return data;
    });
  }

  /**
   * Determines if given coordinates are insite a Polygon path.
   */
  containsLocation(latLng: google.maps.LatLng, polygon: google.maps.Polygon): boolean {
    return google.maps.geometry.poly.containsLocation(latLng, polygon);
  }

  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return new Observable((observer: Observer<E>) => {
      this._map.then((m: google.maps.Map) => {
        m.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
      });
    });
  }

  clearInstanceListeners() {
    this._map.then((map: google.maps.Map) => {
      google.maps.event.clearInstanceListeners(map);
    });
  }

  setCenter(latLng: google.maps.LatLngLiteral): Promise<void> {
    return this._map.then((map: google.maps.Map) => map.setCenter(latLng));
  }

  getZoom(): Promise<number> { return this._map.then((map: google.maps.Map) => map.getZoom()); }

  getBounds(): Promise<google.maps.LatLngBounds> {
    return this._map.then((map: google.maps.Map) => map.getBounds());
  }

  getMapTypeId(): Promise<string | google.maps.MapTypeId> {
    return this._map.then((map: google.maps.Map) => map.getMapTypeId());
  }

  setZoom(zoom: number): Promise<void> {
    return this._map.then((map: google.maps.Map) => map.setZoom(zoom));
  }

  getCenter(): Promise<google.maps.LatLng> {
    return this._map.then((map: google.maps.Map) => map.getCenter());
  }

  panTo(latLng: google.maps.LatLng|google.maps.LatLngLiteral): Promise<void> {
    return this._map.then((map) => map.panTo(latLng));
  }

  panBy(x: number, y: number): Promise<void> {
    return this._map.then((map) => map.panBy(x, y));
  }

  fitBounds(latLng: google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.fitBounds(latLng));
  }

  panToBounds(latLng: google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.panToBounds(latLng));
  }

  /**
   * Returns the native Google Maps Map instance. Be careful when using this instance directly.
   */
  getNativeMap(): Promise<google.maps.Map> { return this._map; }

  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName: string): Promise<void> {
    return this._map.then((m) => google.maps.event.trigger(m, eventName));
  }
}
