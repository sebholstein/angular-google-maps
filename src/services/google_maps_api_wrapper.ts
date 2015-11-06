import {Injectable, Inject, NgZone, ElementRef} from 'angular2/angular2';
import {Observable} from 'rx';

/**
 * Wrapper class that handles the communication with the Google Maps Javascript API v3
 */
@Injectable()
export class GoogleMapsAPIWrapper {
  private _el: HTMLElement;
  private _map: google.maps.Map;
  private _isInitialized: boolean;

  private _centerChangeObservable: Observable<google.maps.LatLngLiteral>;
  private _zoomChangeObservable: Observable<number>;

  constructor(_el: HTMLElement, latitude: number, longitude: number, private _zone: NgZone) {
    this._isInitialized = true;
    this._el = _el;
    this._map = new google.maps.Map(this._el, {
      center: {
        lat: latitude,
        lng: longitude
      }
    });
    this._createObservables();
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

  private _createObservables() {
    this._centerChangeObservable = this.createEventObservable<google.maps.LatLngLiteral>('center_changed', (observer: Rx.Observer<google.maps.LatLngLiteral>) => {
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

  getCenterChangeObservable(): Observable<google.maps.LatLngLiteral> {
    return this._centerChangeObservable;
  }

  setCenter(latLng: google.maps.LatLngLiteral) {
    this._map.setCenter(latLng);
  }

  setZoom(zoom: number) {
    this._map.setZoom(zoom);
  }

  getCenter(): google.maps.LatLng {
    if (!this._isInitialized) {
      return;
    }
    return this._map.getCenter();
  }

  isInitialized(): boolean {
    return this._isInitialized;
  }
}

@Injectable()
export class GoogleMapsAPIWrapperFactory {
  constructor(private _zone: NgZone) {}
  create(el: HTMLElement, latitude: number, longitude: number): GoogleMapsAPIWrapper {
    return new GoogleMapsAPIWrapper(el, latitude, latitude, this._zone);
  }
}
