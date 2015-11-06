import {Injectable, Inject, NgZone, ElementRef} from 'angular2/angular2';
import {Observable} from 'rx';

/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  private _el: HTMLElement;
  private _map: google.maps.Map;

  private _centerChangeObservable: Observable<google.maps.LatLngLiteral>;
  private _zoomChangeObservable: Observable<number>;

  constructor(_el: HTMLElement, latitude: number, longitude: number, private _zone: NgZone) {
    this._el = _el;
    this._map = new google.maps.Map(this._el, {center: {lat: latitude, lng: longitude}});
    this._createObservables();
  }

  createEventObservable<E>(eventName: string, callback: (observer: Rx.Observer<E>) => void):
      Observable<E> {
    return Observable.create((observer: Rx.Observer<E>) => {
      this._map.addListener(eventName, () => { callback(observer); });
    });
  }

  private _createObservables() {
    this._centerChangeObservable = this.createEventObservable<google.maps.LatLngLiteral>(
        'center_changed', (observer: Rx.Observer<google.maps.LatLngLiteral>) => {
          const center = this._map.getCenter();
          observer.onNext({lat: center.lat(), lng: center.lng()});
        });
    this._zoomChangeObservable = this.createEventObservable<number>(
        'zoom_changed',
        (observer: Rx.Observer<number>) => { observer.onNext(this._map.getZoom()); });
  }

  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: google.maps.MarkerOptions = <google.maps.MarkerOptions>{}):
      google.maps.Marker {
    options.map = this._map;
    return new google.maps.Marker(options);
  }

  getZoomChangeObserable(): Observable<number> { return this._zoomChangeObservable; }

  getCenterChangeObservable(): Observable<google.maps.LatLngLiteral> {
    return this._centerChangeObservable;
  }

  setCenter(latLng: google.maps.LatLngLiteral) { this._map.setCenter(latLng); }

  setZoom(zoom: number) { this._map.setZoom(zoom); }

  getCenter(): google.maps.LatLng { return this._map.getCenter(); }
}

// todo: change name, because it's not a real factory.
// We have to create the instance with the component element and I don't see
// any chances to modify the viewproviders for <sebm-google-map> after the
// component instance is created.
@Injectable()
export class GoogleMapsAPIWrapperFactory {
  private _instance: GoogleMapsAPIWrapper;

  constructor(private _zone: NgZone) {}

  create(el: HTMLElement, latitude: number, longitude: number): GoogleMapsAPIWrapper {
    if (this._instance) {
      throw new Error('instance already created');
    }
    return this._instance = new GoogleMapsAPIWrapper(el, latitude, latitude, this._zone);
  }

  getInstance(): GoogleMapsAPIWrapper { return this._instance; }
}
