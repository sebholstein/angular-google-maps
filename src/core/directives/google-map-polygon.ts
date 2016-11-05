import {AfterContentInit, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {LatLng, LatLngLiteral, PolyMouseEvent, PolygonOptions} from '../services/google-maps-types';
import {PolygonManager} from '../services/managers/polygon-manager';

/**
 * SebmGoogleMapPolygon renders a polygon on a {@link SebmGoogleMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { SebmGoogleMap, SebmGooglePolygon, LatLngLiteral } from 'angular2-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .semb-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <semb-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <semb-map-polygon [paths]="paths">
 *      </semb-map-polygon>
 *    </semb-map>
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
  selector: 'sebm-map-polygon',
  inputs: [
    'clickable',
    'draggable: polyDraggable',
    'editable',
    'fillColor',
    'fillOpacity',
    'geodesic',
    'paths',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible',
    'zIndex',
  ],
  outputs: [
    'polyClick', 'polyDblClick', 'polyDrag', 'polyDragEnd', 'polyMouseDown', 'polyMouseMove',
    'polyMouseOut', 'polyMouseOver', 'polyMouseUp', 'polyRightClick'
  ]
})
export class SebmGoogleMapPolygon implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * Indicates whether this Polygon handles mouse events. Defaults to true.
   */
  clickable: boolean = true;
  /**
   * If set to true, the user can drag this shape over the map. The geodesic
   * property defines the mode of dragging. Defaults to false.
   */
  draggable: boolean = false;
  /**
   * If set to true, the user can edit this shape by dragging the control
   * points shown at the vertices and on each segment. Defaults to false.
   */
  editable: boolean = false;
  /**
   * The fill color. All CSS3 colors are supported except for extended
   * named colors.
   */
  fillColor: string;
  /**
   * The fill opacity between 0.0 and 1.0
   */
  fillOpacity: number;
  /**
   * When true, edges of the polygon are interpreted as geodesic and will
   * follow the curvature of the Earth. When false, edges of the polygon are
   * rendered as straight lines in screen space. Note that the shape of a
   * geodesic polygon may appear to change when dragged, as the dimensions
   * are maintained relative to the surface of the earth. Defaults to false.
   */
  geodesic: boolean = false;
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
  paths: Array<LatLng|LatLngLiteral>|Array<Array<LatLng|LatLngLiteral>> = [];
  /**
   * The stroke color. All CSS3 colors are supported except for extended
   * named colors.
   */
  strokeColor: string;
  /**
   * The stroke opacity between 0.0 and 1.0
   */
  strokeOpacity: number;
  /**
   * The stroke width in pixels.
   */
  strokeWeight: number;
  /**
   * Whether this polygon is visible on the map. Defaults to true.
   */
  visible: boolean;
  /**
   * The zIndex compared to other polys.
   */
  zIndex: number;

  /**
   * This event is fired when the DOM click event is fired on the Polygon.
   */
  polyClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM dblclick event is fired on the Polygon.
   */
  polyDblClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the polygon.
   */
  polyDrag: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user stops dragging the polygon.
   */
  polyDragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user starts dragging the polygon.
   */
  polyDragStart: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the Polygon.
   */
  polyMouseDown: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the Polygon.
   */
  polyMouseMove: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polygon mouseout.
   */
  polyMouseOut: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired on Polygon mouseover.
   */
  polyMouseOver: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This event is fired whe the DOM mouseup event is fired on the Polygon
   */
  polyMouseUp: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  /**
   * This even is fired when the Polygon is right-clicked on.
   */
  polyRightClick: EventEmitter<PolyMouseEvent> = new EventEmitter<PolyMouseEvent>();

  private static _polygonOptionsAttributes: Array<string> = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible'
  ];

  private _id: string;
  private _polygonAddedToManager: boolean = false;
  private _subscriptions: Subscription[] = [];

  constructor(private _polygonManager: PolygonManager) {}

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
      {name: 'click', handler: (ev: PolyMouseEvent) => this.polyClick.emit(ev)},
      {name: 'dbclick', handler: (ev: PolyMouseEvent) => this.polyDblClick.emit(ev)},
      {name: 'drag', handler: (ev: MouseEvent) => this.polyDrag.emit(ev)},
      {name: 'dragend', handler: (ev: MouseEvent) => this.polyDragEnd.emit(ev)},
      {name: 'dragstart', handler: (ev: MouseEvent) => this.polyDragStart.emit(ev)},
      {name: 'mousedown', handler: (ev: PolyMouseEvent) => this.polyMouseDown.emit(ev)},
      {name: 'mousemove', handler: (ev: PolyMouseEvent) => this.polyMouseMove.emit(ev)},
      {name: 'mouseout', handler: (ev: PolyMouseEvent) => this.polyMouseOut.emit(ev)},
      {name: 'mouseover', handler: (ev: PolyMouseEvent) => this.polyMouseOver.emit(ev)},
      {name: 'mouseup', handler: (ev: PolyMouseEvent) => this.polyMouseUp.emit(ev)},
      {name: 'rightclick', handler: (ev: PolyMouseEvent) => this.polyRightClick.emit(ev)},
    ];
    handlers.forEach((obj) => {
      const os = this._polygonManager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }

  private _updatePolygonOptions(changes: SimpleChanges): PolygonOptions {
    return Object.keys(changes)
        .filter(k => SebmGoogleMapPolygon._polygonOptionsAttributes.indexOf(k) !== -1)
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
}
