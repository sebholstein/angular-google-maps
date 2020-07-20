import { Directive, EventEmitter, Input, isDevMode, NgZone, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { fromEventPattern, Observable, Subscription } from 'rxjs';

@Directive({
  selector: 'agm-drawing-manager',
  exportAs: 'agmDrawingManager',
})
export class AgmDrawingManager implements OnChanges, OnDestroy{

  /**
   * The enabled/disabled state of the drawing control. Defaults to `true`.
   *
   */
  @Input() drawingControl: boolean;

  /**
   * The DrawingManager's drawing mode, which defines the type of overlay to be
   * added on the map. A drawing mode of null means that the user can interact
   * with the map as normal, and clicks do not draw anything.
   */
  @Input() drawingMode: google.maps.drawing.OverlayType | null;

  /**
   * The display options for the drawing control.
   *
   */
  @Input() drawingControlOptions: google.maps.drawing.DrawingControlOptions;

  /**
   * Options to apply to any new circles created with this DrawingManager.
   * The `center` and `radius` properties are ignored, and the `map` property of a
   * new circle is always set to the DrawingManager's map.
   *
   */
  @Input() circleOptions: google.maps.CircleOptions;

  /**
   * Options to apply to any new markers created with this DrawingManager.
   * The `position` property is ignored, and the `map` property of a new marker
   * is always set to the DrawingManager's map.
   *
   */
  @Input() markerOptions: google.maps.MarkerOptions;

  /**
   * Options to apply to any new polygons created with this DrawingManager.
   * The `paths` property is ignored, and the map property of a new polygon is
   * always set to the DrawingManager's map.
   *
   */
  @Input() polygonOptions: google.maps.PolygonOptions;

  /**
   * Options to apply to any new polylines created with this DrawingManager.
   * The `path` property is ignored, and the map property of a new polyline is
   * always set to the DrawingManager's map.
   *
   */
  @Input() polylineOptions: google.maps.PolylineOptions;

  /**
   * Options to apply to any new rectangles created with this DrawingManager.
   * The `bounds` property is ignored, and the map property of a new rectangle
   * is always set to the DrawingManager's map.
   *
   */
  @Input() rectangleOptions: google.maps.RectangleOptions;

  /**
   * This event is fired when the user has finished drawing a circle.
   */
  @Output() circleComplete = new EventEmitter<google.maps.Circle>();

  /**
   * This event is fired when the user has finished drawing a marker.
   */
  @Output() markerComplete = new EventEmitter<google.maps.Marker>();

  /**
   * This event is fired when the user has finished drawing an overlay of any
   * type.
   */
  @Output() overlayComplete = new EventEmitter<google.maps.drawing.OverlayCompleteEvent>();

  /**
   * This event is fired when the user has finished drawing a polygon.
   */
  @Output() polygonComplete = new EventEmitter<google.maps.Polygon>();

  /**
   * This event is fired when the user has finished drawing a polyline.
   */
  @Output() polylineComplete = new EventEmitter<google.maps.Polyline>();

  /**
   * This event is fired when the user has finished drawing a rectangle.
   */
  @Output() rectangleComplete = new EventEmitter<google.maps.Rectangle>();

  private eventSubscriptions: Subscription[] = [];

  private drawingManager: google.maps.drawing.DrawingManager;

  constructor(private _zone: NgZone) {
  }

  setMap(map: google.maps.Map) {
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
          rectangleOptions: this.rectangleOptions,
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

  initEvents(drawingManager: google.maps.drawing.DrawingManager) {
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.Circle>('circlecomplete', drawingManager)
      .subscribe(circle => this._zone.run(() => this.circleComplete.next(circle)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.Marker>('markercomplete', drawingManager)
      .subscribe(marker => this._zone.run(() => this.markerComplete.next(marker)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.Polygon>('polygoncomplete', drawingManager)
      .subscribe(polygon => this._zone.run(() => this.polygonComplete.next(polygon)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.Polyline>('polylinecomplete', drawingManager)
      .subscribe(polyline => this._zone.run(() => this.polylineComplete.next(polyline)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.drawing.OverlayCompleteEvent>('overlaycomplete', drawingManager)
      .subscribe(overlayevent => this._zone.run(() => this.overlayComplete.next(overlayevent)))
    );
    this.eventSubscriptions.push(
      this.createMvcObservable<google.maps.Rectangle>('rectanglecomplete', drawingManager)
      .subscribe(rectangle => this._zone.run(() => this.rectangleComplete.next(rectangle)))
    );
  }

  createMvcObservable<E>(eventName: string, mvcObject: google.maps.MVCObject): Observable<E> {
    return fromEventPattern(
      handler => mvcObject.addListener(eventName,
        (event?: E) => handler.apply(null, [event])),
      (_handler, evListener: google.maps.MapsEventListener) => evListener.remove()
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
