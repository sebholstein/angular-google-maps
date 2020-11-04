import { Circle, CircleOptions, GoogleMap, Marker, MarkerOptions, MVCObject, Polygon, PolygonOptions, Polyline, PolylineOptions, Rectangle, RectangleOptions } from '@agm/core/services/google-maps-types';
import { EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawingControlOptions, OverlayCompleteEvent, OverlayType } from '../google-drawing-types';
export declare class AgmDrawingManager implements OnChanges, OnDestroy {
    private _zone;
    /**
     * The enabled/disabled state of the drawing control. Defaults to `true`.
     *
     * @type {boolean}
     */
    drawingControl: boolean;
    /**
     * The DrawingManager's drawing mode, which defines the type of overlay to be
     * added on the map. A drawing mode of null means that the user can interact
     * with the map as normal, and clicks do not draw anything.
     */
    drawingMode: OverlayType | null;
    /**
     * The display options for the drawing control.
     *
     * @type {DrawingControlOptions}
     */
    drawingControlOptions: DrawingControlOptions;
    /**
     * Options to apply to any new circles created with this DrawingManager.
     * The `center` and `radius` properties are ignored, and the `map` property of a
     * new circle is always set to the DrawingManager's map.
     *
     * @type {CircleOptions}
     */
    circleOptions: CircleOptions;
    /**
     * Options to apply to any new markers created with this DrawingManager.
     * The `position` property is ignored, and the `map` property of a new marker
     * is always set to the DrawingManager's map.
     *
     * @type {MarkerOptions}
     */
    markerOptions: MarkerOptions;
    /**
     * Options to apply to any new polygons created with this DrawingManager.
     * The `paths` property is ignored, and the map property of a new polygon is
     * always set to the DrawingManager's map.
     *
     * @type {PolygonOptions}
     */
    polygonOptions: PolygonOptions;
    /**
     * Options to apply to any new polylines created with this DrawingManager.
     * The `path` property is ignored, and the map property of a new polyline is
     * always set to the DrawingManager's map.
     *
     * @type {PolylineOptions}
     * @memberof AgmDrawingManager
     */
    polylineOptions: PolylineOptions;
    /**
     * Options to apply to any new rectangles created with this DrawingManager.
     * The `bounds` property is ignored, and the map property of a new rectangle
     * is always set to the DrawingManager's map.
     *
     * @type {RectangleOptions}
     * @memberof AgmDrawingManager
     */
    rectangeOptions: RectangleOptions;
    /**
     * This event is fired when the user has finished drawing a circle.
     */
    circleComplete: EventEmitter<Circle>;
    /**
     * This event is fired when the user has finished drawing a marker.
     */
    markerComplete: EventEmitter<Marker>;
    /**
     * This event is fired when the user has finished drawing an overlay of any
     * type.
     */
    overlayComplete: EventEmitter<OverlayCompleteEvent>;
    /**
     * This event is fired when the user has finished drawing a polygon.
     */
    polygonComplete: EventEmitter<Polygon>;
    /**
     * This event is fired when the user has finished drawing a polyline.
     */
    polylineComplete: EventEmitter<Polyline>;
    /**
     * This event is fired when the user has finished drawing a rectangle.
     */
    rectangleComplete: EventEmitter<Rectangle>;
    private eventSubscriptions;
    private drawingManager;
    constructor(_zone: NgZone);
    setMap(map: GoogleMap): void;
    initEvents(drawingManager: any): void;
    createMvcObservable<E>(eventName: string, mvcObject: MVCObject): Observable<E>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
