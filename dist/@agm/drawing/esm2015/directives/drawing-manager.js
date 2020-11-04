import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Input, isDevMode, NgZone, Output } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { OverlayType } from '../google-drawing-types';
let AgmDrawingManager = class AgmDrawingManager {
    constructor(_zone) {
        this._zone = _zone;
        /**
         * This event is fired when the user has finished drawing a circle.
         */
        this.circleComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a marker.
         */
        this.markerComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing an overlay of any
         * type.
         */
        this.overlayComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polygon.
         */
        this.polygonComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a polyline.
         */
        this.polylineComplete = new EventEmitter();
        /**
         * This event is fired when the user has finished drawing a rectangle.
         */
        this.rectangleComplete = new EventEmitter();
        this.eventSubscriptions = [];
    }
    setMap(map) {
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
        }
        else if (!map && this.drawingManager) {
            this.drawingManager.setMap(null);
        }
        // else do nothing
    }
    initEvents(drawingManager) {
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(circle => this._zone.run(() => this.circleComplete.next(circle))));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(marker => this._zone.run(() => this.markerComplete.next(marker))));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(polygon => this._zone.run(() => this.polygonComplete.next(polygon))));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(polyline => this._zone.run(() => this.polylineComplete.next(polyline))));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(overlayevent => this._zone.run(() => this.overlayComplete.next(overlayevent))));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(rectangle => this._zone.run(() => this.rectangleComplete.next(rectangle))));
    }
    createMvcObservable(eventName, mvcObject) {
        return fromEventPattern(handler => mvcObject.addListener(eventName, (event) => handler.apply(null, [event])), (_handler, evListener) => evListener.remove());
    }
    ngOnChanges(changes) {
        if (!this.drawingManager) {
            return;
        }
        const options = Object.entries(changes)
            .map(([prop, change]) => [prop, change.currentValue])
            .reduce((obj, [propName, propValue]) => {
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    }
    ngOnDestroy() {
        this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AgmDrawingManager.prototype, "drawingControl", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmDrawingManager.prototype, "drawingMode", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "drawingControlOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "circleOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "markerOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "polygonOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "polylineOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "rectangeOptions", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "circleComplete", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "markerComplete", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "overlayComplete", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "polygonComplete", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "polylineComplete", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AgmDrawingManager.prototype, "rectangleComplete", void 0);
AgmDrawingManager = tslib_1.__decorate([
    Directive({
        selector: 'agm-drawing-manager',
        exportAs: 'agmDrawingManager',
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone])
], AgmDrawingManager);
export { AgmDrawingManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9kcmF3aW5nLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmF3aW5nLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUF3QixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUErQyxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVFuRyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQXlHNUIsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFuQ2pDOztXQUVHO1FBQ08sbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXREOztXQUVHO1FBQ08sbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXREOzs7V0FHRztRQUNPLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFFckU7O1dBRUc7UUFDTyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFeEQ7O1dBRUc7UUFDTyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRTFEOztXQUVHO1FBQ08sc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUVwRCx1QkFBa0IsR0FBbUIsRUFBRSxDQUFDO0lBS2hELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBYztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1REFBdUQ7Z0JBQ25FLHNEQUFzRDtnQkFDdEQsNkRBQTZELENBQUMsQ0FBQztZQUNqRSxPQUFPO1NB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QUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUVGLENBQUE7QUFwTFU7SUFBUixLQUFLLEVBQUU7O3lEQUF5QjtBQU94QjtJQUFSLEtBQUssRUFBRTs7c0RBQWlDO0FBT2hDO0lBQVIsS0FBSyxFQUFFOztnRUFBOEM7QUFTN0M7SUFBUixLQUFLLEVBQUU7O3dEQUE4QjtBQVM3QjtJQUFSLEtBQUssRUFBRTs7d0RBQThCO0FBUzdCO0lBQVIsS0FBSyxFQUFFOzt5REFBZ0M7QUFVL0I7SUFBUixLQUFLLEVBQUU7OzBEQUFrQztBQVVqQztJQUFSLEtBQUssRUFBRTs7MERBQW1DO0FBS2pDO0lBQVQsTUFBTSxFQUFFOzt5REFBNkM7QUFLNUM7SUFBVCxNQUFNLEVBQUU7O3lEQUE2QztBQU01QztJQUFULE1BQU0sRUFBRTs7MERBQTREO0FBSzNEO0lBQVQsTUFBTSxFQUFFOzswREFBK0M7QUFLOUM7SUFBVCxNQUFNLEVBQUU7OzJEQUFpRDtBQUtoRDtJQUFULE1BQU0sRUFBRTs7NERBQW1EO0FBbkdqRCxpQkFBaUI7SUFKN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUUsbUJBQW1CO0tBQzlCLENBQUM7NkNBMEcyQixNQUFNO0dBekd0QixpQkFBaUIsQ0EyTDdCO1NBM0xZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENpcmNsZSwgQ2lyY2xlT3B0aW9ucywgR29vZ2xlTWFwLCBNYXBzRXZlbnRMaXN0ZW5lciwgTWFya2VyLCBNYXJrZXJPcHRpb25zLCBNVkNPYmplY3QsIFBvbHlnb24sIFBvbHlnb25PcHRpb25zLCBQb2x5bGluZSwgUG9seWxpbmVPcHRpb25zLCBSZWN0YW5nbGUsIFJlY3RhbmdsZU9wdGlvbnMgfSBmcm9tICdAYWdtL2NvcmUvc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBpc0Rldk1vZGUsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50UGF0dGVybiwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEcmF3aW5nQ29udHJvbE9wdGlvbnMsIE92ZXJsYXlDb21wbGV0ZUV2ZW50LCBPdmVybGF5VHlwZSB9IGZyb20gJy4uL2dvb2dsZS1kcmF3aW5nLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1kcmF3aW5nLW1hbmFnZXInLFxuICBleHBvcnRBczogJ2FnbURyYXdpbmdNYW5hZ2VyJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtRHJhd2luZ01hbmFnZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveXtcblxuICAvKipcbiAgICogVGhlIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGRyYXdpbmcgY29udHJvbC4gRGVmYXVsdHMgdG8gYHRydWVgLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpIGRyYXdpbmdDb250cm9sOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgRHJhd2luZ01hbmFnZXIncyBkcmF3aW5nIG1vZGUsIHdoaWNoIGRlZmluZXMgdGhlIHR5cGUgb2Ygb3ZlcmxheSB0byBiZVxuICAgKiBhZGRlZCBvbiB0aGUgbWFwLiBBIGRyYXdpbmcgbW9kZSBvZiBudWxsIG1lYW5zIHRoYXQgdGhlIHVzZXIgY2FuIGludGVyYWN0XG4gICAqIHdpdGggdGhlIG1hcCBhcyBub3JtYWwsIGFuZCBjbGlja3MgZG8gbm90IGRyYXcgYW55dGhpbmcuXG4gICAqL1xuICBASW5wdXQoKSBkcmF3aW5nTW9kZTogT3ZlcmxheVR5cGUgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZGlzcGxheSBvcHRpb25zIGZvciB0aGUgZHJhd2luZyBjb250cm9sLlxuICAgKlxuICAgKiBAdHlwZSB7RHJhd2luZ0NvbnRyb2xPcHRpb25zfVxuICAgKi9cbiAgQElucHV0KCkgZHJhd2luZ0NvbnRyb2xPcHRpb25zOiBEcmF3aW5nQ29udHJvbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBjaXJjbGVzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYGNlbnRlcmAgYW5kIGByYWRpdXNgIHByb3BlcnRpZXMgYXJlIGlnbm9yZWQsIGFuZCB0aGUgYG1hcGAgcHJvcGVydHkgb2YgYVxuICAgKiBuZXcgY2lyY2xlIGlzIGFsd2F5cyBzZXQgdG8gdGhlIERyYXdpbmdNYW5hZ2VyJ3MgbWFwLlxuICAgKlxuICAgKiBAdHlwZSB7Q2lyY2xlT3B0aW9uc31cbiAgICovXG4gIEBJbnB1dCgpIGNpcmNsZU9wdGlvbnM6IENpcmNsZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdG8gYXBwbHkgdG8gYW55IG5ldyBtYXJrZXJzIGNyZWF0ZWQgd2l0aCB0aGlzIERyYXdpbmdNYW5hZ2VyLlxuICAgKiBUaGUgYHBvc2l0aW9uYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIGBtYXBgIHByb3BlcnR5IG9mIGEgbmV3IG1hcmtlclxuICAgKiBpcyBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICogQHR5cGUge01hcmtlck9wdGlvbnN9XG4gICAqL1xuICBASW5wdXQoKSBtYXJrZXJPcHRpb25zOiBNYXJrZXJPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIGFwcGx5IHRvIGFueSBuZXcgcG9seWdvbnMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXG4gICAqIFRoZSBgcGF0aHNgIHByb3BlcnR5IGlzIGlnbm9yZWQsIGFuZCB0aGUgbWFwIHByb3BlcnR5IG9mIGEgbmV3IHBvbHlnb24gaXNcbiAgICogYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXG4gICAqXG4gICAqIEB0eXBlIHtQb2x5Z29uT3B0aW9uc31cbiAgICovXG4gIEBJbnB1dCgpIHBvbHlnb25PcHRpb25zOiBQb2x5Z29uT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IHBvbHlsaW5lcyBjcmVhdGVkIHdpdGggdGhpcyBEcmF3aW5nTWFuYWdlci5cbiAgICogVGhlIGBwYXRoYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyBwb2x5bGluZSBpc1xuICAgKiBhbHdheXMgc2V0IHRvIHRoZSBEcmF3aW5nTWFuYWdlcidzIG1hcC5cbiAgICpcbiAgICogQHR5cGUge1BvbHlsaW5lT3B0aW9uc31cbiAgICogQG1lbWJlcm9mIEFnbURyYXdpbmdNYW5hZ2VyXG4gICAqL1xuICBASW5wdXQoKSBwb2x5bGluZU9wdGlvbnM6IFBvbHlsaW5lT3B0aW9ucztcblxuICAvKipcbiAgICogT3B0aW9ucyB0byBhcHBseSB0byBhbnkgbmV3IHJlY3RhbmdsZXMgY3JlYXRlZCB3aXRoIHRoaXMgRHJhd2luZ01hbmFnZXIuXG4gICAqIFRoZSBgYm91bmRzYCBwcm9wZXJ0eSBpcyBpZ25vcmVkLCBhbmQgdGhlIG1hcCBwcm9wZXJ0eSBvZiBhIG5ldyByZWN0YW5nbGVcbiAgICogaXMgYWx3YXlzIHNldCB0byB0aGUgRHJhd2luZ01hbmFnZXIncyBtYXAuXG4gICAqXG4gICAqIEB0eXBlIHtSZWN0YW5nbGVPcHRpb25zfVxuICAgKiBAbWVtYmVyb2YgQWdtRHJhd2luZ01hbmFnZXJcbiAgICovXG4gIEBJbnB1dCgpIHJlY3RhbmdlT3B0aW9uczogUmVjdGFuZ2xlT3B0aW9ucztcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgY2lyY2xlLlxuICAgKi9cbiAgQE91dHB1dCgpIGNpcmNsZUNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxDaXJjbGU+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIG1hcmtlci5cbiAgICovXG4gIEBPdXRwdXQoKSBtYXJrZXJDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYW4gb3ZlcmxheSBvZiBhbnlcbiAgICogdHlwZS5cbiAgICovXG4gIEBPdXRwdXQoKSBvdmVybGF5Q29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPE92ZXJsYXlDb21wbGV0ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIGRyYXdpbmcgYSBwb2x5Z29uLlxuICAgKi9cbiAgQE91dHB1dCgpIHBvbHlnb25Db21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seWdvbj4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGhhcyBmaW5pc2hlZCBkcmF3aW5nIGEgcG9seWxpbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9seWxpbmVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8UG9seWxpbmU+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBoYXMgZmluaXNoZWQgZHJhd2luZyBhIHJlY3RhbmdsZS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWN0YW5nbGVDb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVjdGFuZ2xlPigpO1xuXG4gIHByaXZhdGUgZXZlbnRTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgZHJhd2luZ01hbmFnZXI6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgfVxuXG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCkge1xuICAgIGlmICghZ29vZ2xlLm1hcHMuZHJhd2luZyAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IHVzZSBkcmF3aW5nIG1hbmFnZXIgaWYgZHJhd2luZyBsaWJyYXJ5IGlzIG5vdCAnICtcbiAgICAgICAgJ2xvYWRlZC4gVG8gZml4LCBhZGQgbGlicmFyaWVzOiBbXFwnZHJhd2luZ1xcJ10gdG8gdGhlICcgK1xuICAgICAgICAnbGF6eU1hcHNBUElMb2FkZXJDb25maWcgeW91IHBhc3NlZCB0byBBZ21Db3JlTW9kdWxlLmZvclJvb3QnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1hcCAmJiAhdGhpcy5kcmF3aW5nTWFuYWdlcikge1xuICAgICAgdGhpcy5kcmF3aW5nTWFuYWdlciA9IG5ldyBnb29nbGUubWFwcy5kcmF3aW5nLkRyYXdpbmdNYW5hZ2VyKHtcbiAgICAgICAgICBtYXAsXG4gICAgICAgICAgY2lyY2xlT3B0aW9uczogdGhpcy5jaXJjbGVPcHRpb25zLFxuICAgICAgICAgIG1hcmtlck9wdGlvbnM6IHRoaXMubWFya2VyT3B0aW9ucyxcbiAgICAgICAgICBwb2x5Z29uT3B0aW9uczogdGhpcy5wb2x5Z29uT3B0aW9ucyxcbiAgICAgICAgICBwb2x5bGluZU9wdGlvbnM6IHRoaXMucG9seWxpbmVPcHRpb25zLFxuICAgICAgICAgIHJlY3RhbmdlT3B0aW9uczogdGhpcy5yZWN0YW5nZU9wdGlvbnMsXG4gICAgICAgICAgZHJhd2luZ0NvbnRyb2w6IHRoaXMuZHJhd2luZ0NvbnRyb2wsXG4gICAgICAgICAgZHJhd2luZ0NvbnRyb2xPcHRpb25zOiB0aGlzLmRyYXdpbmdDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICBkcmF3aW5nTW9kZTogdGhpcy5kcmF3aW5nTW9kZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbml0RXZlbnRzKHRoaXMuZHJhd2luZ01hbmFnZXIpO1xuICAgIH0gZWxzZSBpZiAoIW1hcCAmJiB0aGlzLmRyYXdpbmdNYW5hZ2VyKSB7XG4gICAgICB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChudWxsKTtcbiAgICB9XG4gICAgLy8gZWxzZSBkbyBub3RoaW5nXG4gIH1cblxuICBpbml0RXZlbnRzKGRyYXdpbmdNYW5hZ2VyOiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPENpcmNsZT4oJ2NpcmNsZWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKGNpcmNsZSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLmNpcmNsZUNvbXBsZXRlLm5leHQoY2lyY2xlKSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPE1hcmtlcj4oJ21hcmtlcmNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKG1hcmtlciA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLm1hcmtlckNvbXBsZXRlLm5leHQobWFya2VyKSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPFBvbHlnb24+KCdwb2x5Z29uY29tcGxldGUnLCBkcmF3aW5nTWFuYWdlcilcbiAgICAgIC5zdWJzY3JpYmUocG9seWdvbiA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnBvbHlnb25Db21wbGV0ZS5uZXh0KHBvbHlnb24pKSlcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNyZWF0ZU12Y09ic2VydmFibGU8UG9seWxpbmU+KCdwb2x5bGluZWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKHBvbHlsaW5lID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucG9seWxpbmVDb21wbGV0ZS5uZXh0KHBvbHlsaW5lKSkpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jcmVhdGVNdmNPYnNlcnZhYmxlPE92ZXJsYXlDb21wbGV0ZUV2ZW50Pignb3ZlcmxheWNvbXBsZXRlJywgZHJhd2luZ01hbmFnZXIpXG4gICAgICAuc3Vic2NyaWJlKG92ZXJsYXlldmVudCA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLm92ZXJsYXlDb21wbGV0ZS5uZXh0KG92ZXJsYXlldmVudCkpKVxuICAgICk7XG4gICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY3JlYXRlTXZjT2JzZXJ2YWJsZTxSZWN0YW5nbGU+KCdyZWN0YW5nbGVjb21wbGV0ZScsIGRyYXdpbmdNYW5hZ2VyKVxuICAgICAgLnN1YnNjcmliZShyZWN0YW5nbGUgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5yZWN0YW5nbGVDb21wbGV0ZS5uZXh0KHJlY3RhbmdsZSkpKVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVNdmNPYnNlcnZhYmxlPEU+KGV2ZW50TmFtZTogc3RyaW5nLCBtdmNPYmplY3Q6IE1WQ09iamVjdCk6IE9ic2VydmFibGU8RT4ge1xuICAgIHJldHVybiBmcm9tRXZlbnRQYXR0ZXJuKFxuICAgICAgaGFuZGxlciA9PiBtdmNPYmplY3QuYWRkTGlzdGVuZXIoZXZlbnROYW1lLFxuICAgICAgICAoZXZlbnQ/OiBFKSA9PiBoYW5kbGVyLmFwcGx5KG51bGwsIFtldmVudF0pKSxcbiAgICAgIChfaGFuZGxlcjogRnVuY3Rpb24sIGV2TGlzdGVuZXI6IE1hcHNFdmVudExpc3RlbmVyKSA9PiBldkxpc3RlbmVyLnJlbW92ZSgpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZHJhd2luZ01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmVudHJpZXMoY2hhbmdlcylcbiAgICAubWFwKChbcHJvcCwgY2hhbmdlXSkgPT4gW3Byb3AsIGNoYW5nZS5jdXJyZW50VmFsdWVdKVxuICAgIC5yZWR1Y2UoKG9iajogYW55LCBbcHJvcE5hbWUsIHByb3BWYWx1ZV0pID0+IHtcbiAgICAgIG9ialtwcm9wTmFtZV0gPSBwcm9wVmFsdWU7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcbiAgICB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gIH1cblxufVxuIl19