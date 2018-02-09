import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';
import {Polyline} from './google-maps-types';
import {PolylineOptions} from './google-maps-types';
import {MapsAPILoader} from './maps-api-loader/maps-api-loader';

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
  createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}, addToMap: boolean = true):
      Promise<mapTypes.Marker> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      if (addToMap) {
        options.map = map;
      }
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

  /**
   * Creates a new google.map.Data layer for the current map
   */
  createDataLayer(options?: mapTypes.DataOptions): Promise<mapTypes.Data> {
    return this._map.then(m => {
      let data = new google.maps.Data(options);
      data.setMap(m);
      return data;
    });
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

  getMapTypeId(): Promise<mapTypes.MapTypeId> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getMapTypeId());
  }

  setZoom(zoom: number): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => map.setZoom(zoom));
  }

  getCenter(): Promise<mapTypes.LatLng> {
    return this._map.then((map: mapTypes.GoogleMap) => map.getCenter());
  }

  panTo(latLng: mapTypes.LatLng|mapTypes.LatLngLiteral): Promise<void> {
    return this._map.then((map) => map.panTo(latLng));
  }

  panBy(x: number, y: number): Promise<void> {
    return this._map.then((map) => map.panBy(x, y));
  }

  fitBounds(latLng: mapTypes.LatLngBounds|mapTypes.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.fitBounds(latLng));
  }

  panToBounds(latLng: mapTypes.LatLngBounds|mapTypes.LatLngBoundsLiteral): Promise<void> {
    return this._map.then((map) => map.panToBounds(latLng));
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

  setMapTypes(id: string, options: mapTypes.ImageMapTypeOptions): Promise<void> {
    return this._map.then((map: mapTypes.GoogleMap) => {
      let mapType = new google.maps.ImageMapType({
          getTileUrl: options.getTileUrl,
          tileSize: options.tileSize,
          maxZoom: options.maxZoom,
          minZoom: options.minZoom,
          radius: options.radius,
          name: options.name,
          alt: options.alt
      });
      map.mapTypes.set(id, mapType);
    });
  }

  USGSOverlay(bounds: number[], image: string) {
    return this._map.then((map: mapTypes.GoogleMap) => {
      let overlay = new google.maps.OverlayView();
      let boundsLatLng = new google.maps.LatLngBounds(
        new google.maps.LatLng(bounds[0], bounds[1]),
        new google.maps.LatLng(bounds[2], bounds[3])
      );

      // Initialize all properties.
      overlay.bounds_ = boundsLatLng;
      overlay.image_ = image;
      overlay.map_ = map;

      // Define a property to hold the image's div. We'll
      // actually create this div upon receipt of the onAdd()
      // method so we'll leave it null for now.
      overlay.div_ = null;

      overlay.setMap(map);

      overlay.onAdd = function() {
        let div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        let img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        div.appendChild(img);

        overlay.div_ = div;

        // Add the element to the "overlayLayer" pane.
        let panes = overlay.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      overlay.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        let overlayProjection = overlay.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        let sw = overlayProjection.fromLatLngToDivPixel(overlay.bounds_.getSouthWest());
        let ne = overlayProjection.fromLatLngToDivPixel(overlay.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        let div = overlay.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      overlay.onRemove = function() {
        overlay.div_.parentNode.removeChild(overlay.div_);
        overlay.div_ = null;
      };

      return overlay;
    });
  }
}
