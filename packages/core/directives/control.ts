import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {ControlPosition} from '../services/google-maps-types';

/**
 * AgmMapControl allows to add a custom control to the map
 *
 * ### Example
 *
 * ```
 * <agm-control [position]="position" #my-id>
 *   <div content>
 *       <!-- my markup -->
 *   </div>
 * </agm-control>
 * ```
 *
 */
@Component({
  selector: 'agm-control',
  template: '<ng-content select="[content]"></ng-content>',
  styles:
      ['.agm-control {' +
       '  background: white;' +
       '  padding: 10px;' +
       '}'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'agm-control'}
})
export class AgmControl implements OnChanges {
  /* Position of the control */
  @Input() position: ControlPosition;

  constructor(private elm: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper) {}

  /* @internal */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] && this.position) {
      this._mapsWrapper.getControls().then((controls: any) => {
        controls[this.position].push(this.elm.nativeElement);
      });
    }
  }
}
