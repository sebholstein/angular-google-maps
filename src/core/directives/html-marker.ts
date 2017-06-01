import { Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange,
  AfterContentInit, ContentChildren, QueryList, Input, Output
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MouseEvent } from '../map-types';
import * as mapTypes from '../services/google-maps-types';
import { MarkerManager } from '../services/managers/marker-manager';

let markerId = 0;

/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
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
 *      <agm-html-marker [latitude]="lat" [longitude]="lng" [innerHTML]="'<h4>M</h4>'">
 *      </agm-html-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-html-marker'
})
export class AgmHtmlMarker implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * The latitude position of the marker.
   */
  @Input() latitude: number;

  /**
   * The longitude position of the marker.
   */
  @Input() longitude: number;

  /**
   * The innerHTML of the marker.
   */
  @Input() innerHTML: HTMLElement;

  /**
  * Attach class for the label for future styling
  */
  @Input() className: string = 'default';

  /**
   * This event emitter gets emitted when the user clicks on the marker.
   */
  @Output() markerClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the user stops dragging the marker.
   */
  @Output() dragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user mouses over the marker.
   */
  @Output() mouseOver: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user mouses outside the marker.
   */
  @Output() mouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  private _markerAddedToManger: boolean = false;
  private _id: string;
  private _observableSubscriptions: Subscription[] = [];

  constructor(private _markerManager: MarkerManager) { this._id = (markerId++).toString(); }

  /* @internal */
  ngAfterContentInit() {
  }

  /** @internal */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }
    if (!this._markerAddedToManger) {
      this._markerManager.addHtmlMarker(this);
      this._markerAddedToManger = true;
      this._addEventListeners();
      return;
    }
    if (changes['latitude'] || changes['longitude']) {
      this._markerManager.updateMarkerPosition(this);
    }
    if (changes['innerHTML']) {
      this._markerManager.updateInnerHTML(this);
    }
    if (changes['className']) {
      this._markerManager.updateInnerHTMLClass(this);
    }
  }

  private _addEventListeners() {
    const cs = this._markerManager.createEventObservableHTMLMarker('click', this).subscribe(() => {
      this.markerClick.emit(null);
    });
    this._observableSubscriptions.push(cs);

    const ds =
      this._markerManager.createEventObservableHTMLMarker<mapTypes.MouseEvent>('dragend', this)
        .subscribe((e: mapTypes.MouseEvent) => {
          this.dragEnd.emit(<MouseEvent>{ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
    this._observableSubscriptions.push(ds);

    const mover =
      this._markerManager.createEventObservableHTMLMarker<mapTypes.MouseEvent>('mouseover', this)
        .subscribe((e: mapTypes.MouseEvent) => {
          this.mouseOver.emit(<MouseEvent>{ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
    this._observableSubscriptions.push(mover);

    const mout =
      this._markerManager.createEventObservableHTMLMarker<mapTypes.MouseEvent>('mouseout', this)
        .subscribe((e: mapTypes.MouseEvent) => {
          this.mouseOut.emit(<MouseEvent>{ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
    this._observableSubscriptions.push(mout);
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'AgmHtmlMarker-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() {
    this._markerManager.deleteHtmlMarker(this);
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }
}
