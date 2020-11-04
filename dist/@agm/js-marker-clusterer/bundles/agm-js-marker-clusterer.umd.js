(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@agm/core'), require('js-marker-clusterer'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@agm/js-marker-clusterer', ['exports', '@angular/core', '@agm/core', 'js-marker-clusterer', 'rxjs'], factory) :
    (global = global || self, factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.jsMarkerClusterer = {}), global.ng.core, global.ngmaps.core, global.MarkerClusterer, global.rxjs));
}(this, function (exports, core, core$1, jsMarkerClusterer, rxjs) { 'use strict';

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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

    var ClusterManager = /** @class */ (function (_super) {
        __extends(ClusterManager, _super);
        function ClusterManager(_mapsWrapper, _zone) {
            var _this = _super.call(this, _mapsWrapper, _zone) || this;
            _this._mapsWrapper = _mapsWrapper;
            _this._zone = _zone;
            _this._clustererInstance = new Promise(function (resolver) {
                _this._resolver = resolver;
            });
            return _this;
        }
        ClusterManager.prototype.init = function (options) {
            var _this = this;
            this._mapsWrapper.getNativeMap().then(function (map) {
                var clusterer = new MarkerClusterer(map, [], options);
                _this._resolver(clusterer);
            });
        };
        ClusterManager.prototype.getClustererInstance = function () {
            return this._clustererInstance;
        };
        ClusterManager.prototype.addMarker = function (marker) {
            var clusterPromise = this.getClustererInstance();
            var markerPromise = this._mapsWrapper
                .createMarker({
                position: {
                    lat: marker.latitude,
                    lng: marker.longitude,
                },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
            }, false);
            Promise
                .all([clusterPromise, markerPromise])
                .then(function (_a) {
                var _b = __read(_a, 2), cluster = _b[0], marker = _b[1];
                return cluster.addMarker(marker);
            });
            this._markers.set(marker, markerPromise);
        };
        ClusterManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                _this._zone.run(function () {
                    m.setMap(null);
                    _this.getClustererInstance().then(function (cluster) {
                        cluster.removeMarker(m);
                        _this._markers.delete(marker);
                    });
                });
            });
        };
        ClusterManager.prototype.clearMarkers = function () {
            return this.getClustererInstance().then(function (cluster) {
                cluster.clearMarkers();
            });
        };
        ClusterManager.prototype.setGridSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setGridSize(c.gridSize);
            });
        };
        ClusterManager.prototype.setMaxZoom = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setMaxZoom(c.maxZoom);
            });
        };
        ClusterManager.prototype.setStyles = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setStyles(c.styles);
            });
        };
        ClusterManager.prototype.setZoomOnClick = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.zoomOnClick !== undefined) {
                    cluster.zoomOnClick_ = c.zoomOnClick;
                }
            });
        };
        ClusterManager.prototype.setAverageCenter = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.averageCenter !== undefined) {
                    cluster.averageCenter_ = c.averageCenter;
                }
            });
        };
        ClusterManager.prototype.setImagePath = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imagePath !== undefined) {
                    cluster.imagePath_ = c.imagePath;
                }
            });
        };
        ClusterManager.prototype.setMinimumClusterSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.minimumClusterSize !== undefined) {
                    cluster.minimumClusterSize_ = c.minimumClusterSize;
                }
            });
        };
        ClusterManager.prototype.setImageExtension = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imageExtension !== undefined) {
                    cluster.imageExtension_ = c.imageExtension;
                }
            });
        };
        ClusterManager.prototype.createClusterEventObservable = function (eventName) {
            var _this = this;
            return rxjs.Observable.create(function (observer) {
                _this._zone.runOutsideAngular(function () {
                    _this._clustererInstance.then(function (m) {
                        m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                    });
                });
            });
        };
        ClusterManager.prototype.setCalculator = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (typeof c.calculator === 'function') {
                    cluster.setCalculator(c.calculator);
                }
            });
        };
        ClusterManager = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core$1.GoogleMapsAPIWrapper, core.NgZone])
        ], ClusterManager);
        return ClusterManager;
    }(core$1.MarkerManager));

    /**
     * AgmMarkerCluster clusters map marker if they are near together
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
     *      <agm-marker-cluster>
     *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        </agm-marker>
     *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
     *        </agm-marker>
     *      </agm-marker-cluster>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarkerCluster = /** @class */ (function () {
        function AgmMarkerCluster(_clusterManager) {
            this._clusterManager = _clusterManager;
            this.clusterClick = new core.EventEmitter();
            this.mouseOver = new core.EventEmitter();
            this.mouseOut = new core.EventEmitter();
            this._observableSubscriptions = [];
        }
        /** @internal */
        AgmMarkerCluster.prototype.ngOnDestroy = function () {
            this._clusterManager.clearMarkers();
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
            if (changes['gridSize']) {
                this._clusterManager.setGridSize(this);
            }
            if (changes['maxZoom']) {
                this._clusterManager.setMaxZoom(this);
            }
            if (changes['zoomOnClick']) {
                this._clusterManager.setZoomOnClick(this);
            }
            if (changes['averageCenter']) {
                this._clusterManager.setAverageCenter(this);
            }
            if (changes['minimumClusterSize']) {
                this._clusterManager.setMinimumClusterSize(this);
            }
            if (changes['imagePath']) {
                this._clusterManager.setImagePath(this);
            }
            if (changes['imageExtension']) {
                this._clusterManager.setImageExtension(this);
            }
            if (changes['calculator']) {
                this._clusterManager.setCalculator(this);
            }
            if (changes['styles']) {
                this._clusterManager.setStyles(this);
            }
        };
        AgmMarkerCluster.prototype._addEventListeners = function () {
            var _this = this;
            var handlers = [
                {
                    name: 'clusterclick',
                    handler: function (args) { return _this.clusterClick.emit(args); },
                },
                {
                    name: 'mouseover',
                    handler: function (args) { return _this.mouseOver.emit(args); },
                },
            ];
            handlers.forEach(function (obj) {
                var os = _this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
                _this._observableSubscriptions.push(os);
            });
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnInit = function () {
            this._addEventListeners();
            this._clusterManager.init({
                gridSize: this.gridSize,
                maxZoom: this.maxZoom,
                zoomOnClick: this.zoomOnClick,
                averageCenter: this.averageCenter,
                minimumClusterSize: this.minimumClusterSize,
                styles: this.styles,
                imagePath: this.imagePath,
                imageExtension: this.imageExtension,
                calculator: this.calculator,
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AgmMarkerCluster.prototype, "gridSize", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AgmMarkerCluster.prototype, "maxZoom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AgmMarkerCluster.prototype, "zoomOnClick", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AgmMarkerCluster.prototype, "averageCenter", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AgmMarkerCluster.prototype, "minimumClusterSize", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AgmMarkerCluster.prototype, "styles", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AgmMarkerCluster.prototype, "calculator", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AgmMarkerCluster.prototype, "imagePath", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AgmMarkerCluster.prototype, "imageExtension", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AgmMarkerCluster.prototype, "clusterClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AgmMarkerCluster.prototype, "mouseOver", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AgmMarkerCluster.prototype, "mouseOut", void 0);
        AgmMarkerCluster = __decorate([
            core.Directive({
                selector: 'agm-marker-cluster',
                providers: [
                    ClusterManager,
                    { provide: core$1.MarkerManager, useExisting: ClusterManager },
                    core$1.InfoWindowManager,
                ],
            }),
            __metadata("design:paramtypes", [ClusterManager])
        ], AgmMarkerCluster);
        return AgmMarkerCluster;
    }());

    var AgmJsMarkerClustererModule = /** @class */ (function () {
        function AgmJsMarkerClustererModule() {
        }
        AgmJsMarkerClustererModule = __decorate([
            core.NgModule({
                imports: [core$1.AgmCoreModule],
                declarations: [AgmMarkerCluster],
                exports: [AgmMarkerCluster],
            })
        ], AgmJsMarkerClustererModule);
        return AgmJsMarkerClustererModule;
    }());

    exports.AgmJsMarkerClustererModule = AgmJsMarkerClustererModule;
    exports.AgmMarkerCluster = AgmMarkerCluster;
    exports.ClusterManager = ClusterManager;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=agm-js-marker-clusterer.umd.js.map
