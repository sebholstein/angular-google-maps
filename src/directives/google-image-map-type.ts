import {Directive, OnDestroy, OnChanges} from '@angular/core';
import {ImageMapTypeManager} from '../services/image-map-type-manager';
import {ImageMapTypeOptions} from '../services/google-maps-types';

/**
 * SebmGoogleImageMapType renders custom tiles on a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleImageMapType, ImageMapTypeOptions, ImageMapTypeCoord} from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleImageMapType],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-image-map-type [mapLayerId]="'MyMap'"
 * [options]=imageMapOptions></sebm-google-image-map-type>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'sebm-google-image-map-type',
  inputs: ['options', 'mapLayerId'],
})
export class SebmGoogleImageMapType implements OnDestroy,
    OnChanges {
  /**
   * Map Type Layer Option.
   */
  options: ImageMapTypeOptions;
  /**
   * Map Type Layer Ref Id.
   */
  mapLayerId: string;

  constructor(private _mapTypeManager: ImageMapTypeManager) {}

  /* @internal */
  ngOnChanges() { this._mapTypeManager.addMapType(this.mapLayerId, this.options); }

  /** @internal */
  toString(): string { return 'SebmGoogleImageMapType-' + this.mapLayerId.toString(); }

  /** @internal */
  ngOnDestroy() {}
}
