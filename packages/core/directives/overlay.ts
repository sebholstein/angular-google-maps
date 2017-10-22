import {Directive, OnChanges, Input} from '@angular/core';

import {OverlayManager} from '../services/managers/overlay-manager';
import * as mapTypes from '../services/google-maps-types';

/**
 * AgmOverlay renders a map marker inside a {@link AgmMap}.
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
 *      <agm-overlay [bounds]="bounds" [image]="image">
 *      </agm-overlay>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-overlay'
})
export class AgmOverlay implements OnChanges {
  /**
   * The options of google.maps.ImageMapType.
   */
  @Input() bounds: mapTypes.LatLngBounds;

  /**
   * The mapLayerId that defines the name of new layer.
   */
  @Input() image: string;

  constructor(private _mapTypeManager: OverlayManager) {}

  /* @internal */
  ngOnChanges() { this._mapTypeManager.USGSOverlay(this.bounds, this.image); }
}
