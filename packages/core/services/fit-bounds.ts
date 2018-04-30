import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { flatMap, map, skipWhile } from 'rxjs/operators';
import { LatLng, LatLngBounds, LatLngLiteral } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

declare var google: any;

export interface FitBoundsDetails {
  latLng: LatLng|LatLngLiteral;
}

export abstract class FitBoundsAccessor {
  abstract getFitBoundsDetails$(): Observable<FitBoundsDetails>;
}

@Injectable()
export class FitBoundsService {
  readonly bounds$: Observable<LatLngBounds>;
  protected readonly _boundsChangeDebounceTime$: BehaviorSubject<number> = new BehaviorSubject<number>(200);
  protected readonly _includeInBounds$: BehaviorSubject<Map<string, LatLng | LatLngLiteral>> = new BehaviorSubject<Map<string, LatLng | LatLngLiteral>>(new Map<string, LatLng | LatLngLiteral>());
  protected _emitPaused: boolean = false;

  constructor(loader: MapsAPILoader) {
    this.bounds$ = from(loader.load()).pipe(
      flatMap(() => this._includeInBounds$),
      skipWhile(() => this._emitPaused),
      // debounce(() => this._boundsChangeDebounceTime$),
      map((includeInBounds: Map<string, LatLng | LatLngLiteral>) => {
        const bounds = new google.maps.LatLngBounds() as LatLngBounds;
        includeInBounds.forEach(b => bounds.extend(b));
        return bounds;
      })
    );
  }

  addToBounds(latLng: LatLng | LatLngLiteral) {
    const id = this._createIdentifier(latLng);
    if (this._includeInBounds$.value.has(id)) {
      return;
    }
    const map = this._includeInBounds$.value;
    map.set(id, latLng);
    this._includeInBounds$.next(map);
  }

  removeFromBounds(latLng: LatLng|LatLngLiteral) {
    const map = this._includeInBounds$.value;
    map.delete(this._createIdentifier(latLng));
    this._includeInBounds$.next(map);
  }

  changeFitBoundsDebounceTime(timeMs: number) {
    this._boundsChangeDebounceTime$.next(timeMs);
  }

  protected _createIdentifier(latLng: LatLng|LatLngLiteral): string {
    return `${latLng.lat}+${latLng.lng}`;
  }
}
