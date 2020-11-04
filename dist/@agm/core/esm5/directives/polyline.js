import * as tslib_1 from "tslib";
import { ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { PolylineManager } from '../services/managers/polyline-manager';
import { AgmPolylineIcon } from './polyline-icon';
import { AgmPolylinePoint } from './polyline-point';
var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmPolyline = /** @class */ (function () {
    function AgmPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new EventEmitter();
        /**
         * This event is fired after Polyline's path changes.
         */
        this.polyPathChange = new EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    AgmPolyline_1 = AgmPolyline;
    /** @internal */
    AgmPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var pointSub = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(pointSub);
        this._polylineManager.updatePolylinePoints(this);
        var iconSub = this.iconSequences.changes.subscribe(function () { return _this._polylineManager.updateIconSequences(_this); });
        this._subscriptions.push(iconSub);
    };
    AgmPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmPolyline_1._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    AgmPolyline.prototype.getPath = function () {
        return this._polylineManager.getPath(this);
    };
    AgmPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
        this._polylineManager.createPathEventObservable(this).then(function (ob$) {
            var os = ob$.subscribe(function (pathEvent) { return _this.polyPathChange.emit(pathEvent); });
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    AgmPolyline.prototype._getIcons = function () {
        if (this.iconSequences) {
            return this.iconSequences.toArray();
        }
        return [];
    };
    /** @internal */
    AgmPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmPolyline_1;
    AgmPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex',
    ];
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('polylineDraggable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "geodesic", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmPolyline.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmPolyline.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmPolyline.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmPolyline.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineDblClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineDrag", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineDragEnd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineDragStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineMouseDown", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineMouseMove", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineMouseOut", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineMouseOver", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineMouseUp", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolyline.prototype, "lineRightClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AgmPolyline.prototype, "polyPathChange", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmPolylinePoint),
        tslib_1.__metadata("design:type", QueryList)
    ], AgmPolyline.prototype, "points", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmPolylineIcon),
        tslib_1.__metadata("design:type", QueryList)
    ], AgmPolyline.prototype, "iconSequences", void 0);
    AgmPolyline = AgmPolyline_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-polyline',
        }),
        tslib_1.__metadata("design:paramtypes", [PolylineManager])
    ], AgmPolyline);
    return AgmPolyline;
}());
export { AgmPolyline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJMUosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBSUg7SUFnSUUscUJBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBL0hyRDs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7OztXQUdHO1FBQ0gsMkNBQTJDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUU5Qzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOzs7OztXQUtHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQWlCMUI7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hCOztXQUVHO1FBQ08sY0FBUyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUV2Rjs7V0FFRztRQUNPLGlCQUFZLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRTFGOztXQUVHO1FBQ08sYUFBUSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTlFOztXQUVHO1FBQ08sZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVqRjs7V0FFRztRQUNPLGtCQUFhLEdB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LENBQUM7MENBQVMsU0FBUzsrQ0FBbUI7SUFFckM7UUFBakMsZUFBZSxDQUFDLGVBQWUsQ0FBQzswQ0FBZ0IsU0FBUztzREFBa0I7SUFySGpFLFdBQVc7UUFIdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7U0FDekIsQ0FBQztpREFpSXNDLGVBQWU7T0FoSTFDLFdBQVcsQ0E4TnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTlORCxJQThOQztTQTlOWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IExhdExuZywgUG9seU1vdXNlRXZlbnQgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lSWNvbiB9IGZyb20gJy4vcG9seWxpbmUtaWNvbic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9wb2x5bGluZS1wb2ludCc7XG5cbmxldCBwb2x5bGluZUlkID0gMDtcbi8qKlxuICogQWdtUG9seWxpbmUgcmVuZGVycyBhIHBvbHlsaW5lIG9uIGEge0BsaW5rIEFnbU1hcH1cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICAuYWdtLW1hcC1jb250YWluZXIge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1wb2x5bGluZT5cbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEFcIiBbbG9uZ2l0dWRlXT1cImxuZ0FcIj5cbiAqICAgICAgICAgIDwvYWdtLXBvbHlsaW5lLXBvaW50PlxuICogICAgICAgICAgPGFnbS1wb2x5bGluZS1wb2ludCBbbGF0aXR1ZGVdPVwibGF0QlwiIFtsb25naXR1ZGVdPVwibG5nQlwiPlxuICogICAgICAgICAgPC9hZ20tcG9seWxpbmUtcG9pbnQ+XG4gKiAgICAgIDwvYWdtLXBvbHlsaW5lPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtUG9seWxpbmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFBvbHlsaW5lIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLiBUaGUgZ2VvZGVzaWMgcHJvcGVydHkgZGVmaW5lcyB0aGVcbiAgICogbW9kZSBvZiBkcmFnZ2luZy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncG9seWxpbmVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0IHRoZVxuICAgKiB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mXG4gICAqIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS5cbiAgICogTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgZ2VvZGVzaWMgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VXZWlnaHQ6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGlzIHBvbHlsaW5lIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lQ2xpY2s6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgbGluZURibENsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lRHJhZzogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgKi9cbiAgQE91dHB1dCgpIGxpbmVEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgKi9cbiAgQE91dHB1dCgpIGxpbmVEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW91dC5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvbHlNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZVxuICAgKi9cbiAgQE91dHB1dCgpIGxpbmVNb3VzZVVwOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5bGluZSBpcyByaWdodC1jbGlja2VkIG9uLlxuICAgKi9cbiAgQE91dHB1dCgpIGxpbmVSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8UG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2x5TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBhZnRlciBQb2x5bGluZSdzIHBhdGggY2hhbmdlcy5cbiAgICovXG4gIEBPdXRwdXQoKSBwb2x5UGF0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGF0aEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQWdtUG9seWxpbmVQb2ludCkgcG9pbnRzOiBRdWVyeUxpc3Q8QWdtUG9seWxpbmVQb2ludD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBZ21Qb2x5bGluZUljb24pIGljb25TZXF1ZW5jZXM6IFF1ZXJ5TGlzdDxBZ21Qb2x5bGluZUljb24+O1xuXG4gIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW1xuICAgICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAndmlzaWJsZScsICdnZW9kZXNpYycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3pJbmRleCcsXG4gIF07XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9seWxpbmVBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlsaW5lTWFuYWdlcjogUG9seWxpbmVNYW5hZ2VyKSB7IHRoaXMuX2lkID0gKHBvbHlsaW5lSWQrKykudG9TdHJpbmcoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9pbnRzLmZvckVhY2goKHBvaW50OiBBZ21Qb2x5bGluZVBvaW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBwb2ludC5wb3NpdGlvbkNoYW5nZWQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4geyB0aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHModGhpcyk7IH0pO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIGNvbnN0IHBvaW50U3ViID0gdGhpcy5wb2ludHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKHRoaXMpKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gocG9pbnRTdWIpO1xuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKTtcblxuICAgIGNvbnN0IGljb25TdWIgPSB0aGlzLmljb25TZXF1ZW5jZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZUljb25TZXF1ZW5jZXModGhpcykpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChpY29uU3ViKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xuICAgIGlmICghdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgY29uc3Qgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihcbiAgICAgICAgayA9PiBBZ21Qb2x5bGluZS5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSk7XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKGsgPT4gb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlKTtcbiAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuc2V0UG9seWxpbmVPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0UGF0aCgpOiBQcm9taXNlPEFycmF5PExhdExuZz4+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmdldFBhdGgodGhpcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCkge1xuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5hZGRQb2x5bGluZSh0aGlzKTtcbiAgICB0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICB7bmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lQ2xpY2suZW1pdChldil9LFxuICAgICAge25hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZURibENsaWNrLmVtaXQoZXYpfSxcbiAgICAgIHtuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5saW5lRHJhZy5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ2RyYWdlbmQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMubGluZURyYWdFbmQuZW1pdChldil9LFxuICAgICAge25hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMubGluZURyYWdTdGFydC5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlRG93bi5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IChldjogUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlTW92ZS5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VPdXQuZW1pdChldil9LFxuICAgICAge25hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZU92ZXIuZW1pdChldil9LFxuICAgICAge25hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogKGV2OiBQb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VVcC5lbWl0KGV2KX0sXG4gICAgICB7bmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IFBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVSaWdodENsaWNrLmVtaXQoZXYpfSxcbiAgICBdO1xuICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgY29uc3Qgb3MgPSB0aGlzLl9wb2x5bGluZU1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5jcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKHRoaXMpLnRoZW4oKG9iJCkgPT4ge1xuICAgICAgY29uc3Qgb3MgPSBvYiQuc3Vic2NyaWJlKHBhdGhFdmVudCA9PiB0aGlzLnBvbHlQYXRoQ2hhbmdlLmVtaXQocGF0aEV2ZW50KSk7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0UG9pbnRzKCk6IEFycmF5PEFnbVBvbHlsaW5lUG9pbnQ+IHtcbiAgICBpZiAodGhpcy5wb2ludHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvaW50cy50b0FycmF5KCk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIF9nZXRJY29ucygpOiBBcnJheTxBZ21Qb2x5bGluZUljb24+IHtcbiAgICBpZiAodGhpcy5pY29uU2VxdWVuY2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5pY29uU2VxdWVuY2VzLnRvQXJyYXkoKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5kZWxldGVQb2x5bGluZSh0aGlzKTtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXRoRXZlbnQge1xuICBuZXdBcnI6IExhdExuZ1tdO1xuICBldk5hbWU6ICdpbnNlcnRfYXQnIHwgJ3JlbW92ZV9hdCcgfCAnc2V0X2F0JztcbiAgaW5kZXg6IG51bWJlcjtcbiAgcHJldmlvdXM/OiBMYXRMbmc7XG59XG4iXX0=