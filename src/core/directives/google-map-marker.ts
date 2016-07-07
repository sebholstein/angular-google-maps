import {AfterContentInit, ContentChild, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';
import * as mapTypes from '../services/google-maps-types';
import {MarkerManager} from '../services/managers/marker-manager';

import {SebmGoogleMapInfoWindow} from './google-map-info-window';

let markerId = 0;

/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'sebm-google-map-marker',
  inputs: [
    'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
    'openInfoWindow', 'fitBounds'
  ],
  outputs: ['markerClick', 'dragEnd']
})
export class SebmGoogleMapMarker implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * The latitude position of the marker.
   */
  latitude: number;

  /**
   * The longitude position of the marker.
   */
  longitude: number;

  /**
   * The title of the marker.
   */
  title: string;

  /**
   * The label (a single uppercase character) for the marker.
   */
  label: string;

  /**
   * If true, the marker can be dragged. Default value is false.
   */
  draggable: boolean = false;

  /**
   * Icon (the URL of the image) for the foreground.
   */
  iconUrl: string;

  /**
   * Whether to automatically open the child info window when the marker is clicked.
   */
  openInfoWindow: boolean = true;

  /**
   * This event emitter gets emitted when the user clicks on the marker.
   */
  markerClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the user stops dragging the marker.
   */
  dragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @ContentChild(SebmGoogleMapInfoWindow) private _infoWindow: SebmGoogleMapInfoWindow;

  private _markerAddedToManger: boolean = false;
  private _id: string;
  private _observableSubscriptions: Subscription[] = [];

  constructor(private _markerManager: MarkerManager) { this._id = (markerId++).toString(); }

  /* @internal */
  ngAfterContentInit() {
    if (this._infoWindow != null) {
      this._infoWindow.hostMarker = this;
    }
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }
    if (!this._markerAddedToManger) {
      this._markerManager.addMarker(this);
      this._markerAddedToManger = true;
      this._addEventListeners();
      return;
    }
    if (changes['latitude'] || changes['longitude']) {
      this._markerManager.updateMarkerPosition(this);
    }
    if (changes['title']) {
      this._markerManager.updateTitle(this);
    }
    if (changes['label']) {
      this._markerManager.updateLabel(this);
    }
    if (changes['draggable']) {
      this._markerManager.updateDraggable(this);
    }
    if (changes['iconUrl']) {
      this._markerManager.updateIcon(this);
    }
  }

  private _addEventListeners() {
    const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
      if (this.openInfoWindow && this._infoWindow != null) {
        this._infoWindow.open();
      }
      this.markerClick.emit(null);
    });
    this._observableSubscriptions.push(cs);

    const ds = this._markerManager.createEventObservable<mapTypes.MouseEvent>('dragend', this)
                   .subscribe((e: mapTypes.MouseEvent) => {
                     this.dragEnd.emit({coords: {lat: e.latLng.lat(), lng: e.latLng.lng()}});
                   });
    this._observableSubscriptions.push(ds);
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'SebmGoogleMapMarker-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() {
    this._markerManager.deleteMarker(this);
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }
}
