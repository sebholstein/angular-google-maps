import {Directive, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';
import {LatLng, LatLngBounds, LatLngLiteral} from '../services/google-maps-types';
import {MouseEvent as MapMouseEvent} from '../services/google-maps-types';
import {CircleManager} from '../services/managers/circle-manager';

@Directive({
  selector: 'sebm-google-map-circle',
  inputs: [
    'latitude', 'longitude', 'clickable', 'draggable: circleDraggable', 'editable', 'fillColor',
    'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex'
  ],
  outputs: [
    'centerChange', 'circleClick', 'circleDblClick', 'drag', 'dragEnd', 'dragStart', 'mouseDown',
    'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'radiusChange', 'rightClick'
  ]
})
export class SebmGoogleMapCircle implements OnInit, OnChanges, OnDestroy {
  /**
   * The latitude position of the circle (required).
   */
  latitude: number;

  /**
   * The clickable position of the circle (required).
   */
  longitude: number;

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
   * The fill color. All CSS3 colors are supported except for extended named colors.
   */
  fillColor: string;

  /**
   * The fill opacity between 0.0 and 1.0.
   */
  fillOpacity: number;

  /**
   * The radius in meters on the Earth's surface.
   */
  radius: number = 0;

  /**
   * The stroke color. All CSS3 colors are supported except for extended named colors.
   */
  strokeColor: string;

  /**
   * The stroke opacity between 0.0 and 1.0
   */
  strokeOpacity: number;

  /**
   * The stroke position. Defaults to CENTER.
   * This property is not supported on Internet Explorer 8 and earlier.
   */
  strokePosition: 'CENTER'|'INSIDE'|'OUTSIDE' = 'CENTER';

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

  /**
   * This event is fired when the circle's center is changed.
   */
  centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  circleClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  circleDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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

  private _circleAddedToManager: boolean = false;

  private static _mapOptions: string[] = [
    'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex'
  ];

  private _eventSubscriptions: Subscription[] = [];

  constructor(private _manager: CircleManager) {}

  /** @internal */
  ngOnInit() {
    this._manager.addCircle(this);
    this._circleAddedToManager = true;
    this._registerEventListeners();
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._circleAddedToManager) {
      return;
    }
    if (changes['latitude'] || changes['longitude']) {
      this._manager.setCenter(this);
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
    if (changes['radius']) {
      this._manager.setRadius(this);
    }
    this._updateCircleOptionsChanges(changes);
  }

  private _updateCircleOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys =
        Object.keys(changes).filter(k => SebmGoogleMapCircle._mapOptions.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _registerEventListeners() {
    let events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();
    events.set('center_changed', this.centerChange);
    events.set('click', this.circleClick);
    events.set('dblclick', this.circleDblClick);
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
              case 'radius_changed':
                this._manager.getRadius(this).then((radius) => eventEmitter.emit(radius));
                break;
              case 'center_changed':
                this._manager.getCenter(this).then(
                    (center) =>
                        eventEmitter.emit(<LatLngLiteral>{lat: center.lat(), lng: center.lng()}));
                break;
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
    this._manager.removeCircle(this);
  }

  /**
   * Gets the LatLngBounds of this Circle.
   */
  getBounds(): Promise<LatLngBounds> { return this._manager.getBounds(this); }

  getCenter(): Promise<LatLng> { return this._manager.getCenter(this); }
}
