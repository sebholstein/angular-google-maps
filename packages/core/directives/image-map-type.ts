import {Directive, OnChanges, Input} from '@angular/core';

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
 *      <agm-image-map-type [mapLayerId]="'openstreetmap'" [options]=imageMapOptions>
 *      </agm-image-map-type>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-image-map-type'
})
export class AgmImageMapType implements OnChanges {
  /**
   * The options of google.maps.ImageMapType.
   */
  @Input() options: mapTypes.ImageMapTypeOptions;

  /**
   * The mapLayerId that defines the name of new layer.
   */
  @Input() mapLayerId: string;

  constructor(private _mapTypeManager: ImageMapTypeManager) {}

  /* @internal */
  ngOnChanges() { this._mapTypeManager.addMapType(this.mapLayerId, this.options); }

  /** @internal */
  toString(): string { return 'ImageMapType-' + this.mapLayerId.toString(); }
}
