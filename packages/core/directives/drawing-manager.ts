import {Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange,
  Input, Output
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import * as mapTypes from '../services/google-maps-types';
import {DrawingManagerManager} from '../services/managers/drawing-manager-manager';

let drawingManagerId = 0;

/**
 * AgmDrawingManager renders a map drawing manager inside a {@link AgmMap}.
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
 *      <agm-drawing-manager
 *        [drawingControl]="true"
 *        [drawingControlOptions]="{
 *          position: 10,
 *          drawingModes: ['circle', 'polyline']
 *        }"
 *        [drawingMode]="drawingMode">
 *      </agm-drawing-manager>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-drawing-manager',
  inputs: ['drawingMode', 'drawingControl', 'drawingControlOptions', 'circleOptions',
    'markerOptions', 'polylineOptions', 'polygonOptions', 'rectangleOptions'],
  outputs: ['overlayComplete', 'circleComplete', 'markerComplete', 'polylineComplete', 'polygonComplete', 'rectangleComplete']
})
export class AgmDrawingManager implements OnDestroy, OnChanges {

  /**
   * The drawing mode of the drawing manager.
   */
  @Input() drawingMode: string;

  /**
   * Wether drawing controls are shown on the map.
   */
  @Input() drawingControl: boolean;

  /**
   * Configuration for the drawing controls of the drawing manager.
   */
  @Input() drawingControlOptions: mapTypes.DrawingControlOptions;

  /**
   * Circle options for the drawing manager.
   */
  @Input() circleOptions: mapTypes.CircleOptions;

  /**
   * Marker options for the drawing manager.
   */
  @Input() markerOptions: mapTypes.MarkerOptions;

  /**
   * Polyline options for the drawing manager.
   */
  @Input() polylineOptions: mapTypes.PolylineOptions;

  /**
   * Polygon options for the drawing manager.
   */
  @Input() polygonOptions: mapTypes.PolygonOptions;

  /**
   * Rectangle options for the drawing manager.
   */
  @Input() rectangleOptions: mapTypes.RectangleOptions;

  /**
   * This event emitter gets emitted when the user finishes drawing any overlay.
   */
  @Output() overlayComplete: EventEmitter<mapTypes.Overlay> = new EventEmitter<mapTypes.Overlay>();

  /**
   * This event emitter gets emitted when the user finishes drawing a circle.
   */
  @Output() circleComplete: EventEmitter<mapTypes.Circle> = new EventEmitter<mapTypes.Circle>();

  /**
   * This event emitter gets emitted when the user finishes drawing a marker.
   */
  @Output() markerComplete: EventEmitter<mapTypes.Marker> = new EventEmitter<mapTypes.Marker>();

  /**
   * This event emitter gets emitted when the user finishes drawing a polyline.
   */
  @Output() polylineComplete: EventEmitter<mapTypes.Polyline> = new EventEmitter<mapTypes.Polyline>();

  /**
   * This event emitter gets emitted when the user finishes drawing a polygon.
   */
  @Output() polygonComplete: EventEmitter<mapTypes.Polygon> = new EventEmitter<mapTypes.Polygon>();

  /**
   * This event emitter gets emitted when the user finishes drawing a rectangle.
   */
  @Output() rectangleComplete: EventEmitter<mapTypes.Rectangle> = new EventEmitter<mapTypes.Rectangle>();

  private _drawingManagerAddedToManager: boolean = false;
  private _id: string;
  private _observableSubscriptions: Subscription[] = [];

  constructor(private _drawingManagerManager: DrawingManagerManager) {
    this._id = (drawingManagerId++).toString();
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {

    if (!this._drawingManagerAddedToManager) {
      this._drawingManagerManager.addDrawingManager(this);
      this._drawingManagerAddedToManager = true;
      this._addEventListeners();
      return;
    }

    if (changes['drawingMode']) {
      this._drawingManagerManager.updateDrawingMode(this);
    }
    if (changes['drawingControl']) {
      this._drawingManagerManager.updateDrawingControl(this);
    }
    if (changes['drawingControlOptions']) {
      this._drawingManagerManager.updateDrawingControlOptions(this);
    }
    if (changes['circleOptions']) {
      this._drawingManagerManager.updateCircleOptions(this);
    }
    if (changes['markerOptions']) {
      this._drawingManagerManager.updateMarkerOptions(this);
    }
    if (changes['polylineOptions']) {
      this._drawingManagerManager.updatePolylineOptions(this);
    }
    if (changes['polygonOptions']) {
      this._drawingManagerManager.updatePolygonOptions(this);
    }
    if (changes['rectangleOptions']) {
      this._drawingManagerManager.updateRectangleOptions(this);
    }
  }

  private _addEventListeners() {
    const overlayComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Overlay>('overlaycomplete', this)
          .subscribe((e: mapTypes.Overlay) => {
            this.overlayComplete.emit(<mapTypes.Overlay>e);
          });
    this._observableSubscriptions.push(overlayComplete);

    const circleComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Circle>('circlecomplete', this)
          .subscribe((e: mapTypes.Circle) => {
            this.circleComplete.emit(<mapTypes.Circle>e);
          });
    this._observableSubscriptions.push(circleComplete);

    const markerComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Marker>('markercomplete', this)
          .subscribe((e: mapTypes.Marker) => {
            this.markerComplete.emit(<mapTypes.Marker>e);
          });
    this._observableSubscriptions.push(markerComplete);

    const polylineComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Polyline>('polylinecomplete', this)
          .subscribe((e: mapTypes.Polyline) => {
            this.polylineComplete.emit(<mapTypes.Polyline>e);
          });
    this._observableSubscriptions.push(polylineComplete);

    const polygonComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Polygon>('polygoncomplete', this)
          .subscribe((e: mapTypes.Polygon) => {
            this.polygonComplete.emit(<mapTypes.Polygon>e);
          });
    this._observableSubscriptions.push(polygonComplete);

    const rectangleComplete =
      this._drawingManagerManager.createEventObservable<mapTypes.Rectangle>('rectanglecomplete', this)
          .subscribe((e: mapTypes.Rectangle) => {
            this.rectangleComplete.emit(<mapTypes.Rectangle>e);
          });
    this._observableSubscriptions.push(rectangleComplete);
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'AgmDrawingManager-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() {
    this._drawingManagerManager.deleteDrawingManager(this);
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }
}
