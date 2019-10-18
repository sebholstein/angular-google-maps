import { Circle, CircleOptions, GoogleMap, MapsEventListener, Marker, MarkerOptions, MVCObject, Polygon, PolygonOptions, Polyline, PolylineOptions, Rectangle, RectangleOptions } from '@agm/core/services/google-maps-types';
import { Directive, EventEmitter, Input, isDevMode, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { fromEventPattern, Observable, Subscription } from 'rxjs';
import { DrawingControlOptions, OverlayCompleteEvent, OverlayType } from '../google-drawing-types';

declare var google: any;

@Directive({
  selector: 'agm-drawing-manager',
  exportAs: 'agmDrawingManager',
})
export class AgmDrawingManager implements OnChanges, OnDestroy{

  /**
   * The enabled/disabled state of the drawing control. Defaults to `true`.
   *
   * @type {boolean}
   */
  @Input() drawingControl: boolean;

  /**
   * The DrawingManager's drawing mode, which defines the type of overlay to be
   * added on the map. A drawing mode of null means that the user can interact
   * with the map as normal, and clicks do not draw anything.
   */
  @Input() drawingMode: OverlayType | null;

  /**
   * The display options for the drawing control.
   *
   * @type {DrawingControlOptions}
   */
  @Input() drawingControlOptions: DrawingControlOptions;

  /**
   * Options to apply to any new circles created with this DrawingManager.
   * The `center` and `radius` properties are ignored, and the `map` property of a
   * new circle is always set to the DrawingManager's map.
   *
   * @type {CircleOptions}
   */
  @Input() circleOptions: CircleOptions;

  /**
   * Options to apply to any new markers created with this DrawingManager.
   * The `position` property is ignored, and the `map` property of a new marker
   * is always set to the DrawingManager's map.
   *
   * @type {MarkerOptions}
   */
  @Input() markerOptions: MarkerOptions;

  /**
   * Options to apply to any new polygons created with this DrawingManager.
   * The `paths` property is ignored, and the map property of a new polygon is
   * always set to the DrawingManager's map.
   *
   * @type {PolygonOptions}
   */
  @Input() polygonOptions: PolygonOptions;

  /**
   * Options to apply to any new polylines created with this DrawingManager.
   * The `path` property is ignored, and the map property of a new polyline is
   * always set to the DrawingManager's map.
   *
   * @type {PolylineOptions}
   * @memberof AgmDrawingManager
   */
  @Input() polylineOptions: PolylineOptions;

  /**
   * Options to apply to any new rectangles created with this DrawingManager.
   * The `bounds` property is ignored, and the map property of a new rectangle
   * is always set to the DrawingManager's map.
   *
   * @type {RectangleOptions}
   * @memberof AgmDrawingManager
   */
  @Input() rectangeOptions: RectangleOptions;

  /**
   * This event is fired when the user has finished drawing a circle.
   */
  @Output() circleComplete = new EventEmitter<Circle>();

  /**
   * This event is fired when the user has finished drawing a marker.
   */
  @Output() markerComplete = new EventEmitter<Marker>();

  /**
   * This event is fired when the user has finished drawing an overlay of any
   * type.
   */
  @Output() overlayComplete = new EventEmitter<OverlayCompleteEvent>();

  /**
   * This event is fired when the user has finished drawing a polygon.
   */
  @Output() polygonComplete = new EventEmitter<Polygon>();

  /**
   * This event is fired when the user has finished drawing a polyline.
   */
  @Output() polylineComplete = new EventEmitter<Polyline>();

  /**
   * This event is fired when the user has finished drawing a rectangle.
   */
  @Output() rectangleComplete = new EventEmitter<Rectangle>();

  private eventSubscriptions: Subscription[] = [];

  private drawingManager: any;

  constructor(private _zone: NgZone) {
  }

  setMap(map: GoogleMap) {
    if (!google.maps.drawing && isDevMode()) {
      console.error('Cannot use drawing manager if drawing library is not ' +
        'loaded. To fix, add libraries: [\'drawing\'] to the ' +
        'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
      return;
    }
    if (map && !this.drawingManager) {
      this.drawingManager = new google.maps.drawing.DrawingManager({
          map,
          circleOptions: this.circleOptions,
          markerOptions: this.markerOptions,
          polygonOptions: this.polygonOptions,
          polylineOptions: this.polylineOptions,
          rectangeOptions: this.rectangeOptions,
          drawingControl: this.drawingControl,
          drawingControlOptions: this.drawingControlOptions,
          drawingMode: this.drawingMode,
      });
      this.initEvents(this.drawingManager);
    } else if (!map && this.drawingManager) {
      this.drawingManager.setMap(null);
    }
    // else do nothing
  }

  initEvents(drawingManager: any) {
    this.eventSubscriptions.push(
      this.createMvcObservable<Circle>('circlecomplete', drawingManager)
      .subscribe(circle => this._zone.run(() => this.circleComplete.next(circle)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<Marker>('markercomplete', drawingManager)
      .subscribe(marker => this._zone.run(() => this.markerComplete.next(marker)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<Polygon>('polygoncomplete', drawingManager)
      .subscribe(polygon => this._zone.run(() => this.polygonComplete.next(polygon)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<Polyline>('polylinecomplete', drawingManager)
      .subscribe(polyline => this._zone.run(() => this.polylineComplete.next(polyline)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<OverlayCompleteEvent>('overlaycomplete', drawingManager)
      .subscribe(overlayevent => this._zone.run(() => this.overlayComplete.next(overlayevent)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<Rectangle>('rectanglecomplete', drawingManager)
      .subscribe(rectangle => this._zone.run(() => this.rectangleComplete.next(rectangle)))
    );
  }

  createMvcObservable<E>(eventName: string, mvcObject: MVCObject): Observable<E> {
    return fromEventPattern(
      handler => mvcObject.addListener(eventName,
        (event?: E) => handler.apply(null, [event])),
      (_handler: Function, evListener: MapsEventListener) => evListener.remove()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.drawingManager) {
      return;
    }

    const options = Object.entries(changes)
    .map(([prop, change]) => [prop, change.currentValue])
    .reduce((obj: any, [propName, propValue]) => {
      obj[propName] = propValue;
      return obj;
    }, {});
    this.drawingManager.setOptions(options);
  }

  ngOnDestroy(): void {
    this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
