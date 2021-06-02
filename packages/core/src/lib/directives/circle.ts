import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';

import { CircleManager } from '../services/managers/circle-manager';

@Directive({
  selector: 'agm-circle',
})
export class AgmCircle implements OnInit, OnChanges, OnDestroy {
  /**
   * The latitude position of the circle (required).
   */
  @Input() latitude: number;

  /**
   * The clickable position of the circle (required).
   */
  @Input() longitude: number;

  /**
   * Indicates whether this Circle handles mouse events. Defaults to true.
   */
  @Input() clickable = true;

  /**
   * If set to true, the user can drag this circle over the map. Defaults to false.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('circleDraggable') draggable = false;

  /**
   * If set to true, the user can edit this circle by dragging the control points shown at
   * the center and around the circumference of the circle. Defaults to false.
   */
  @Input() editable = false;

  /**
   * The fill color. All CSS3 colors are supported except for extended named colors.
   */
  @Input() fillColor: string;

  /**
   * The fill opacity between 0.0 and 1.0.
   */
  @Input() fillOpacity: number;

  /**
   * The radius in meters on the Earth's surface.
   */
  @Input() radius = 0;

  /**
   * The stroke color. All CSS3 colors are supported except for extended named colors.
   */
  @Input() strokeColor: string;

  /**
   * The stroke opacity between 0.0 and 1.0
   */
  @Input() strokeOpacity: number;

  /**
   * The stroke position. Defaults to CENTER.
   * This property is not supported on Internet Explorer 8 and earlier.
   */
  @Input() strokePosition: keyof typeof google.maps.StrokePosition = 'CENTER';

  /**
   * The stroke width in pixels.
   */
  @Input() strokeWeight = 0;

  /**
   * Whether this circle is visible on the map. Defaults to true.
   */
  @Input() visible = true;

  /**
   * The zIndex compared to other polys.
   */
  @Input() zIndex: number;

  /**
   * This event is fired when the circle's center is changed.
   */
  @Output() centerChange: EventEmitter<google.maps.LatLngLiteral> = new EventEmitter<google.maps.LatLngLiteral>();

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  @Output() circleClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event emitter gets emitted when the user clicks on the circle.
   */
  @Output() circleDblClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the circle.
   */
  // tslint:disable-next-line: no-output-native
  @Output() drag: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the user stops dragging the circle.
   */
  @Output() dragEnd: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the user starts dragging the circle.
   */
  @Output() dragStart: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the circle.
   */
  @Output() mouseDown: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the circle.
   */
  @Output() mouseMove: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired on circle mouseout.
   */
  @Output() mouseOut: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired on circle mouseover.
   */
  @Output() mouseOver: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mouseup event is fired on the circle.
   */
  @Output() mouseUp: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the circle's radius is changed.
   */
  @Output() radiusChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * This event is fired when the circle is right-clicked on.
   */
  @Output() rightClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  private _circleAddedToManager = false;

  private static _mapOptions: string[] = [
    'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex', 'clickable',
  ];

  private _eventSubscriptions: Subscription[] = [];

  constructor(private _manager: CircleManager) {}

  /** @internal */
  ngOnInit() {
    let rip = this._manager.addCircle(this);
    rip.then(() => {
      this._circleAddedToManager = true;
      this._registerEventListeners();
    });
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._circleAddedToManager) {
      return;
    }
    // tslint:disable: no-string-literal
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
    // tslint:enable: no-string-literal
    this._updateCircleOptionsChanges(changes);
  }

  private _updateCircleOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    const options: {[propName: string]: any} = {};
    const optionKeys =
        Object.keys(changes).filter(k => AgmCircle._mapOptions.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });

    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _registerEventListeners() {
    const events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();
    events.set('center_changed', this.centerChange);
    events.set('click', this.circleClick);
    events.set('dblclick', this.circleDblClick);
    events.set('drag', this.drag);
    events.set('dragend', this.dragEnd);
    events.set('dragstart', this.dragStart);
    events.set('mousedown', this.mouseDown);
    events.set('mousemove', this.mouseMove);
    events.set('mouseout', this.mouseOut);
    events.set('mouseover', this.mouseOver);
    events.set('mouseup', this.mouseUp);
    events.set('radius_changed', this.radiusChange);
    events.set('rightclick', this.rightClick);

    events.forEach((eventEmitter, eventName) => {
      this._eventSubscriptions.push(
          this._manager.createEventObservable<google.maps.MouseEvent>(eventName, this).subscribe((value) => {
            switch (eventName) {
              case 'radius_changed':
                this._manager.getRadius(this).then((radius) => eventEmitter.emit(radius));
                break;
              case 'center_changed':
                this._manager.getCenter(this).then(
                    (center) =>
                        eventEmitter.emit({lat: center.lat(), lng: center.lng()} as google.maps.LatLngLiteral));
                break;
              default:
                eventEmitter.emit(value);
            }
          }));
    });
  }

  /** @internal */
  ngOnDestroy() {
    this._eventSubscriptions.forEach(s => s.unsubscribe());
    this._eventSubscriptions = null;
    this._manager.removeCircle(this);
  }

  /**
   * Gets the LatLngBounds of this Circle.
   */
  getBounds(): Promise<google.maps.LatLngBounds> { return this._manager.getBounds(this); }

  getCenter(): Promise<google.maps.LatLng> { return this._manager.getCenter(this); }
}
