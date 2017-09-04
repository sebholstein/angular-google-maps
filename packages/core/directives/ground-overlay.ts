import {Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {LatLngBounds, LatLngBoundsLiteral} from '../services/google-maps-types';

import {MouseEvent} from './../services/google-maps-types';
import {GroundOverlayManager} from './../services/managers/ground-overlay-manager';

let layerId = 0;

@Directive({selector: 'agm-ground-overlay'})
export class AgmGroundOverlay implements OnInit, OnDestroy, OnChanges {
  private _addedToManager: boolean = false;
  private _id: string = (layerId++).toString();
  private static _groundOverlayOptions: string[] = ['imageUrl', 'bounds', 'opacity', 'clickable'];
  private _subscriptions: Subscription[] = [];

  /**
   * The url of the image to be displayed (required).
   */
  @Input() imageUrl: string;

  /**
   * The bounds of the image to be displayed (required).
   */
  @Input() bounds: LatLngBounds|LatLngBoundsLiteral;

  /**
   * If true, the ground overlay can receive mouse events. Defaults to true.
   */
  @Input() clickable: boolean = true;

  /**
   * The opacity of the overlay, expressed as a number between 0 and 1. Optional. Defaults to 1.
   */
  @Input() opacity: number = 1;

  /**
   * This event is fired when the ground overlay is clicked.
   */
  @Output() groundOverlayClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private _manager: GroundOverlayManager) {}

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addGroundOverlay(this);
    this._addedToManager = true;
    this._addEventListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._addedToManager) {
      return;
    }
    this._updateGroundOverlayOptions(changes);
  }

  private _updateGroundOverlayOptions(changes: SimpleChanges) {
    const options = Object.keys(changes)
                        .filter(k => AgmGroundOverlay._groundOverlayOptions.indexOf(k) !== -1)
                        .reduce((obj: any, k: string) => {
                          obj[k] = changes[k].currentValue;
                          return obj;
                        }, {});
    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _addEventListeners() {
    const listeners = [
      {name: 'click', handler: (ev: MouseEvent) => this.groundOverlayClick.emit(ev)},
    ];
    listeners.forEach((obj) => {
      const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }

  /** @internal */
  ngOnDestroy() {
    this._manager.deleteGroundOverlay(this);
    // unsubscribe all registered observable subscriptions
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  /** @internal */
  id(): string {
    return this._id;
  }

  /** @internal */
  toString(): string {
    return `AgmGroundOverlay-${this._id.toString()}`;
  }
}
