import {Directive, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';
import {LatLng, LatLngBounds, LatLngLiteral} from '../services/google-maps-types';
import {MouseEvent as MapMouseEvent} from '../services/google-maps-types';
import {PolylineManager} from '../services/managers/polyline-manager';

@Directive({
  selector: 'sebm-google-map-polyline',
  inputs: [
    'path', 'strokeWeight', 'strokeColor', 'strokeOpacity', 'geodesic', 'visible', 'zIndex', 'draggable', 'clickable', 'editable'
  ],
  outputs: []
})
export class SebmGoogleMapPolyline implements OnInit, OnChanges, OnDestroy {

  /**
   * The path of this file.
   */
  path:any;

  /**
   * Indicates whether this Circle handles mouse events. Defaults to true.
   */
  clickable: boolean = true;

  /**
   * If set to true, the user can drag this circle over the map. Defaults to false.
   */
  draggable: boolean = false;

  /**
   * If set to true, the user can edit this circle by dragging the control points shown at
   * the center and around the circumference of the circle. Defaults to false.
   */
  editable: boolean = false;

  /**
   * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth.
   * When false, edges of the polygon are rendered as straight lines in screen space.
   * Note that the shape of a geodesic polygon may appear to change when dragged,
   * as the dimensions are maintained relative to the surface of the earth. Defaults to false.
   */
  geodesic:  boolean = false;

  /**
   * The stroke color. All CSS3 colors are supported except for extended named colors.
   */
  strokeColor: string;

  /**
   * The stroke opacity between 0.0 and 1.0
   */
  strokeOpacity: number;

  /**
   * The stroke width in pixels.
   */
  strokeWeight: number = 0;

  /**
   * Whether this circle is visible on the map. Defaults to true.
   */
  visible: boolean = true;

  /**
   * The zIndex compared to other polys.
   */
  zIndex: number;

  private _eventSubscriptions: Subscription[] = [];

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  polylineClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  polylineDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the circle.
   */
  drag: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user stops dragging the circle.
   */
  dragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the user starts dragging the circle.
   */
  dragStart: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the circle.
   */
  mouseDown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the circle.
   */
  mouseMove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired on circle mouseout.
   */
  mouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired on circle mouseover.
   */
  mouseOver: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the DOM mouseup event is fired on the circle.
   */
  mouseUp: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event is fired when the circle's radius is changed.
   */
  radiusChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * This event is fired when the circle is right-clicked on.
   */
  rightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


  private static _mapOptions: string[] = [
    'strokeColor', 'strokeOpacity', 'strokePosition',
    'visible', 'zIndex'
  ];

  private _polylineAddedToManager:boolean;

  constructor(private _manager: PolylineManager) {}

  /** @internal */
  ngOnInit() {
    this._manager.addPolyline(this);
    this._polylineAddedToManager = true;
    this._registerEventListeners();
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    console.log('ng On Changes triggered');
    if (!this._polylineAddedToManager) {
      console.log('polyline is not on manager');
      return;
    }
    if (changes['editable']) {
      this._manager.setEditable(this);
    }
    if (changes['draggable']) {
      this._manager.setDraggable(this);
    }
    if (changes['visible']) {
      this._manager.setVisible(this);
    }
    if (changes['path']) {
      this._manager.setPath(this);
    }
    this._updatePolylineOptionsChanges(changes);
  }

  private _updatePolylineOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys =
      Object.keys(changes).filter(k => SebmGoogleMapPolyline._mapOptions.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _registerEventListeners() {
    let events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();
    events.set('click', this.polylineClick);
    events.set('dblclick', this.polylineDblClick);
    events.set('drag', this.drag);
    events.set('dragend', this.dragEnd);
    events.set('dragStart', this.dragStart);
    events.set('mousedown', this.mouseDown);
    events.set('mousemove', this.mouseMove);
    events.set('mouseout', this.mouseOut);
    events.set('mouseover', this.mouseOver);
    events.set('mouseup', this.mouseUp);
    events.set('radius_changed', this.radiusChange);
    events.set('rightclick', this.rightClick);

    events.forEach((eventEmitter, eventName) => {
      this._eventSubscriptions.push(
        this._manager.createEventObservable<MapMouseEvent>(eventName, this).subscribe((value) => {
          switch (eventName) {
            default:
              eventEmitter.emit(
                <MouseEvent>{coords: {lat: value.latLng.lat(), lng: value.latLng.lng()}});
          }
        }));
    });
  }

  /** @internal */
  ngOnDestroy() {
    this._eventSubscriptions.forEach(function(s: Subscription) { s.unsubscribe(); });
    this._eventSubscriptions = null;
  }

}
