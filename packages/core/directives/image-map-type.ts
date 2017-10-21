import {Directive, OnDestroy, OnChanges, Input} from '@angular/core';

import {ImageMapTypeManager} from '../services/managers/image-map-type-manager';
import * as mapTypes from '../services/google-maps-types';

/**
 * AgmImageMapType renders a map marker inside a {@link AgmMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-image-map-type'
})
export class AgmImageMapType implements OnDestroy, OnChanges {
  /**
   *
   */
  @Input() options: mapTypes.ImageMapTypeOptions;

  /**
   *
   */
  @Input() mapLayerId: string;

  constructor(private _mapTypeManager: ImageMapTypeManager) {}

  /* @internal */
  ngOnChanges() { this._mapTypeManager.addMapType(this.mapLayerId, this.options); }

  /** @internal */
  toString(): string { return 'ImageMapType-' + this.mapLayerId.toString(); }

  /** @internal */
  ngOnDestroy() {}
}
