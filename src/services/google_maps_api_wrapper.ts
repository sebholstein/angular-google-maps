import {Injectable, Inject, NgZone} from 'angular2/angular2';
import {Observable} from 'rx';

/**
 * Wrapper class that handles the communication with the Google Maps Javascript API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  private _el: HTMLElement;
  private _map: google.maps.Map;
  private _isInitialized: boolean;

  private _centerChangeObservable: Observable<google.maps.LatLngOptions>;
  private _zoomChangeObservable: Observable<number>;

  constructor(private _zone: NgZone) {
  }

  createEventObservable<E>(eventName: string, callback: (observer: Rx.Observer<E>) => void): Observable<E> {
      return Observable.create((observer: Rx.Observer<E>) => {
        this._map.addListener(eventName, () => {
          this._zone.run(() => {
            callback(observer);
          });
        });
    });
  }

  initialize(_el: HTMLElement, latitude: number, longitude: number, zoom: number) {
    if (this._isInitialized) {
      throw new Error('GooelMapsAPIWrapper is already initialized!');
    }
    this._isInitialized = true;
    this._el = _el;
    this._map = new google.maps.Map(this._el, {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: zoom
    });
    this._createObservables();
  }

  private _createObservables() {
    this._centerChangeObservable = this.createEventObservable<google.maps.LatLngOptions>('center_changed', (observer: Rx.Observer<google.maps.LatLngOptions>) => {
      const center = this._map.getCenter();
      observer.onNext({
        lat: center.lat(),
        lng: center.lng()
      });
    });
    this._zoomChangeObservable = this.createEventObservable<number>('zoom_changed', (observer: Rx.Observer<number>) => {
      observer.onNext(this._map.getZoom());
    });
  }

  getZoomChangeObserable(): Observable<number> {
    return this._zoomChangeObservable;
  }

  getCenterChangeObservable(): Observable<google.maps.LatLngOptions> {
    return this._centerChangeObservable;
  }

  panTo(latLng: google.maps.LatLngOptions) {
    this._map.panTo(latLng);
  }

  getCenter(): google.maps.LatLng {
    return this._map.getCenter();
  }

  isInitialized(): boolean {
    return this._isInitialized;
  }
}
