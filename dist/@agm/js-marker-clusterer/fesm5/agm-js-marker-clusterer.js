import { __extends, __read, __decorate, __metadata } from 'tslib';
import { Injectable, NgZone, Input, Output, EventEmitter, Directive, NgModule } from '@angular/core';
import { GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager, AgmCoreModule } from '@agm/core';
import 'js-marker-clusterer';
import { Observable } from 'rxjs';

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
        return Observable.create(function (observer) {
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
        Injectable(),
        __metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], ClusterManager);
    return ClusterManager;
}(MarkerManager));

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
        this.clusterClick = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
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
        Input(),
        __metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "gridSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "maxZoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMarkerCluster.prototype, "zoomOnClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AgmMarkerCluster.prototype, "averageCenter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AgmMarkerCluster.prototype, "minimumClusterSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AgmMarkerCluster.prototype, "styles", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AgmMarkerCluster.prototype, "calculator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMarkerCluster.prototype, "imagePath", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AgmMarkerCluster.prototype, "imageExtension", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "clusterClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "mouseOver", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AgmMarkerCluster.prototype, "mouseOut", void 0);
    AgmMarkerCluster = __decorate([
        Directive({
            selector: 'agm-marker-cluster',
            providers: [
                ClusterManager,
                { provide: MarkerManager, useExisting: ClusterManager },
                InfoWindowManager,
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
        NgModule({
            imports: [AgmCoreModule],
            declarations: [AgmMarkerCluster],
            exports: [AgmMarkerCluster],
        })
    ], AgmJsMarkerClustererModule);
    return AgmJsMarkerClustererModule;
}());

export { AgmJsMarkerClustererModule, AgmMarkerCluster, ClusterManager };
//# sourceMappingURL=agm-js-marker-clusterer.js.map
