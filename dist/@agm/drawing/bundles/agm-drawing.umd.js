(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@agm/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@agm/drawing', ['exports', '@angular/core', 'rxjs', '@agm/core', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.drawing = {}), global.ng.core, global.rxjs, global.ngmaps.core, global.rxjs.operators));
}(this, function (exports, core, rxjs, core$1, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    (function (OverlayType) {
        OverlayType["CIRCLE"] = "circle";
        OverlayType["MARKER"] = "marker";
        OverlayType["POLYGONE"] = "polygon";
        OverlayType["POLYLINE"] = "polyline";
        OverlayType["RECTANGE"] = "rectangle";
    })(exports.OverlayType || (exports.OverlayType = {}));

    var AgmDrawingManager = /** @class */ (function () {
        function AgmDrawingManager(_zone) {
            this._zone = _zone;
            /**
             * This event is fired when the user has finished drawing a circle.
             */
            this.circleComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a marker.
             */
            this.markerComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing an overlay of any
             * type.
             */
            this.overlayComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a polygon.
             */
            this.polygonComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a polyline.
             */
            this.polylineComplete = new core.EventEmitter();
            /**
             * This event is fired when the user has finished drawing a rectangle.
             */
            this.rectangleComplete = new core.EventEmitter();
            this.eventSubscriptions = [];
        }
        AgmDrawingManager.prototype.setMap = function (map) {
            if (!google.maps.drawing && core.isDevMode()) {
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
            return rxjs.fromEventPattern(function (handler) { return mvcObject.addListener(eventName, function (event) { return handler.apply(null, [event]); }); }, function (_handler, evListener) { return evListener.remove(); });
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
            core.Input(),
            __metadata("design:type", Boolean)
        ], AgmDrawingManager.prototype, "drawingControl", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AgmDrawingManager.prototype, "drawingMode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "drawingControlOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "circleOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "markerOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "polygonOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "polylineOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "rectangeOptions", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "circleComplete", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "markerComplete", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "overlayComplete", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "polygonComplete", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "polylineComplete", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AgmDrawingManager.prototype, "rectangleComplete", void 0);
        AgmDrawingManager = __decorate([
            core.Directive({
                selector: 'agm-drawing-manager',
                exportAs: 'agmDrawingManager',
            }),
            __metadata("design:paramtypes", [core.NgZone])
        ], AgmDrawingManager);
        return AgmDrawingManager;
    }());

    var AgmDrawingManagerTrigger = /** @class */ (function () {
        function AgmDrawingManagerTrigger(_agmMap) {
            this._agmMap = _agmMap;
        }
        AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._agmMap.mapReady.pipe(operators.first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
        };
        AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
            var _this = this;
            this._agmMap.mapReady.pipe(operators.first()).subscribe(function () { return _this.drawingManager.setMap(null); });
        };
        __decorate([
            core.Input('agmDrawingManager'),
            __metadata("design:type", AgmDrawingManager)
        ], AgmDrawingManagerTrigger.prototype, "drawingManager", void 0);
        AgmDrawingManagerTrigger = __decorate([
            core.Directive({
                selector: 'agm-map[agmDrawingManager]',
                exportAs: 'matDrawingManagerTrigger',
            }),
            __param(0, core.Host()),
            __metadata("design:paramtypes", [core$1.AgmMap])
        ], AgmDrawingManagerTrigger);
        return AgmDrawingManagerTrigger;
    }());

    var AgmDrawingModule = /** @class */ (function () {
        function AgmDrawingModule() {
        }
        AgmDrawingModule = __decorate([
            core.NgModule({
                imports: [core$1.AgmCoreModule],
                declarations: [AgmDrawingManager, AgmDrawingManagerTrigger],
                exports: [AgmDrawingManager, AgmDrawingManagerTrigger],
            })
        ], AgmDrawingModule);
        return AgmDrawingModule;
    }());

    exports.AgmDrawingManager = AgmDrawingManager;
    exports.AgmDrawingManagerTrigger = AgmDrawingManagerTrigger;
    exports.AgmDrawingModule = AgmDrawingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=agm-drawing.umd.js.map
