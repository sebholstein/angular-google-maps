import { AfterContentInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { LatLng, LatLngLiteral, PolygonOptions, PolyMouseEvent } from '../services/google-maps-types';
import { PolygonManager } from '../services/managers/polygon-manager';
import { MvcEventType } from '../utils/mvcarray-utils';

/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
@Directive({
  selector: 'agm-polygon',
})
export class AgmPolygon implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * Indicates whether this Polygon handles mouse events. Defaults to true.
   */
  @Input() clickable = true;

  /**
   * If set to true, the user can drag this shape over the map. The geodesic
   * property defines the mode of dragging. Defaults to false.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('polyDraggable') draggable = false;

  /**
   * If set to true, the user can edit this shape by dragging the control
   * points shown at the vertices and on each segment. Defaults to false.
   */
  @Input() editable = false;

  /**
   * The fill color. All CSS3 colors are supported except for extended
   * named colors.
   */
  @Input() fillColor: string;

  /**
   * The fill opacity between 0.0 and 1.0
   */
  @Input() fillOpacity: number;

  /**
   * When true, edges of the polygon are interpreted as geodesic and will
   * follow the curvature of the Earth. When false, edges of the polygon are
   * rendered as straight lines in screen space. Note that the shape of a
   * geodesic polygon may appear to change when dragged, as the dimensions
   * are maintained relative to the surface of the earth. Defaults to false.
   */
  @Input() geodesic = false;

  /**
   * The ordered sequence of coordinates that designates a closed loop.
   * Unlike polylines, a polygon may consist of one or more paths.
   *  As a result, the paths property may specify one or more arrays of
   * LatLng coordinates. Paths are closed automatically; do not repeat the
   * first vertex of the path as the last vertex. Simple polygons may be
   * defined using a single array of LatLngs. More complex polygons may
   * specify an array of arrays. Any simple arrays are converted into Arrays.
   * Inserting or removing LatLngs from the Array will automatically update
   * the polygon on the map.
   */
  @Input() paths: Array<LatLng | LatLngLiteral> | Array<Array<LatLng | LatLngLiteral>> = [];

  /**
   * The stroke color. All CSS3 colors are supported except for extended
   * named colors.
   */
  @Input() strokeColor: string;

  /**
   * The stroke opacity between 0.0 and 1.0
   */
  @Input() strokeOpacity: number;

  /**
   * The stroke width in pixels.
   */
  @Input() strokeWeight: number;

  /**
   * Whether this polygon is visible on the map. Defaults to true.
   */
  @Input() visible: boolean;

  /**
   * The zIndex compared to other polys.
   */
  @Input() zIndex: number;

  /**
   * This event is fired when the DOM click event is fired on the Polygon.
   */
  @Output() polyClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM dblclick event is fired on the Polygon.
   */
  @Output() polyDblClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the polygon.
   */
  @Output() polyDrag: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user stops dragging the polygon.
   */
  @Output() polyDragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user starts dragging the polygon.
   */
  @Output() polyDragStart: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the Polygon.
   */
  @Output() polyMouseDown: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the Polygon.
   */
  @Output() polyMouseMove: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polygon mouseout.
   */
  @Output() polyMouseOut: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polygon mouseover.
   */
  @Output() polyMouseOver: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired whe the DOM mouseup event is fired on the Polygon
   */
  @Output() polyMouseUp: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the Polygon is right-clicked on.
   */
  @Output() polyRightClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired after Polygon first path changes.
   */
  @Output() polyPathsChange = new EventEmitter<PolygonPathEvent<any>>();

  private static _polygonOptionsAttributes: Array<string> = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible',
  ];

  private _id: string;
  private _polygonAddedToManager = false;
  private _subscriptions: Subscription[] = [];

  constructor(private _polygonManager: PolygonManager) { }

  /** @internal */
  ngAfterContentInit() {
    if (!this._polygonAddedToManager) {
      this._init();
    }
  }

  ngOnChanges(changes: SimpleChanges): any {
    if (!this._polygonAddedToManager) {
      this._init();
      return;
    }

    this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
  }

  private _init() {
    this._polygonManager.addPolygon(this);
    this._polygonAddedToManager = true;
    this._addEventListeners();
  }

  private _addEventListeners() {
    const handlers = [
      { name: 'click', handler: (ev: PolyMouseEvent) => this.polyClick.emit(ev) },
      { name: 'dblclick', handler: (ev: PolyMouseEvent) => this.polyDblClick.emit(ev) },
      { name: 'drag', handler: (ev: MouseEvent) => this.polyDrag.emit(ev) },
      { name: 'dragend', handler: (ev: MouseEvent) => this.polyDragEnd.emit(ev) },
      { name: 'dragstart', handler: (ev: MouseEvent) => this.polyDragStart.emit(ev) },
      { name: 'mousedown', handler: (ev: PolyMouseEvent) => this.polyMouseDown.emit(ev) },
      { name: 'mousemove', handler: (ev: PolyMouseEvent) => this.polyMouseMove.emit(ev) },
      { name: 'mouseout', handler: (ev: PolyMouseEvent) => this.polyMouseOut.emit(ev) },
      { name: 'mouseover', handler: (ev: PolyMouseEvent) => this.polyMouseOver.emit(ev) },
      { name: 'mouseup', handler: (ev: PolyMouseEvent) => this.polyMouseUp.emit(ev) },
      { name: 'rightclick', handler: (ev: PolyMouseEvent) => this.polyRightClick.emit(ev) },
    ];
    handlers.forEach((obj) => {
      const os = this._polygonManager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });

    this._polygonManager.createPathEventObservable(this)
    .then(paths$ => {
      const os = paths$.subscribe(pathEvent => this.polyPathsChange.emit(pathEvent));
      this._subscriptions.push(os);
    });
  }

  private _updatePolygonOptions(changes: SimpleChanges): PolygonOptions {
    return Object.keys(changes)
      .filter(k => AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1)
      .reduce((obj: any, k: string) => {
        obj[k] = changes[k].currentValue;
        return obj;
      }, {});
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  ngOnDestroy() {
    this._polygonManager.deletePolygon(this);
    // unsubscribe all registered observable subscriptions
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  getPath(): Promise<Array<LatLng>> {
    return this._polygonManager.getPath(this);
  }

  getPaths(): Promise<Array<Array<LatLng>>> {
    return this._polygonManager.getPaths(this);
  }
}

export interface PolygonPathEvent<T extends (LatLng | Array<LatLng>)> {
  newArr: LatLng[][];
  eventName: MvcEventType;
  index: number;
  previous?: T;
}

export interface PathCollectionChangePolygonPathEvent extends PolygonPathEvent <Array<LatLng>>{
}

export interface PathChangePolygonPathEvent extends PolygonPathEvent<LatLng> {
  pathIndex: number;
}
