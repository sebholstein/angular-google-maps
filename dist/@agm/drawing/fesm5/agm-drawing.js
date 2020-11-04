import { __read, __decorate, __metadata, __param } from 'tslib';
import { isDevMode, Input, Output, Directive, NgZone, EventEmitter, Host, NgModule } from '@angular/core';
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

var AgmDrawingManager = /** @class */ (function () {
    function AgmDrawingManager(_zone) {
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
    AgmDrawingManager.prototype.setMap = function (map) {
        if (!google.maps.drawing && isDevMode()) {
            console.error('Cannot use drawing manager if drawing library is not ' +
                'loaded. To fix, add libraries: [\'drawing\'] to the ' +
                'lazyMapsAPILoaderConfig you passed to AgmCoreModule.forRoot');
            return;
        }
        if (map && !this.drawingManager) {
            this.drawingManager = new google.maps.drawing.DrawingManager({
                map: map,
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
    };
    AgmDrawingManager.prototype.initEvents = function (drawingManager) {
        var _this = this;
        this.eventSubscriptions.push(this.createMvcObservable('circlecomplete', drawingManager)
            .subscribe(function (circle) { return _this._zone.run(function () { return _this.circleComplete.next(circle); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('markercomplete', drawingManager)
            .subscribe(function (marker) { return _this._zone.run(function () { return _this.markerComplete.next(marker); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polygoncomplete', drawingManager)
            .subscribe(function (polygon) { return _this._zone.run(function () { return _this.polygonComplete.next(polygon); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('polylinecomplete', drawingManager)
            .subscribe(function (polyline) { return _this._zone.run(function () { return _this.polylineComplete.next(polyline); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('overlaycomplete', drawingManager)
            .subscribe(function (overlayevent) { return _this._zone.run(function () { return _this.overlayComplete.next(overlayevent); }); }));
        this.eventSubscriptions.push(this.createMvcObservable('rectanglecomplete', drawingManager)
            .subscribe(function (rectangle) { return _this._zone.run(function () { return _this.rectangleComplete.next(rectangle); }); }));
    };
    AgmDrawingManager.prototype.createMvcObservable = function (eventName, mvcObject) {
        return fromEventPattern(function (handler) { return mvcObject.addListener(eventName, function (event) { return handler.apply(null, [event]); }); }, function (_handler, evListener) { return evListener.remove(); });
    };
    AgmDrawingManager.prototype.ngOnChanges = function (changes) {
        if (!this.drawingManager) {
            return;
        }
        var options = Object.entries(changes)
            .map(function (_a) {
            var _b = __read(_a, 2), prop = _b[0], change = _b[1];
            return [prop, change.currentValue];
        })
            .reduce(function (obj, _a) {
            var _b = __read(_a, 2), propName = _b[0], propValue = _b[1];
            obj[propName] = propValue;
            return obj;
        }, {});
        this.drawingManager.setOptions(options);
    };
    AgmDrawingManager.prototype.ngOnDestroy = function () {
        this.eventSubscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
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
    return AgmDrawingManager;
}());

var AgmDrawingManagerTrigger = /** @class */ (function () {
    function AgmDrawingManagerTrigger(_agmMap) {
        this._agmMap = _agmMap;
    }
    AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
    };
    AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function () { return _this.drawingManager.setMap(null); });
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
    return AgmDrawingManagerTrigger;
}());

var AgmDrawingModule = /** @class */ (function () {
    function AgmDrawingModule() {
    }
    AgmDrawingModule = __decorate([
        NgModule({
            imports: [AgmCoreModule],
            declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
            exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
        })
    ], AgmDrawingModule);
    return AgmDrawingModule;
}());

export { AgmDrawingManager, AgmDrawingManagerTrigger, AgmDrawingModule, OverlayType };
//# sourceMappingURL=agm-drawing.js.map
