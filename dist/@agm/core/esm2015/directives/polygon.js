import * as tslib_1 from "tslib";
var AgmPolygon_1;
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolygonManager } from '../services/managers/polygon-manager';
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
let AgmPolygon = AgmPolygon_1 = class AgmPolygon {
    constructor(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
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
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new EventEmitter();
        /**
         * This event is fired after Polygon first path changes.
         */
        this.polyPathsChange = new EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    ngAfterContentInit() {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    }
    ngOnChanges(changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    }
    _init() {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.polyClick.emit(ev) },
            { name: 'dblclick', handler: (ev) => this.polyDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.polyDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.polyDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.polyDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.polyMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.polyMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.polyMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.polyMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.polyMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.polyRightClick.emit(ev) },
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
    _updatePolygonOptions(changes) {
        return Object.keys(changes)
            .filter(k => AgmPolygon_1._polygonOptionsAttributes.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
    getPath() {
        return this._polygonManager.getPath(this);
    }
    getPaths() {
        return this._polygonManager.getPaths(this);
    }
};
AgmPolygon._polygonOptionsAttributes = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible',
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmPolygon.prototype, "clickable", void 0);
tslib_1.__decorate([
    Input('polyDraggable'),
    tslib_1.__metadata("design:type", Object)
], AgmPolygon.prototype, "draggable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmPolygon.prototype, "editable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmPolygon.prototype, "fillColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmPolygon.prototype, "fillOpacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmPolygon.prototype, "geodesic", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], AgmPolygon.prototype, "paths", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmPolygon.prototype, "strokeColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmPolygon.prototype, "strokeOpacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmPolygon.prototype, "strokeWeight", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AgmPolygon.prototype, "visible", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmPolygon.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyClick", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyDblClick", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyDrag", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyDragEnd", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyDragStart", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyMouseDown", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyMouseMove", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyMouseOut", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyMouseOver", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyMouseUp", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmPolygon.prototype, "polyRightClick", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmPolygon.prototype, "polyPathsChange", void 0);
AgmPolygon = AgmPolygon_1 = tslib_1.__decorate([
    Directive({
        selector: 'agm-polygon',
    }),
    tslib_1.__metadata("design:paramtypes", [PolygonManager])
], AgmPolygon);
export { AgmPolygon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBR3RFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFJSCxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVTtJQW9KckIsWUFBb0IsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBbkpuRDs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7OztXQUdHO1FBQ0gsMkNBQTJDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFMUM7OztXQUdHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQWExQjs7Ozs7O1dBTUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOzs7Ozs7Ozs7O1dBVUc7UUFDTSxVQUFLLEdBQXlFLEVBQUUsQ0FBQztRQTRCMUY7O1dBRUc7UUFDTyxjQUFTLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXZGOztXQUVHO1FBQ08saUJBQVksR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFMUY7O1dBRUc7UUFDTyxhQUFRLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFOUU7O1dBRUc7UUFDTyxnQkFBVyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRWpGOztXQUVHO1FBQ08sa0JBQWEsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVuRjs7V0FFRztRQUNPLGtCQUFhLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRTNGOztXQUVH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cG9ydCB7IEFmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IExhdExuZywgTGF0TG5nTGl0ZXJhbCwgUG9seWdvbk9wdGlvbnMsIFBvbHlNb3VzZUV2ZW50IH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgUG9seWdvbk1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuaW1wb3J0IHsgTXZjRXZlbnRUeXBlIH0gZnJvbSAnLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xuXG4vKipcbiAqIEFnbVBvbHlnb24gcmVuZGVycyBhIHBvbHlnb24gb24gYSB7QGxpbmsgQWdtTWFwfVxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1wb2x5Z29uIFtwYXRoc109XCJwYXRoc1wiPlxuICogICAgICA8L2FnbS1wb2x5Z29uPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlNYXBDbXAge1xuICogICBsYXQ6IG51bWJlciA9IDA7XG4gKiAgIGxuZzogbnVtYmVyID0gMDtcbiAqICAgem9vbTogbnVtYmVyID0gMTA7XG4gKiAgIHBhdGhzOiBBcnJheTxMYXRMbmdMaXRlcmFsPiA9IFtcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxuICogICBdXG4gKiAgIC8vIE5lc3RpbmcgcGF0aHMgd2lsbCBjcmVhdGUgYSBob2xlIHdoZXJlIHRoZXkgb3ZlcmxhcDtcbiAqICAgbmVzdGVkUGF0aHM6IEFycmF5PEFycmF5PExhdExuZ0xpdGVyYWw+PiA9IFtbXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cbiAqICAgXSwgW1xuICogICAgIHsgbGF0OiAwLCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogNSwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiA1LCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMTUgfVxuICogICBdXVxuICogfVxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1wb2x5Z29uJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtUG9seWdvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgUG9seWdvbiBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljXG4gICAqIHByb3BlcnR5IGRlZmluZXMgdGhlIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3BvbHlEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2xcbiAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkXG4gICAqIG5hbWVkIGNvbG9ycy5cbiAgICovXG4gIEBJbnB1dCgpIGZpbGxDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICovXG4gIEBJbnB1dCgpIGZpbGxPcGFjaXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsXG4gICAqIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlXG4gICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXG4gICAqIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgZ2VvZGVzaWMgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIG9yZGVyZWQgc2VxdWVuY2Ugb2YgY29vcmRpbmF0ZXMgdGhhdCBkZXNpZ25hdGVzIGEgY2xvc2VkIGxvb3AuXG4gICAqIFVubGlrZSBwb2x5bGluZXMsIGEgcG9seWdvbiBtYXkgY29uc2lzdCBvZiBvbmUgb3IgbW9yZSBwYXRocy5cbiAgICogIEFzIGEgcmVzdWx0LCB0aGUgcGF0aHMgcHJvcGVydHkgbWF5IHNwZWNpZnkgb25lIG9yIG1vcmUgYXJyYXlzIG9mXG4gICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxuICAgKiBmaXJzdCB2ZXJ0ZXggb2YgdGhlIHBhdGggYXMgdGhlIGxhc3QgdmVydGV4LiBTaW1wbGUgcG9seWdvbnMgbWF5IGJlXG4gICAqIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZSBjb21wbGV4IHBvbHlnb25zIG1heVxuICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cy4gQW55IHNpbXBsZSBhcnJheXMgYXJlIGNvbnZlcnRlZCBpbnRvIEFycmF5cy5cbiAgICogSW5zZXJ0aW5nIG9yIHJlbW92aW5nIExhdExuZ3MgZnJvbSB0aGUgQXJyYXkgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZVxuICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KCkgcGF0aHM6IEFycmF5PExhdExuZyB8IExhdExuZ0xpdGVyYWw+IHwgQXJyYXk8QXJyYXk8TGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD4+ID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWRcbiAgICogbmFtZWQgY29sb3JzLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VXZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGlzIHBvbHlnb24gaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cbiAgICovXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5Q2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5RGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHBvbHlnb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seURyYWc6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seURyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seU1vdXNlRG93bjogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3V0LlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlNb3VzZU91dDogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seU1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvblxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlNb3VzZVVwOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5Z29uIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seVJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGFmdGVyIFBvbHlnb24gZmlyc3QgcGF0aCBjaGFuZ2VzLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlQYXRoc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seWdvblBhdGhFdmVudDxhbnk+PigpO1xuXG4gIHByaXZhdGUgc3RhdGljIF9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXM6IEFycmF5PHN0cmluZz4gPSBbXG4gICAgJ2NsaWNrYWJsZScsICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAnZmlsbENvbG9yJywgJ2ZpbGxPcGFjaXR5JywgJ2dlb2Rlc2ljJywgJ2ljb24nLCAnbWFwJyxcbiAgICAncGF0aHMnLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VXZWlnaHQnLCAndmlzaWJsZScsICd6SW5kZXgnLCAnZHJhZ2dhYmxlJyxcbiAgICAnZWRpdGFibGUnLCAndmlzaWJsZScsXG4gIF07XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWdvbk1hbmFnZXI6IFBvbHlnb25NYW5hZ2VyKSB7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlcikge1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xuICAgIGlmICghdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuc2V0UG9seWdvbk9wdGlvbnModGhpcywgdGhpcy5fdXBkYXRlUG9seWdvbk9wdGlvbnMoY2hhbmdlcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5hZGRQb2x5Z29uKHRoaXMpO1xuICAgIHRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gW1xuICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlDbGljay5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlEYmxDbGljay5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RHJhZy5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RHJhZ0VuZC5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlEcmFnU3RhcnQuZW1pdChldikgfSxcbiAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlRG93bi5lbWl0KGV2KSB9LFxuICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5TW91c2VNb3ZlLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlT3V0LmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZU92ZXIuZW1pdChldikgfSxcbiAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZVVwLmVtaXQoZXYpIH0sXG4gICAgICB7IG5hbWU6ICdyaWdodGNsaWNrJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5UmlnaHRDbGljay5lbWl0KGV2KSB9LFxuICAgIF07XG4gICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBvcyA9IHRoaXMuX3BvbHlnb25NYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5jcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKHRoaXMpXG4gICAgLnRoZW4ocGF0aHMkID0+IHtcbiAgICAgIGNvbnN0IG9zID0gcGF0aHMkLnN1YnNjcmliZShwYXRoRXZlbnQgPT4gdGhpcy5wb2x5UGF0aHNDaGFuZ2UuZW1pdChwYXRoRXZlbnQpKTtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUG9seWdvbk9wdGlvbnMge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGFuZ2VzKVxuICAgICAgLmZpbHRlcihrID0+IEFnbVBvbHlnb24uX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgIC5yZWR1Y2UoKG9iajogYW55LCBrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuZGVsZXRlUG9seWdvbih0aGlzKTtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBnZXRQYXRoKCk6IFByb21pc2U8QXJyYXk8TGF0TG5nPj4ge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z29uTWFuYWdlci5nZXRQYXRoKHRoaXMpO1xuICB9XG5cbiAgZ2V0UGF0aHMoKTogUHJvbWlzZTxBcnJheTxBcnJheTxMYXRMbmc+Pj4ge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z29uTWFuYWdlci5nZXRQYXRocyh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlnb25QYXRoRXZlbnQ8VCBleHRlbmRzIChMYXRMbmcgfCBBcnJheTxMYXRMbmc+KT4ge1xuICBuZXdBcnI6IExhdExuZ1tdW107XG4gIGV2ZW50TmFtZTogTXZjRXZlbnRUeXBlO1xuICBpbmRleDogbnVtYmVyO1xuICBwcmV2aW91cz86IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aENvbGxlY3Rpb25DaGFuZ2VQb2x5Z29uUGF0aEV2ZW50IGV4dGVuZHMgUG9seWdvblBhdGhFdmVudCA8QXJyYXk8TGF0TG5nPj57XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aENoYW5nZVBvbHlnb25QYXRoRXZlbnQgZXh0ZW5kcyBQb2x5Z29uUGF0aEV2ZW50PExhdExuZz4ge1xuICBwYXRoSW5kZXg6IG51bWJlcjtcbn1cbiJdfQ==