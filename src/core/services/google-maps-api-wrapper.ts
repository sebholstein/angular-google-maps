import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';
import { Polyline } from './google-maps-types';
import { PolylineOptions } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

// todo: add types for this
declare var google: any;

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  private _map: Promise<mapTypes.GoogleMap>;
  private _mapResolver: (value?: mapTypes.GoogleMap) => void;
  private _trafficLayerExist: boolean = false;
  private _trafficLayer: any;
  private _drawingManager: any;

  constructor(private _loader: MapsAPILoader, private _zone: NgZone) {
    this._map =
      new Promise<mapTypes.GoogleMap>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void> {
    return this._loader.load().then(() => {
      const map = new google.maps.Map(el, mapOptions);
      this._mapResolver(<mapTypes.GoogleMap>map);
      return;
    });
  }

  setMapOptions(options: mapTypes.MapOptions) {
    this._map.then((m: mapTypes.GoogleMap) => { m.setOptions(options); });
  }

  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):
    Promise<mapTypes.Marker> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      options.map = map;
      return new google.maps.Marker(options);
    });
  }

  createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow> {
    return this._map.then(() => { return new google.maps.InfoWindow(options); });
  }

  /**
   * Creates a google.map.Circle for the current map.
   */
  createCircle(options: mapTypes.CircleOptions): Promise<mapTypes.Circle> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      options.map = map;
      return new google.maps.Circle(options);
    });
  }

  createPolyline(options: PolylineOptions): Promise<Polyline> {
    return this.getNativeMap().then((map: mapTypes.GoogleMap) => {
      let line = new google.maps.Polyline(options);
      line.setMap(map);
      return line;
    });
  }

  createPolygon(options: mapTypes.PolygonOptions): Promise<mapTypes.Polyline> {
    return this.getNativeMap().then((map: mapTypes.GoogleMap) => {
      let polygon = new google.maps.Polygon(options);
      polygon.setMap(map);
      return polygon;
    });
  }

  attachDrawingManager(controlPosition: mapTypes.ControlPosition = 9, drawingModes: mapTypes.DrawingModes = ['polygon'], polygonOptions: mapTypes.PolygonOptions, circleOptions?: mapTypes.DrawingCircleOptions, markerIcon: string = null, ) {
    return this.getNativeMap().then((map: mapTypes.GoogleMap) => {

      this._drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition[mapTypes.ControlPosition[controlPosition]],
          drawingModes: drawingModes
        },
        markerOptions: { icon: markerIcon },
        circleOptions: circleOptions,
        polygonOptions: polygonOptions
      });
      this._drawingManager.setMap(map);
      return this._drawingManager;
    });
  }

  attachPolygonListeners<T>(eventName: string): Observable<T> {
    return Observable.create((observer: Observer<any>) => {
      this._drawingManager.addListener(eventName, (polygon: any) => this._zone.run(() => observer.next(polygon)));
    });
  }

  updateDrawingManagerOptions(drawingModes: mapTypes.DrawingModes = [], controlPosition: mapTypes.ControlPosition = 9) {
    console.log('updateDrawingManagerOptions', this._drawingManager);
    console.log('drawingModes', drawingModes);
    if (drawingModes.length === 0) {
      this._drawingManager.setMap(null);
    } else {
      this.getNativeMap().then((map: mapTypes.GoogleMap) => {
        this._drawingManager.setOptions({
          drawingMode: drawingModes[0],
          drawingControlOptions: {
            position: google.maps.ControlPosition[mapTypes.ControlPosition[controlPosition]],
            drawingModes: drawingModes
          }
        });
        this._drawingManager.setMap(map);
      });
    }
  }

  /**
   * Determines if given coordinates are insite a Polygon path.
   */
  containsLocation(latLng: mapTypes.LatLngLiteral, polygon: mapTypes.Polygon): Promise<boolean> {
    return google.maps.geometry.poly.containsLocation(latLng, polygon);
  }

  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this._map.then((m: mapTypes.GoogleMap) => {
        m.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
      });
    });
  }

  setCenter(latLng: mapTypes.LatLngLiteral): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setCenter(latLng));
  }

  getZoom(): Promise<number> { return this._map.then((map: mapTypes.GoogleMap) => map.getZoom()); }

  getBounds(): Promise<mapTypes.LatLngBounds> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getBounds());
  }

  setZoom(zoom: number): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setZoom(zoom));
  }

  getCenter(): Promise<mapTypes.LatLng> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getCenter());
  }

  panTo(latLng: mapTypes.LatLng | mapTypes.LatLngLiteral): Promise<void> {
    return this._map.then((map) => map.panTo(latLng));
  }

  fitBounds(latLng: mapTypes.LatLngBounds | mapTypes.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.fitBounds(latLng));
  }

  handleTrafficLayer(handle: boolean) {
    if (!handle && this._trafficLayerExist) {
      this._trafficLayer.setMap(null);
      this._trafficLayerExist = false;
    }
    if (!this._trafficLayerExist && handle) {
      this._trafficLayer = new google.maps.TrafficLayer();
      this._map.then((map) => this._trafficLayer.setMap(map));
      this._trafficLayerExist = true;
    }
  }

  panToBounds(latLng: mapTypes.LatLngBounds | mapTypes.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.panToBounds(latLng));
  }

  createLatLngBounds(): Promise<void> {
    return this.getNativeMap().then(() => {
      return new google.maps.LatLngBounds();
    });
  }

  /**
   * Returns the native Google Maps Map instance. Be careful when using this instance directly.
   */
  getNativeMap(): Promise<mapTypes.GoogleMap> { return this._map; }

  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName: string): Promise<void> {
    return this._map.then((m) => google.maps.event.trigger(m, eventName));
  }

  addExtraControll(control: mapTypes.ExtraControl) {
    return this._map.then((map) => {
      let _controlDiv = document.createElement('div');
      let _controlUI = document.createElement('div');
      _controlUI.className = control.class || 'control-ui';
      _controlUI.style.textAlign = 'center';
      _controlUI.title = control.title || 'Click to recenter the map';
      _controlDiv.appendChild(_controlUI);
      let _controlText = document.createElement('div');
      _controlText.className = 'control-text';
      _controlText.innerHTML = control.text || 'Center Map';
      _controlUI.appendChild(_controlText);

      let position = control.position as keyof typeof mapTypes.ControlPosition || 'TOP_CENTER';

      const controllPosition = map.controls[google.maps.ControlPosition[position]].push(_controlDiv);

      const observable = Observable.create((observer: Observer<any>) => {
        _controlUI.addEventListener('click', () => {
          this._zone.run(() => observer.next(control.type));
        });
      });

      return { 'position': position, 'controllPosition': controllPosition, 'subscription': observable };

    });
  }
}
