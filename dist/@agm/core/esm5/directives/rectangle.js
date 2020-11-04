import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { RectangleManager } from '../services/managers/rectangle-manager';
var AgmRectangle = /** @class */ (function () {
    function AgmRectangle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Rectangle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this rectangle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this rectangle by dragging the control points shown at
         * the center and around the circumference of the rectangle. Defaults to false.
         */
        this.editable = false;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this rectangle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the rectangle's is changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the rectangle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the rectangle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the rectangle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the rectangle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the rectangle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on rectangle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on rectangle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the rectangle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the rectangle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._rectangleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    AgmRectangle_1 = AgmRectangle;
    /** @internal */
    AgmRectangle.prototype.ngOnInit = function () {
        this._manager.addRectangle(this);
        this._rectangleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmRectangle.prototype.ngOnChanges = function (changes) {
        if (!this._rectangleAddedToManager) {
            return;
        }
        if (changes['north'] ||
            changes['east'] ||
            changes['south'] ||
            changes['west']) {
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
        this._updateRectangleOptionsChanges(changes);
    };
    AgmRectangle.prototype._updateRectangleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmRectangle_1._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) {
            options[k] = changes[k].currentValue;
        });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmRectangle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
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
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager
                .createEventObservable(eventName, _this)
                .subscribe(function (value) {
                switch (eventName) {
                    case 'bounds_changed':
                        _this._manager.getBounds(_this).then(function (bounds) {
                            return eventEmitter.emit({
                                north: bounds.getNorthEast().lat(),
                                east: bounds.getNorthEast().lng(),
                                south: bounds.getSouthWest().lat(),
                                west: bounds.getSouthWest().lng(),
                            });
                        });
                        break;
                    default:
                        eventEmitter.emit({
                            coords: { lat: value.latLng.lat(), lng: value.latLng.lng() },
                        });
                }
            }));
        });
    };
    /** @internal */
    AgmRectangle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) {
            s.unsubscribe();
        });
        this._eventSubscriptions = null;
        this._manager.removeRectangle(this);
    };
    /**
     * Gets the LatLngBounds of this Rectangle.
     */
    AgmRectangle.prototype.getBounds = function () {
        return this._manager.getBounds(this);
    };
    var AgmRectangle_1;
    AgmRectangle._mapOptions = [
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "north", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "east", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "south", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "west", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmRectangle.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('rectangleDraggable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmRectangle.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmRectangle.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmRectangle.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmRectangle.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmRectangle.prototype, "strokePosition", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmRectangle.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmRectangle.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmRectangle.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "boundsChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "rectangleClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "rectangleDblClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "mouseDown", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "mouseMove", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "mouseUp", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmRectangle.prototype, "rightClick", void 0);
    AgmRectangle = AgmRectangle_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-rectangle',
        }),
        tslib_1.__metadata("design:paramtypes", [RectangleManager])
    ], AgmRectangle);
    return AgmRectangle;
}());
export { AgmRectangle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZWN0YW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFLMUU7SUFxS0Usc0JBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBaEo5Qzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7O1dBRUc7UUFDSCwyQ0FBMkM7UUFDZCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRS9DOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFzQjFCOzs7V0FHRztRQUNNLG1CQUFjLEdBQW9DLFFBQVEsQ0FBQztRQUVwRTs7V0FFRztRQUNNLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztRQU94Qjs7V0FFRztRQUVILGlCQUFZLEdBQXNDLElBQUksWUFBWSxFQUUvRCxDQUFDO1FBRUo7O1dBRUc7UUFFSCxtQkFBYyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRTFFOztXQUVHO1FBRUgsc0JBQWlCLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFDTyxTQUFJLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUU7O1dBRUc7UUFDTyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFFSCxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFckU7O1dBRUc7UUFFSCxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFckU7O1dBRUc7UUFFSCxjQUFTLEdB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ZUFBZTtTQUMxQixDQUFDO2lEQXNLOEIsZ0JBQWdCO09BcktuQyxZQUFZLENBaVJ4QjtJQUFELG1CQUFDO0NBQUEsQUFqUkQsSUFpUkM7U0FqUlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcbmltcG9ydCB7XG4gIExhdExuZ0JvdW5kcyxcbiAgTGF0TG5nQm91bmRzTGl0ZXJhbCxcbiAgTW91c2VFdmVudCBhcyBNYXBNb3VzZUV2ZW50LFxufSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBSZWN0YW5nbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcmVjdGFuZ2xlLW1hbmFnZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tcmVjdGFuZ2xlJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtUmVjdGFuZ2xlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbm9ydGggcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgbm9ydGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGVhc3QgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgZWFzdDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc291dGggcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgc291dGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdlc3QgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgd2VzdDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFJlY3RhbmdsZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHJlY3RhbmdsZSBvdmVyIHRoZSBtYXAuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3JlY3RhbmdsZURyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyByZWN0YW5nbGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0XG4gICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgcmVjdGFuZ2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cbiAgICovXG4gIEBJbnB1dCgpIGZpbGxDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXG4gICAqL1xuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VPcGFjaXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgcG9zaXRpb24uIERlZmF1bHRzIHRvIENFTlRFUi5cbiAgICogVGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIDggYW5kIGVhcmxpZXIuXG4gICAqL1xuICBASW5wdXQoKSBzdHJva2VQb3NpdGlvbjogJ0NFTlRFUicgfCAnSU5TSURFJyB8ICdPVVRTSURFJyA9ICdDRU5URVInO1xuXG4gIC8qKlxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZVdlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyByZWN0YW5nbGUgaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXG4gICAqL1xuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSByZWN0YW5nbGUncyBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJvdW5kc0NoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0JvdW5kc0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBMYXRMbmdCb3VuZHNMaXRlcmFsXG4gID4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHJlY3RhbmdsZUNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWN0YW5nbGVEYmxDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBtb3VzZURvd246IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSByZWN0YW5nbGUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gcmVjdGFuZ2xlIG1vdXNlb3V0LlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gcmVjdGFuZ2xlIG1vdXNlb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBtb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgcmVjdGFuZ2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlVXA6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSByZWN0YW5nbGUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICovXG4gIEBPdXRwdXQoKVxuICByaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBfcmVjdGFuZ2xlQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uczogc3RyaW5nW10gPSBbXG4gICAgJ2ZpbGxDb2xvcicsXG4gICAgJ2ZpbGxPcGFjaXR5JyxcbiAgICAnc3Ryb2tlQ29sb3InLFxuICAgICdzdHJva2VPcGFjaXR5JyxcbiAgICAnc3Ryb2tlUG9zaXRpb24nLFxuICAgICdzdHJva2VXZWlnaHQnLFxuICAgICd2aXNpYmxlJyxcbiAgICAnekluZGV4JyxcbiAgICAnY2xpY2thYmxlJyxcbiAgXTtcblxuICBwcml2YXRlIF9ldmVudFN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogUmVjdGFuZ2xlTWFuYWdlcikge31cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX21hbmFnZXIuYWRkUmVjdGFuZ2xlKHRoaXMpO1xuICAgIHRoaXMuX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAoIXRoaXMuX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ25vcnRoJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2Vhc3QnXSB8fFxuICAgICAgY2hhbmdlc1snc291dGgnXSB8fFxuICAgICAgY2hhbmdlc1snd2VzdCddXG4gICAgKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldEJvdW5kcyh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2VkaXRhYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RWRpdGFibGUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlUmVjdGFuZ2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVSZWN0YW5nbGVPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzOiB7XG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2U7XG4gIH0pIHtcbiAgICBsZXQgb3B0aW9uczogeyBbcHJvcE5hbWU6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXG4gICAgICBrID0+IEFnbVJlY3RhbmdsZS5fbWFwT3B0aW9ucy5pbmRleE9mKGspICE9PSAtMSxcbiAgICApO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcbiAgICB9KTtcbiAgICBpZiAob3B0aW9uS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgZXZlbnRzOiBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4gPSBuZXcgTWFwPFxuICAgICAgc3RyaW5nLFxuICAgICAgRXZlbnRFbWl0dGVyPGFueT5cbiAgICA+KCk7XG4gICAgZXZlbnRzLnNldCgnYm91bmRzX2NoYW5nZWQnLCB0aGlzLmJvdW5kc0NoYW5nZSk7XG4gICAgZXZlbnRzLnNldCgnY2xpY2snLCB0aGlzLnJlY3RhbmdsZUNsaWNrKTtcbiAgICBldmVudHMuc2V0KCdkYmxjbGljaycsIHRoaXMucmVjdGFuZ2xlRGJsQ2xpY2spO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWcnLCB0aGlzLmRyYWcpO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWdTdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcbiAgICBldmVudHMuc2V0KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgZXZlbnRzLnNldCgnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCk7XG4gICAgZXZlbnRzLnNldCgnbW91c2VvdmVyJywgdGhpcy5tb3VzZU92ZXIpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIGV2ZW50cy5zZXQoJ3JpZ2h0Y2xpY2snLCB0aGlzLnJpZ2h0Q2xpY2spO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50RW1pdHRlciwgZXZlbnROYW1lKSA9PiB7XG4gICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5fbWFuYWdlclxuICAgICAgICAgIC5jcmVhdGVFdmVudE9ic2VydmFibGU8TWFwTW91c2VFdmVudD4oZXZlbnROYW1lLCB0aGlzKVxuICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnYm91bmRzX2NoYW5nZWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpLnRoZW4oYm91bmRzID0+XG4gICAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG5vcnRoOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICAgICAgICAgICAgICAgIGVhc3Q6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc291dGg6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcbiAgICAgICAgICAgICAgICAgICAgd2VzdDogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpLFxuICAgICAgICAgICAgICAgICAgfSBhcyBMYXRMbmdCb3VuZHNMaXRlcmFsKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkczogeyBsYXQ6IHZhbHVlLmxhdExuZy5sYXQoKSwgbG5nOiB2YWx1ZS5sYXRMbmcubG5nKCkgfSxcbiAgICAgICAgICAgICAgICB9IGFzIE1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24oczogU3Vic2NyaXB0aW9uKSB7XG4gICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLl9tYW5hZ2VyLnJlbW92ZVJlY3RhbmdsZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBMYXRMbmdCb3VuZHMgb2YgdGhpcyBSZWN0YW5nbGUuXG4gICAqL1xuICBnZXRCb3VuZHMoKTogUHJvbWlzZTxMYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRCb3VuZHModGhpcyk7XG4gIH1cbn1cbiJdfQ==