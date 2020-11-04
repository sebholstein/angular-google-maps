import { __decorate, __metadata } from 'tslib';
import { Injectable, NgZone, EventEmitter, Input, Output, Directive, NgModule } from '@angular/core';
import { MarkerManager, GoogleMapsAPIWrapper, InfoWindowManager, AgmCoreModule } from '@agm/core';
import 'js-marker-clusterer';
import { Observable } from 'rxjs';

let ClusterManager = class ClusterManager extends MarkerManager {
    constructor(_mapsWrapper, _zone) {
        super(_mapsWrapper, _zone);
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._clustererInstance = new Promise((resolver) => {
            this._resolver = resolver;
        });
    }
    init(options) {
        this._mapsWrapper.getNativeMap().then(map => {
            const clusterer = new MarkerClusterer(map, [], options);
            this._resolver(clusterer);
        });
    }
    getClustererInstance() {
        return this._clustererInstance;
    }
    addMarker(marker) {
        const clusterPromise = this.getClustererInstance();
        const markerPromise = this._mapsWrapper
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
            .then(([cluster, marker]) => {
            return cluster.addMarker(marker);
        });
        this._markers.set(marker, markerPromise);
    }
    deleteMarker(marker) {
        const m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then((m) => {
            this._zone.run(() => {
                m.setMap(null);
                this.getClustererInstance().then(cluster => {
                    cluster.removeMarker(m);
                    this._markers.delete(marker);
                });
            });
        });
    }
    clearMarkers() {
        return this.getClustererInstance().then(cluster => {
            cluster.clearMarkers();
        });
    }
    setGridSize(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setGridSize(c.gridSize);
        });
    }
    setMaxZoom(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setMaxZoom(c.maxZoom);
        });
    }
    setStyles(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setStyles(c.styles);
        });
    }
    setZoomOnClick(c) {
        this.getClustererInstance().then(cluster => {
            if (c.zoomOnClick !== undefined) {
                cluster.zoomOnClick_ = c.zoomOnClick;
            }
        });
    }
    setAverageCenter(c) {
        this.getClustererInstance().then(cluster => {
            if (c.averageCenter !== undefined) {
                cluster.averageCenter_ = c.averageCenter;
            }
        });
    }
    setImagePath(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imagePath !== undefined) {
                cluster.imagePath_ = c.imagePath;
            }
        });
    }
    setMinimumClusterSize(c) {
        this.getClustererInstance().then(cluster => {
            if (c.minimumClusterSize !== undefined) {
                cluster.minimumClusterSize_ = c.minimumClusterSize;
            }
        });
    }
    setImageExtension(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imageExtension !== undefined) {
                cluster.imageExtension_ = c.imageExtension;
            }
        });
    }
    createClusterEventObservable(eventName) {
        return Observable.create((observer) => {
            this._zone.runOutsideAngular(() => {
                this._clustererInstance.then((m) => {
                    m.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
                });
            });
        });
    }
    setCalculator(c) {
        this.getClustererInstance().then(cluster => {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    }
};
ClusterManager = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
], ClusterManager);

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
let AgmMarkerCluster = class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
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
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: (args) => this.clusterClick.emit(args),
            },
            {
                name: 'mouseover',
                handler: (args) => this.mouseOver.emit(args),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
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
    }
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

let AgmJsMarkerClustererModule = class AgmJsMarkerClustererModule {
};
AgmJsMarkerClustererModule = __decorate([
    NgModule({
        imports: [AgmCoreModule],
        declarations: [AgmMarkerCluster],
        exports: [AgmMarkerCluster],
    })
], AgmJsMarkerClustererModule);

export { AgmJsMarkerClustererModule, AgmMarkerCluster, ClusterManager };
//# sourceMappingURL=agm-js-marker-clusterer.js.map
