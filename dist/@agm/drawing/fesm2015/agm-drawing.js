import { __decorate, __metadata, __param } from 'tslib';
import { EventEmitter, isDevMode, Input, Output, Directive, NgZone, Host, NgModule } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { AgmMap, AgmCoreModule } from '@agm/core';
import { first } from 'rxjs/operators';

var OverlayType;
(function (OverlayType) {
    OverlayType["CIRCLE"] = "circle";
    OverlayType["MARKER"] = "marker";
    OverlayType["POLYGONE"] = "polygon";
    OverlayType["POLYLINE"] = "polyline";
    OverlayType["RECTANGE"] = "rectangle";
})(OverlayType || (OverlayType = {}));

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
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AgmDrawingManager.prototype, "drawingControl", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmDrawingManager.prototype, "drawingMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "drawingControlOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "circleOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "markerOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "polygonOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "polylineOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "rectangeOptions", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "circleComplete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "markerComplete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "overlayComplete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "polygonComplete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "polylineComplete", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AgmDrawingManager.prototype, "rectangleComplete", void 0);
AgmDrawingManager = __decorate([
    Directive({
        selector: 'agm-drawing-manager',
        exportAs: 'agmDrawingManager',
    }),
    __metadata("design:paramtypes", [NgZone])
], AgmDrawingManager);

let AgmDrawingManagerTrigger = class AgmDrawingManagerTrigger {
    constructor(_agmMap) {
        this._agmMap = _agmMap;
    }
    ngAfterViewInit() {
        this._agmMap.mapReady.pipe(first()).subscribe(map => this.drawingManager.setMap(map));
    }
    ngOnDestroy() {
        this._agmMap.mapReady.pipe(first()).subscribe(() => this.drawingManager.setMap(null));
    }
};
__decorate([
    Input('agmDrawingManager'),
    __metadata("design:type", AgmDrawingManager)
], AgmDrawingManagerTrigger.prototype, "drawingManager", void 0);
AgmDrawingManagerTrigger = __decorate([
    Directive({
        selector: 'agm-map[agmDrawingManager]',
        exportAs: 'matDrawingManagerTrigger',
    }),
    __param(0, Host()),
    __metadata("design:paramtypes", [AgmMap])
], AgmDrawingManagerTrigger);

let AgmDrawingModule = class AgmDrawingModule {
};
AgmDrawingModule = __decorate([
    NgModule({
        imports: [AgmCoreModule],
        declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
        exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
    })
], AgmDrawingModule);

export { AgmDrawingManager, AgmDrawingManagerTrigger, AgmDrawingModule, OverlayType };
//# sourceMappingURL=agm-drawing.js.map
