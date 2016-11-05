import {AfterContentInit, ContentChildren, Directive, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {PolyMouseEvent} from '../services/google-maps-types';
import {PolylineManager} from '../services/managers/polyline-manager';

import {SebmGoogleMapPolylinePoint} from './google-map-polyline-point';

let polylineId = 0;
/**
 * SebmGoogleMapPolyline renders a polyline on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint } from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-polyline>
 *          <sebm-google-map-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </sebm-google-map-polyline-point>
 *          <sebm-google-map-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </sebm-google-map-polyline-point>
 *      </sebm-google-map-polyline>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'sebm-google-map-polyline',
  inputs: [
    'clickable', 'draggable: polylineDraggable', 'editable', 'geodesic', 'strokeColor',
    'strokeWeight', 'strokeOpacity', 'visible', 'zIndex'
  ],
  outputs: [
    'lineClick', 'lineDblClick', 'lineDrag', 'lineDragEnd', 'lineMouseDown', 'lineMouseMove',
    'lineMouseOut', 'lineMouseOver', 'lineMouseUp', 'lineRightClick'
  ]
})
export class SebmGoogleMapPolyline implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * Indicates whether this Polyline handles mouse events. Defaults to true.
   */
  clickable: boolean = true;

  /**
   * If set to true, the user can drag this shape over the map. The geodesic property defines the
   * mode of dragging. Defaults to false.
   */
  draggable: boolean = false;

  /**
   * If set to true, the user can edit this shape by dragging the control points shown at the
   * vertices and on each segment. Defaults to false.
   */
  editable: boolean = false;

  /**
   * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
   * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
   * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
   * are maintained relative to the surface of the earth. Defaults to false.
   */
  geodesic: boolean = false;

  /**
   * The stroke color. All CSS3 colors are supported except for extended named colors.
   */
  strokeColor: string;

  /**
   * The stroke opacity between 0.0 and 1.0.
   */
  strokeOpacity: number;

  /**
   * The stroke width in pixels.
   */
  strokeWeight: number;

  /**
   * Whether this polyline is visible on the map. Defaults to true.
   */
  visible: boolean = true;

  /**
   * The zIndex compared to other polys.
   */
  zIndex: number;

  /**
   * This event is fired when the DOM click event is fired on the Polyline.
   */
  lineClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM dblclick event is fired on the Polyline.
   */
  lineDblClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the polyline.
   */
  lineDrag: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user stops dragging the polyline.
   */
  lineDragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user starts dragging the polyline.
   */
  lineDragStart: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the Polyline.
   */
  lineMouseDown: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the Polyline.
   */
  lineMouseMove: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polyline mouseout.
   */
  lineMouseOut: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polyline mouseover.
   */
  lineMouseOver: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired whe the DOM mouseup event is fired on the Polyline
   */
  lineMouseUp: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This even is fired when the Polyline is right-clicked on.
   */
  lineRightClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * @internal
   */
  @ContentChildren(SebmGoogleMapPolylinePoint) points: QueryList<SebmGoogleMapPolylinePoint>;

  private static _polylineOptionsAttributes: Array<string> = [
    'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
    'zIndex'
  ];

  private _id: string;
  private _polylineAddedToManager: boolean = false;
  private _subscriptions: Subscription[] = [];

  constructor(private _polylineManager: PolylineManager) { this._id = (polylineId++).toString(); }

  /** @internal */
  ngAfterContentInit() {
    if (this.points.length) {
      this.points.forEach((point: SebmGoogleMapPolylinePoint) => {
        const s = point.positionChanged.subscribe(
            () => { this._polylineManager.updatePolylinePoints(this); });
        this._subscriptions.push(s);
      });
    }
    if (!this._polylineAddedToManager) {
      this._init();
    }
    const s = this.points.changes.subscribe(() => this._polylineManager.updatePolylinePoints(this));
    this._subscriptions.push(s);
    this._polylineManager.updatePolylinePoints(this);
  }

  ngOnChanges(changes: SimpleChanges): any {
    if (!this._polylineAddedToManager) {
      this._init();
      return;
    }

    let options: {[propName: string]: any} = {};
    const optionKeys = Object.keys(changes).filter(
        k => SebmGoogleMapPolyline._polylineOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach(k => options[k] = changes[k].currentValue);
    this._polylineManager.setPolylineOptions(this, options);
  }

  private _init() {
    this._polylineManager.addPolyline(this);
    this._polylineAddedToManager = true;
    this._addEventListeners();
  }

  private _addEventListeners() {
    const handlers = [
      {name: 'click', handler: (ev: PolyMouseEvent) => this.lineClick.emit(ev)},
      {name: 'dbclick', handler: (ev: PolyMouseEvent) => this.lineDblClick.emit(ev)},
      {name: 'drag', handler: (ev: MouseEvent) => this.lineDrag.emit(ev)},
      {name: 'dragend', handler: (ev: MouseEvent) => this.lineDragEnd.emit(ev)},
      {name: 'dragstart', handler: (ev: MouseEvent) => this.lineDragStart.emit(ev)},
      {name: 'mousedown', handler: (ev: PolyMouseEvent) => this.lineMouseDown.emit(ev)},
      {name: 'mousemove', handler: (ev: PolyMouseEvent) => this.lineMouseMove.emit(ev)},
      {name: 'mouseout', handler: (ev: PolyMouseEvent) => this.lineMouseOut.emit(ev)},
      {name: 'mouseover', handler: (ev: PolyMouseEvent) => this.lineMouseOver.emit(ev)},
      {name: 'mouseup', handler: (ev: PolyMouseEvent) => this.lineMouseUp.emit(ev)},
      {name: 'rightclick', handler: (ev: PolyMouseEvent) => this.lineRightClick.emit(ev)},
    ];
    handlers.forEach((obj) => {
      const os = this._polylineManager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }

  /** @internal */
  _getPoints(): Array<SebmGoogleMapPolylinePoint> {
    if (this.points) {
      return this.points.toArray();
    }
    return [];
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  ngOnDestroy() {
    this._polylineManager.deletePolyline(this);
    // unsubscribe all registered observable subscriptions
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
