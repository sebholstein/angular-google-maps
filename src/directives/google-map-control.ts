import {Component, ElementRef, OnInit, EventEmitter} from 'angular2/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {MapControlPosition} from '../services/google-maps-types';

/**
 * SebmGoogleMapControl renders a google map control inside inside a {@link SebmGoogleMap}.
 *
 * position input must be of the type MapControlPosition
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleMapControl} from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapControl],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-control [position]="position" (controlClick)=controlClick()">
 *        <img src="an_image.png">
 *      </sebm-google-map-control>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */

@Component({
  selector: 'sebm-google-map-control',
  inputs: ['position'],
  outputs: ['controlClick'],
  template: `
    <div class='sebm-google-map-control-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class SebmGoogleMapControl implements OnInit {
  /**
   * The position of the control inside the map div.
   */
  position: MapControlPosition;

  /**
   * This event emitter gets emitted when the user clicks on the control.
   */
  controlClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Holds the native element that is used for the map control.
   */
  content: Node;

  constructor(private _el: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper) {}

  /** @internal */
  ngOnInit() {
    this.content = this._el.nativeElement.querySelector('.sebm-google-map-control-content');
    var controlDiv = document.createElement('div');
    controlDiv.appendChild(this.content);
    controlDiv.onclick = () => { this.controlClick.next(null); };
    this._mapsWrapper.createControl(this.position, controlDiv);
  }
}
