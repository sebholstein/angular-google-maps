import {MapsAPILoader} from './maps-api-loader/maps-api-loader';
import {LatLngLiteral, LatLngBounds, LatLng} from './google-maps-types';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/fromPromise';

declare var google: any;

@Injectable()
export class FitBoundsService {
  private _boundsSubject: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  /** @internal */
  _boundsChangeDebounceTime: number = 200;

  private _boundsResult: Map<any, LatLng|LatLngLiteral> = new Map();
  private _boundsObservable: Observable<LatLngBounds>;

  private _emitPaused: boolean = false;

  constructor(loader: MapsAPILoader) {
    this._boundsObservable = this._boundsSubject
      .skipWhile(() => this._emitPaused)
      .mergeMap(() => Observable.fromPromise(loader.load()))
      .debounce(() => Observable.timer(this._boundsChangeDebounceTime))
      .map(() => {
        console.log('MAP');
        const bounds = (new google.maps.LatLngBounds() as LatLngBounds);
        this._boundsResult.forEach((b) => bounds.extend(b));
        this._boundsResult.forEach((b) => console.log(b.lat, b.lng));
        return bounds;
      })
      .distinctUntilChanged((v1: LatLngBounds, v2: LatLngBounds) => {
        return v1.toString() === v2.toString();
      });
  }

  addToBoundsResult(token: any, latLng: LatLng|LatLngLiteral): void {
    this._boundsResult.set(token, latLng);
    this._boundsSubject.next(null);
  }

  removeFromBoundsResult(token: any): void {
    this._boundsResult.delete(token);
    this._boundsSubject.next(null);
  }

  getBounds(): Observable<LatLngBounds|null> {
    return this._boundsObservable;
  }
}
