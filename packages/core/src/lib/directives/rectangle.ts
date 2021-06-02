import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RectangleManager } from '../services/managers/rectangle-manager';

@Directive({
  selector: 'agm-rectangle',
})
export class AgmRectangle implements OnInit, OnChanges, OnDestroy {
  /**
   * The north position of the rectangle (required).
   */
  @Input() north: number;

  /**
   * The east position of the rectangle (required).
   */
  @Input() east: number;

  /**
   * The south position of the rectangle (required).
   */
  @Input() south: number;

  /**
   * The west position of the rectangle (required).
   */
  @Input() west: number;

  /**
   * Indicates whether this Rectangle handles mouse events. Defaults to true.
   */
  @Input() clickable = true;

  /**
   * If set to true, the user can drag this rectangle over the map. Defaults to false.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('rectangleDraggable') draggable = false;

  /**
   * If set to true, the user can edit this rectangle by dragging the control points shown at
   * the center and around the circumference of the rectangle. Defaults to false.
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
   * Whether this rectangle is visible on the map. Defaults to true.
   */
  @Input() visible = true;

  /**
   * The zIndex compared to other polys.
   */
  @Input() zIndex: number;

  /**
   * This event is fired when the rectangle's is changed.
   */
  @Output()
  boundsChange: EventEmitter<google.maps.LatLngBoundsLiteral> = new EventEmitter<
    google.maps.LatLngBoundsLiteral
  >();

  /**
   * This event emitter gets emitted when the user clicks on the rectangle.
   */
  @Output()
  rectangleClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event emitter gets emitted when the user clicks on the rectangle.
   */
  @Output()
  rectangleDblClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is repeatedly fired while the user drags the rectangle.
   */
  // tslint:disable-next-line: no-output-native
  @Output() drag: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the user stops dragging the rectangle.
   */
  @Output() dragEnd: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the user starts dragging the rectangle.
   */
  @Output()
  dragStart: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mousedown event is fired on the rectangle.
   */
  @Output()
  mouseDown: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mousemove event is fired on the rectangle.
   */
  @Output()
  mouseMove: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired on rectangle mouseout.
   */
  @Output() mouseOut: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired on rectangle mouseover.
   */
  @Output()
  mouseOver: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the DOM mouseup event is fired on the rectangle.
   */
  @Output() mouseUp: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event is fired when the rectangle is right-clicked on.
   */
  @Output()
  rightClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  private _rectangleAddedToManager = false;

  private static _mapOptions: string[] = [
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokePosition',
    'strokeWeight',
    'visible',
    'zIndex',
    'clickable',
  ];

  private _eventSubscriptions: Subscription[] = [];

  constructor(private _manager: RectangleManager) {}

  /** @internal */
  ngOnInit() {
    let rip = this._manager.addRectangle(this);
    rip.then(() => {
      this._rectangleAddedToManager = true;
      this._registerEventListeners();
    });
  }

  /** @internal */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (!this._rectangleAddedToManager) {
      return;
    }
    // tslint:disable: no-string-literal
    if (
      changes['north'] ||
      changes['east'] ||
      changes['south'] ||
      changes['west']
    ) {
      this._manager.setBounds(this);
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
    // tslint:enable: no-string-literal
    this._updateRectangleOptionsChanges(changes);
  }

  private _updateRectangleOptionsChanges(changes: {
    [propName: string]: SimpleChange;
  }) {
    const options: google.maps.RectangleOptions = {};
    const optionKeys = Object.keys(changes).filter(
      k => AgmRectangle._mapOptions.indexOf(k) !== -1,
    );
    optionKeys.forEach(k => {
      options[k] = changes[k].currentValue;
    });

    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  private _registerEventListeners() {
    const events: Map<string, EventEmitter<any>> = new Map<
      string,
      EventEmitter<any>
    >();
    events.set('bounds_changed', this.boundsChange);
    events.set('click', this.rectangleClick);
    events.set('dblclick', this.rectangleDblClick);
    events.set('drag', this.drag);
    events.set('dragend', this.dragEnd);
    events.set('dragStart', this.dragStart);
    events.set('mousedown', this.mouseDown);
    events.set('mousemove', this.mouseMove);
    events.set('mouseout', this.mouseOut);
    events.set('mouseover', this.mouseOver);
    events.set('mouseup', this.mouseUp);
    events.set('rightclick', this.rightClick);

    events.forEach((eventEmitter, eventName) => {
      this._eventSubscriptions.push(
        this._manager
          .createEventObservable<google.maps.MouseEvent>(eventName, this)
          .subscribe(value => {
            switch (eventName) {
              case 'bounds_changed':
                this._manager.getBounds(this).then(bounds =>
                  eventEmitter.emit({
                    north: bounds.getNorthEast().lat(),
                    east: bounds.getNorthEast().lng(),
                    south: bounds.getSouthWest().lat(),
                    west: bounds.getSouthWest().lng(),
                  } as google.maps.LatLngBoundsLiteral),
                );
                break;
              default:
                eventEmitter.emit(value);
            }
          }),
      );
    });
  }

  /** @internal */
  ngOnDestroy() {
    this._eventSubscriptions.forEach(s => s.unsubscribe());
    this._eventSubscriptions = null;
    this._manager.removeRectangle(this);
  }

  /**
   * Gets the LatLngBounds of this Rectangle.
   */
  getBounds(): Promise<google.maps.LatLngBounds> {
    return this._manager.getBounds(this);
  }
}
