import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { CircleManager } from '../services/managers/circle-manager';
var AgmCircle = /** @class */ (function () {
    function AgmCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
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
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new EventEmitter();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    AgmCircle_1 = AgmCircle;
    /** @internal */
    AgmCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmCircle.prototype.ngOnChanges = function (changes) {
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
    };
    AgmCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle_1._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
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
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    AgmCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    AgmCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    AgmCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    var AgmCircle_1;
    AgmCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex', 'clickable',
    ];
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmCircle.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmCircle.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input('circleDraggable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmCircle.prototype, "fillColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmCircle.prototype, "fillOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "radius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmCircle.prototype, "strokeColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmCircle.prototype, "strokeOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmCircle.prototype, "strokePosition", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "strokeWeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmCircle.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmCircle.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "centerChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "circleClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "circleDblClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "mouseDown", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "mouseMove", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "mouseUp", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "radiusChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmCircle.prototype, "rightClick", void 0);
    AgmCircle = AgmCircle_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-circle',
        }),
        tslib_1.__metadata("design:paramtypes", [CircleManager])
    ], AgmCircle);
    return AgmCircle;
}());
export { AgmCircle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUtuSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFLcEU7SUFvSkUsbUJBQW9CLFFBQXVCO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQWU7UUF6STNDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7V0FFRztRQUNILDJDQUEyQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTVDOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFZMUI7O1dBRUc7UUFDTSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBWXBCOzs7V0FHRztRQUNNLG1CQUFjLEdBQW9DLFFBQVEsQ0FBQztRQUVwRTs7V0FFRztRQUNNLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRTFCOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztRQU94Qjs7V0FFRztRQUNPLGlCQUFZLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBRXhGOztXQUVHO1FBQ08sZ0JBQVcsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUVqRjs7V0FFRztRQUNPLG1CQUFjLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFcEY7O1dBRUc7UUFDTyxTQUFJLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFMUU7O1dBRUc7UUFDTyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFN0U7O1dBRUc7UUFDTyxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7UUFFL0U7O1dBRUc7UUFDTyxjQUFTLEdBQTZCLElBQUksWUFBWSxFQUFj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TSxFQUFFOzBDQUFZLFlBQVk7Z0RBQThDO0lBS3JFO1FBQVQsTUFBTSxFQUFFOzBDQUFZLFlBQVk7Z0RBQThDO0lBS3JFO1FBQVQsTUFBTSxFQUFFOzBDQUFXLFlBQVk7K0NBQThDO0lBS3BFO1FBQVQsTUFBTSxFQUFFOzBDQUFZLFlBQVk7Z0RBQThDO0lBS3JFO1FBQVQsTUFBTSxFQUFFOzBDQUFVLFlBQVk7OENBQThDO0lBS25FO1FBQVQsTUFBTSxFQUFFOzBDQUFlLFlBQVk7bURBQXNDO0lBS2hFO1FBQVQsTUFBTSxFQUFFOzBDQUFhLFlBQVk7aURBQThDO0lBeklyRSxTQUFTO1FBSHJCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7aURBcUo4QixhQUFhO09BcEpoQyxTQUFTLENBK09yQjtJQUFELGdCQUFDO0NBQUEsQUEvT0QsSUErT0M7U0EvT1ksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vbWFwLXR5cGVzJztcbmltcG9ydCB7IExhdExuZywgTGF0TG5nQm91bmRzLCBMYXRMbmdMaXRlcmFsLCBNb3VzZUV2ZW50IGFzIE1hcE1vdXNlRXZlbnQgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBDaXJjbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tY2lyY2xlJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtQ2lyY2xlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSAocmVxdWlyZWQpLlxuICAgKi9cbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNsaWNrYWJsZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIChyZXF1aXJlZCkuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBDaXJjbGUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBjaXJjbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjaXJjbGVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgY2lyY2xlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdFxuICAgKiB0aGUgY2VudGVyIGFuZCBhcm91bmQgdGhlIGNpcmN1bWZlcmVuY2Ugb2YgdGhlIGNpcmNsZS4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXG4gICAqL1xuICBASW5wdXQoKSBmaWxsQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZpbGwgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxuICAgKi9cbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHJhZGl1cyBpbiBtZXRlcnMgb24gdGhlIEVhcnRoJ3Mgc3VyZmFjZS5cbiAgICovXG4gIEBJbnB1dCgpIHJhZGl1cyA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWQgY29sb3JzLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBwb3NpdGlvbi4gRGVmYXVsdHMgdG8gQ0VOVEVSLlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIG5vdCBzdXBwb3J0ZWQgb24gSW50ZXJuZXQgRXhwbG9yZXIgOCBhbmQgZWFybGllci5cbiAgICovXG4gIEBJbnB1dCgpIHN0cm9rZVBvc2l0aW9uOiAnQ0VOVEVSJyB8ICdJTlNJREUnIHwgJ09VVFNJREUnID0gJ0NFTlRFUic7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2Ugd2lkdGggaW4gcGl4ZWxzLlxuICAgKi9cbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0ID0gMDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGlzIGNpcmNsZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cbiAgICovXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSdzIGNlbnRlciBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGNlbnRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgY2lyY2xlQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGNpcmNsZURibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlRG93bjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICovXG4gIEBPdXRwdXQoKSBtb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBjaXJjbGUgbW91c2VvdXQuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBjaXJjbGUgbW91c2VvdmVyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VVcDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSdzIHJhZGl1cyBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHJhZGl1c0NoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBjaXJjbGUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICovXG4gIEBPdXRwdXQoKSByaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBfY2lyY2xlQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uczogc3RyaW5nW10gPSBbXG4gICAgJ2ZpbGxDb2xvcicsICdmaWxsT3BhY2l0eScsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVBvc2l0aW9uJywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3Zpc2libGUnLCAnekluZGV4JywgJ2NsaWNrYWJsZScsXG4gIF07XG5cbiAgcHJpdmF0ZSBfZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IENpcmNsZU1hbmFnZXIpIHt9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tYW5hZ2VyLmFkZENpcmNsZSh0aGlzKTtcbiAgICB0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICghdGhpcy5fY2lyY2xlQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0Q2VudGVyKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZWRpdGFibGUnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRFZGl0YWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldERyYWdnYWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkge1xuICAgICAgdGhpcy5fbWFuYWdlci5zZXRWaXNpYmxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sncmFkaXVzJ10pIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0UmFkaXVzKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVDaXJjbGVPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNpcmNsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXM6IHtbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBsZXQgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGxldCBvcHRpb25LZXlzID1cbiAgICAgICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGsgPT4gQWdtQ2lyY2xlLl9tYXBPcHRpb25zLmluZGV4T2YoaykgIT09IC0xKTtcbiAgICBvcHRpb25LZXlzLmZvckVhY2goKGspID0+IHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICBpZiAob3B0aW9uS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJFdmVudExpc3RlbmVycygpIHtcbiAgICBsZXQgZXZlbnRzOiBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4gPSBuZXcgTWFwPHN0cmluZywgRXZlbnRFbWl0dGVyPGFueT4+KCk7XG4gICAgZXZlbnRzLnNldCgnY2VudGVyX2NoYW5nZWQnLCB0aGlzLmNlbnRlckNoYW5nZSk7XG4gICAgZXZlbnRzLnNldCgnY2xpY2snLCB0aGlzLmNpcmNsZUNsaWNrKTtcbiAgICBldmVudHMuc2V0KCdkYmxjbGljaycsIHRoaXMuY2lyY2xlRGJsQ2xpY2spO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWcnLCB0aGlzLmRyYWcpO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xuICAgIGV2ZW50cy5zZXQoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcbiAgICBldmVudHMuc2V0KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgZXZlbnRzLnNldCgnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCk7XG4gICAgZXZlbnRzLnNldCgnbW91c2VvdmVyJywgdGhpcy5tb3VzZU92ZXIpO1xuICAgIGV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIGV2ZW50cy5zZXQoJ3JhZGl1c19jaGFuZ2VkJywgdGhpcy5yYWRpdXNDaGFuZ2UpO1xuICAgIGV2ZW50cy5zZXQoJ3JpZ2h0Y2xpY2snLCB0aGlzLnJpZ2h0Q2xpY2spO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKGV2ZW50RW1pdHRlciwgZXZlbnROYW1lKSA9PiB7XG4gICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxNYXBNb3VzZUV2ZW50PihldmVudE5hbWUsIHRoaXMpLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ3JhZGl1c19jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLmdldFJhZGl1cyh0aGlzKS50aGVuKChyYWRpdXMpID0+IGV2ZW50RW1pdHRlci5lbWl0KHJhZGl1cykpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjZW50ZXJfY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5nZXRDZW50ZXIodGhpcykudGhlbihcbiAgICAgICAgICAgICAgICAgICAgKGNlbnRlcikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHtsYXQ6IGNlbnRlci5sYXQoKSwgbG5nOiBjZW50ZXIubG5nKCl9IGFzIExhdExuZ0xpdGVyYWwpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdChcbiAgICAgICAgICAgICAgICAgICAge2Nvb3Jkczoge2xhdDogdmFsdWUubGF0TG5nLmxhdCgpLCBsbmc6IHZhbHVlLmxhdExuZy5sbmcoKX19IGFzIE1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24oczogU3Vic2NyaXB0aW9uKSB7IHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLl9tYW5hZ2VyLnJlbW92ZUNpcmNsZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBMYXRMbmdCb3VuZHMgb2YgdGhpcyBDaXJjbGUuXG4gICAqL1xuICBnZXRCb3VuZHMoKTogUHJvbWlzZTxMYXRMbmdCb3VuZHM+IHsgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpOyB9XG5cbiAgZ2V0Q2VudGVyKCk6IFByb21pc2U8TGF0TG5nPiB7IHJldHVybiB0aGlzLl9tYW5hZ2VyLmdldENlbnRlcih0aGlzKTsgfVxufVxuIl19