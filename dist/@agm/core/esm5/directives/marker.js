import * as tslib_1 from "tslib";
import { ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FitBoundsAccessor } from '../services/fit-bounds';
import { MarkerManager } from '../services/managers/marker-manager';
import { AgmInfoWindow } from './info-window';
var markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
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
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarker = /** @class */ (function () {
    function AgmMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * If true, the marker can be clicked. Default value is true.
         */
        // tslint:disable-next-line:no-input-rename
        this.clickable = true;
        /**
         * This event is fired when the marker's animation property changes.
         *
         * @memberof AgmMarker
         */
        this.animationChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks twice on the marker.
         */
        this.markerDblClick = new EventEmitter();
        /**
         * This event is fired when the user rightclicks on the marker.
         */
        this.markerRightClick = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the marker.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         */
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new EventEmitter();
        /** @internal */
        this.infoWindow = new QueryList();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._fitBoundsDetails$ = new ReplaySubject(1);
        this._id = (markerId++).toString();
    }
    AgmMarker_1 = AgmMarker;
    /* @internal */
    AgmMarker.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AgmMarker.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (marker) {
            marker.hostMarker = _this;
        });
    };
    /** @internal */
    AgmMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude === 'string') {
            this.latitude = Number(this.latitude);
        }
        if (typeof this.longitude === 'string') {
            this.longitude = Number(this.longitude);
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._updateFitBoundsDetails();
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
            this._updateFitBoundsDetails();
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
        if (changes['clickable']) {
            this._markerManager.updateClickable(this);
        }
        if (changes['animation']) {
            this._markerManager.updateAnimation(this);
        }
    };
    /** @internal */
    AgmMarker.prototype.getFitBoundsDetails$ = function () {
        return this._fitBoundsDetails$.asObservable();
    };
    AgmMarker.prototype._updateFitBoundsDetails = function () {
        this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
    };
    AgmMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow) {
                _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
            }
            _this.markerClick.emit(_this);
        });
        this._observableSubscriptions.push(cs);
        var dcs = this._markerManager.createEventObservable('dblclick', this).subscribe(function () {
            _this.markerDblClick.emit(null);
        });
        this._observableSubscriptions.push(dcs);
        var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
            _this.markerRightClick.emit(null);
        });
        this._observableSubscriptions.push(rc);
        var ds = this._markerManager.createEventObservable('dragstart', this)
            .subscribe(function (e) {
            _this.dragStart.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var d = this._markerManager.createEventObservable('drag', this)
            .subscribe(function (e) {
            _this.drag.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(d);
        var de = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(de);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
        var anChng = this._markerManager.createEventObservable('animation_changed', this)
            .subscribe(function () {
            _this.animationChange.emit(_this.animation);
        });
        this._observableSubscriptions.push(anChng);
    };
    /** @internal */
    AgmMarker.prototype.id = function () { return this._id; };
    /** @internal */
    AgmMarker.prototype.toString = function () { return 'AgmMarker-' + this._id.toString(); };
    /** @internal */
    AgmMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    var AgmMarker_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMarker.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMarker.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMarker.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "label", void 0);
    tslib_1.__decorate([
        Input('markerDraggable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMarker.prototype, "iconUrl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "visible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "openInfoWindow", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "opacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Input('markerClickable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "clickable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMarker.prototype, "animation", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMarker.prototype, "animationChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "markerClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "markerDblClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "markerRightClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "dragStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "drag", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "dragEnd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "mouseOver", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMarker.prototype, "mouseOut", void 0);
    tslib_1.__decorate([
        ContentChildren(AgmInfoWindow),
        tslib_1.__metadata("design:type", QueryList)
    ], AgmMarker.prototype, "infoWindow", void 0);
    AgmMarker = AgmMarker_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-marker',
            providers: [
                { provide: FitBoundsAccessor, useExisting: forwardRef(function () { return AgmMarker_1; }) },
            ],
            inputs: [
                'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation',
            ],
            outputs: ['markerClick', 'dragStart', 'drag', 'dragEnd', 'mouseOver', 'mouseOut'],
        }),
        tslib_1.__metadata("design:paramtypes", [MarkerManager])
    ], AgmMarker);
    return AgmMarker;
}());
export { AgmMarker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBb0IsZUFBZSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckssT0FBTyxFQUFjLGFBQWEsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQVlIO0lBMkhFLG1CQUFvQixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQXRHakQ7O1dBRUc7UUFDSCwyQ0FBMkM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQU81Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFeEI7O1dBRUc7UUFDTSxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUUvQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFckI7Ozs7O1dBS0c7UUFDTSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRXBCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFRM0M7Ozs7V0FJRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUUxRDs7V0FFRztRQUNPLGdCQUFXLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7UUFFL0U7O1dBRUc7UUFDTyxtQkFBYyxHQUE0QixJQUFJLFlB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RSxHQUNOLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLFdBQVcsRUFBRSxJQUFJLENBQUM7YUFDOUUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFnQixDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZDLElBQU0sQ0FBQyxHQUNMLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDekUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFnQixDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQU0sRUFBRSxHQUNOLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLFNBQVMsRUFBRSxJQUFJLENBQUM7YUFDNUUsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7WUFDaEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUs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QTRDO0lBS3JFO1FBQVQsTUFBTSxFQUFFOzBDQUFpQixZQUFZO3FEQUE0QztJQUt4RTtRQUFULE1BQU0sRUFBRTswQ0FBbUIsWUFBWTt1REFBa0M7SUFLaEU7UUFBVCxNQUFNLEVBQUU7MENBQVksWUFBWTtnREFBOEM7SUFLckU7UUFBVCxNQUFNLEVBQUU7MENBQU8sWUFBWTsyQ0FBOEM7SUFLaEU7UUFBVCxNQUFNLEVBQUU7MENBQVUsWUFBWTs4Q0FBOEM7SUFLbkU7UUFBVCxNQUFNLEVBQUU7MENBQVksWUFBWTtnREFBOEM7SUFLckU7UUFBVCxNQUFNLEVBQUU7MENBQVcsWUFBWTsrQ0FBOEM7SUFHOUM7UUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQzswQ0FBYSxTQUFTO2lEQUFpRDtJQW5IM0YsU0FBUztRQVhyQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsV0FBUyxFQUFULENBQVMsQ0FBQyxFQUFFO2FBQ3pFO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxTQUFTO2dCQUNsRixnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXO2FBQzlEO1lBQ0QsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7U0FDbEYsQ0FBQztpREE0SG9DLGFBQWE7T0EzSHRDLFNBQVMsQ0FrUnJCO0lBQUQsZ0JBQUM7Q0FBQSxBQWxSRCxJQWtSQztTQWxSWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9tYXAtdHlwZXMnO1xuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9pbmZvLXdpbmRvdyc7XG5cbmxldCBtYXJrZXJJZCA9IDA7XG5cbi8qKlxuICogQWdtTWFya2VyIHJlbmRlcnMgYSBtYXAgbWFya2VyIGluc2lkZSBhIHtAbGluayBBZ21NYXB9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1tYXJrZXInLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IEZpdEJvdW5kc0FjY2Vzc29yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZ21NYXJrZXIpIH0sXG4gIF0sXG4gIGlucHV0czogW1xuICAgICdsYXRpdHVkZScsICdsb25naXR1ZGUnLCAndGl0bGUnLCAnbGFiZWwnLCAnZHJhZ2dhYmxlOiBtYXJrZXJEcmFnZ2FibGUnLCAnaWNvblVybCcsXG4gICAgJ29wZW5JbmZvV2luZG93JywgJ29wYWNpdHknLCAndmlzaWJsZScsICd6SW5kZXgnLCAnYW5pbWF0aW9uJyxcbiAgXSxcbiAgb3V0cHV0czogWydtYXJrZXJDbGljaycsICdkcmFnU3RhcnQnLCAnZHJhZycsICdkcmFnRW5kJywgJ21vdXNlT3ZlcicsICdtb3VzZU91dCddLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21NYXJrZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgRml0Qm91bmRzQWNjZXNzb3Ige1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHRpdGxlIG9mIHRoZSBtYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFiZWwgKGEgc2luZ2xlIHVwcGVyY2FzZSBjaGFyYWN0ZXIpIGZvciB0aGUgbWFya2VyLlxuICAgKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG1hcFR5cGVzLk1hcmtlckxhYmVsO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBkcmFnZ2VkLiBEZWZhdWx0IHZhbHVlIGlzIGZhbHNlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ21hcmtlckRyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJY29uICh0aGUgVVJMIG9mIHRoZSBpbWFnZSkgZm9yIHRoZSBmb3JlZ3JvdW5kLlxuICAgKi9cbiAgQElucHV0KCkgaWNvblVybDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGlzIHZpc2libGVcbiAgICovXG4gIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgb3BlbiB0aGUgY2hpbGQgaW5mbyB3aW5kb3cgd2hlbiB0aGUgbWFya2VyIGlzIGNsaWNrZWQuXG4gICAqL1xuICBASW5wdXQoKSBvcGVuSW5mb1dpbmRvdyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXJrZXIncyBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXG4gICAqL1xuICBASW5wdXQoKSBvcGFjaXR5ID0gMTtcblxuICAvKipcbiAgICogQWxsIG1hcmtlcnMgYXJlIGRpc3BsYXllZCBvbiB0aGUgbWFwIGluIG9yZGVyIG9mIHRoZWlyIHpJbmRleCwgd2l0aCBoaWdoZXIgdmFsdWVzIGRpc3BsYXlpbmcgaW5cbiAgICogZnJvbnQgb2YgbWFya2VycyB3aXRoIGxvd2VyIHZhbHVlcy4gQnkgZGVmYXVsdCwgbWFya2VycyBhcmUgZGlzcGxheWVkIGFjY29yZGluZyB0byB0aGVpclxuICAgKiB2ZXJ0aWNhbCBwb3NpdGlvbiBvbiBzY3JlZW4sIHdpdGggbG93ZXIgbWFya2VycyBhcHBlYXJpbmcgaW4gZnJvbnQgb2YgbWFya2VycyBmdXJ0aGVyIHVwIHRoZVxuICAgKiBzY3JlZW4uXG4gICAqL1xuICBASW5wdXQoKSB6SW5kZXggPSAxO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBjbGlja2VkLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWFya2VyQ2xpY2thYmxlJykgY2xpY2thYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hpY2ggYW5pbWF0aW9uIHRvIHBsYXkgd2hlbiBtYXJrZXIgaXMgYWRkZWQgdG8gYSBtYXAuXG4gICAqIFRoaXMgY2FuIGJlICdCT1VOQ0UnIG9yICdEUk9QJ1xuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0aW9uOiBBbmltYXRpb247XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFya2VyJ3MgYW5pbWF0aW9uIHByb3BlcnR5IGNoYW5nZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBZ21NYXJrZXJcbiAgICovXG4gIEBPdXRwdXQoKSBhbmltYXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHR3aWNlIG9uIHRoZSBtYXJrZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFya2VyRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxBZ21NYXJrZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciByaWdodGNsaWNrcyBvbiB0aGUgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcmtlclJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIG1hcmtlci5cbiAgICovXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vdXNlcyBvdmVyIHRoZSBtYXJrZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb3VzZXMgb3V0c2lkZSB0aGUgbWFya2VyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBAQ29udGVudENoaWxkcmVuKEFnbUluZm9XaW5kb3cpIGluZm9XaW5kb3c6IFF1ZXJ5TGlzdDxBZ21JbmZvV2luZG93PiA9IG5ldyBRdWVyeUxpc3Q8QWdtSW5mb1dpbmRvdz4oKTtcblxuICBwcml2YXRlIF9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBfZml0Qm91bmRzRGV0YWlscyQ6IFJlcGxheVN1YmplY3Q8Rml0Qm91bmRzRGV0YWlscz4gPSBuZXcgUmVwbGF5U3ViamVjdDxGaXRCb3VuZHNEZXRhaWxzPigxKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZXJNYW5hZ2VyOiBNYXJrZXJNYW5hZ2VyKSB7IHRoaXMuX2lkID0gKG1hcmtlcklkKyspLnRvU3RyaW5nKCk7IH1cblxuICAvKiBAaW50ZXJuYWwgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpO1xuICAgIHRoaXMuaW5mb1dpbmRvdy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuaW5mb1dpbmRvdy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vIG1vcmUgdGhhbiBvbmUgaW5mbyB3aW5kb3cuJyk7XG4gICAgfVxuICAgIHRoaXMuaW5mb1dpbmRvdy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICBtYXJrZXIuaG9zdE1hcmtlciA9IHRoaXM7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmxhdGl0dWRlID0gTnVtYmVyKHRoaXMubGF0aXR1ZGUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMubG9uZ2l0dWRlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5sb25naXR1ZGUgPSBOdW1iZXIodGhpcy5sb25naXR1ZGUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmFkZE1hcmtlcih0aGlzKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUZpdEJvdW5kc0RldGFpbHMoKTtcbiAgICAgIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIgPSB0cnVlO1xuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTWFya2VyUG9zaXRpb24odGhpcyk7XG4gICAgICB0aGlzLl91cGRhdGVGaXRCb3VuZHNEZXRhaWxzKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd0aXRsZSddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVRpdGxlKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbGFiZWwnXSkge1xuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVMYWJlbCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2ljb25VcmwnXSkge1xuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVJY29uKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snb3BhY2l0eSddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU9wYWNpdHkodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVmlzaWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVpJbmRleCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2NsaWNrYWJsZSddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUNsaWNrYWJsZSh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2FuaW1hdGlvbiddKSB7XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUFuaW1hdGlvbih0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz4ge1xuICAgIHJldHVybiB0aGlzLl9maXRCb3VuZHNEZXRhaWxzJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdXBkYXRlRml0Qm91bmRzRGV0YWlscygpIHtcbiAgICB0aGlzLl9maXRCb3VuZHNEZXRhaWxzJC5uZXh0KHsgbGF0TG5nOiB7IGxhdDogdGhpcy5sYXRpdHVkZSwgbG5nOiB0aGlzLmxvbmdpdHVkZSB9IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3BlbkluZm9XaW5kb3cpIHtcbiAgICAgICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2goaW5mb1dpbmRvdyA9PiBpbmZvV2luZG93Lm9wZW4oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1hcmtlckNsaWNrLmVtaXQodGhpcyk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChjcyk7XG5cbiAgICBjb25zdCBkY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnZGJsY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tYXJrZXJEYmxDbGljay5lbWl0KG51bGwpO1xuICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZGNzKTtcblxuICAgIGNvbnN0IHJjID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ3JpZ2h0Y2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tYXJrZXJSaWdodENsaWNrLmVtaXQobnVsbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChyYyk7XG5cbiAgICBjb25zdCBkcyA9XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignZHJhZ3N0YXJ0JywgdGhpcylcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0LmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XG4gICAgICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZHMpO1xuXG4gICAgY29uc3QgZCA9XG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxtYXBUeXBlcy5Nb3VzZUV2ZW50PignZHJhZycsIHRoaXMpXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IG1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmRyYWcuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSBhcyBNb3VzZUV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkKTtcblxuICAgIGNvbnN0IGRlID1cbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdkcmFnZW5kJywgdGhpcylcbiAgICAgICAgLnN1YnNjcmliZSgoZTogbWFwVHlwZXMuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhZ0VuZC5lbWl0KHsgY29vcmRzOiB7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSB9IGFzIE1vdXNlRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGRlKTtcblxuICAgIGNvbnN0IG1vdmVyID1cbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdtb3VzZW92ZXInLCB0aGlzKVxuICAgICAgICAuc3Vic2NyaWJlKChlOiBtYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5tb3VzZU92ZXIuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSBhcyBNb3VzZUV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3Zlcik7XG5cbiAgICBjb25zdCBtb3V0ID1cbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPG1hcFR5cGVzLk1vdXNlRXZlbnQ+KCdtb3VzZW91dCcsIHRoaXMpXG4gICAgICAgIC5zdWJzY3JpYmUoKGU6IG1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLm1vdXNlT3V0LmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0gYXMgTW91c2VFdmVudCk7XG4gICAgICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gobW91dCk7XG5cbiAgICBjb25zdCBhbkNobmcgPVxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8dm9pZD4oJ2FuaW1hdGlvbl9jaGFuZ2VkJywgdGhpcylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmFuaW1hdGlvbik7XG4gICAgICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goYW5DaG5nKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ0FnbU1hcmtlci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbWFya2VyTWFuYWdlci5kZWxldGVNYXJrZXIodGhpcyk7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBBbmltYXRpb24gPSAnQk9VTkNFJyB8ICdEUk9QJyB8IG51bGw7XG4iXX0=