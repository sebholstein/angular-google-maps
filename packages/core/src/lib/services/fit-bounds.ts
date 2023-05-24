import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, timer } from 'rxjs';
import {
  map,
  mergeMap,
  sample,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';

export interface FitBoundsDetails {
  latLng: google.maps.LatLng | google.maps.LatLngLiteral;
}

/**
 * @internal
 */
export type BoundsMap = Map<string, google.maps.LatLng | google.maps.LatLngLiteral>;

/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 */
export abstract class FitBoundsAccessor {
  abstract getFitBoundsDetails$(): Observable<FitBoundsDetails>;
}

/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
@Injectable()
export class FitBoundsService {
  protected readonly bounds$: Observable<google.maps.LatLngBounds>;
  protected readonly _boundsChangeSampleTime$ = new BehaviorSubject<number>(200);
  protected readonly _includeInBounds$ = new BehaviorSubject<BoundsMap>(new Map<string, google.maps.LatLng | google.maps.LatLngLiteral>());

  constructor(loader: MapsAPILoader) {
    this.bounds$ = from(loader.load()).pipe(
      mergeMap(() => this._includeInBounds$),
      sample(
        this._boundsChangeSampleTime$.pipe(switchMap(time => timer(0, time))),
      ),
      map(includeInBounds => this._generateBounds(includeInBounds)),
      shareReplay(1),
    );
  }

  private _generateBounds(
    includeInBounds: Map<string, google.maps.LatLng | google.maps.LatLngLiteral>
  ) {
    const bounds = new google.maps.LatLngBounds();
    includeInBounds.forEach(b => bounds.extend(b));
    return bounds;
  }

  addToBounds(latLng: google.maps.LatLng | google.maps.LatLngLiteral) {
    const id = this._createIdentifier(latLng);
    if (this._includeInBounds$.value.has(id)) {
      return;
    }
    const boundsMap = this._includeInBounds$.value;
    boundsMap.set(id, latLng);
    this._includeInBounds$.next(boundsMap);
  }

  removeFromBounds(latLng: google.maps.LatLng | google.maps.LatLngLiteral) {
    const boundsMap = this._includeInBounds$.value;
    boundsMap.delete(this._createIdentifier(latLng));
    this._includeInBounds$.next(boundsMap);
  }

  changeFitBoundsChangeSampleTime(timeMs: number) {
    this._boundsChangeSampleTime$.next(timeMs);
  }

  getBounds$(): Observable<google.maps.LatLngBounds> {
    return this.bounds$;
  }

  protected _createIdentifier(latLng: google.maps.LatLng | google.maps.LatLngLiteral): string {
    return `${latLng.lat}+${latLng.lng}`;
  }
}
