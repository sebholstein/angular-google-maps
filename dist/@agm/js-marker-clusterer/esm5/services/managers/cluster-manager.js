import * as tslib_1 from "tslib";
import { GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import 'js-marker-clusterer';
import { Observable } from 'rxjs';
var ClusterManager = /** @class */ (function (_super) {
    tslib_1.__extends(ClusterManager, _super);
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
            var _b = tslib_1.__read(_a, 2), cluster = _b[0], marker = _b[1];
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
    ClusterManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], ClusterManager);
    return ClusterManager;
}(MarkerManager));
export { ClusterManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9qcy1tYXJrZXItY2x1c3RlcmVyLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvY2x1c3Rlci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQVE1QztJQUFvQywwQ0FBYTtJQUkvQyx3QkFBc0IsWUFBa0MsRUFBWSxLQUFhO1FBQWpGLFlBQ0Usa0JBQU0sWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUkzQjtRQUxxQixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBWSxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBRS9FLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBMEIsVUFBQyxRQUFRO1lBQ3RFLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDOztJQUNMLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssT0FBdUI7UUFBNUIsaUJBS0M7UUFKQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDdkMsSUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFvQixHQUFwQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7SUFF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QUFjLENBa0oxQjtJQUFELHFCQUFDO0NBQUEsQUFsSkQsQ0FBb0MsYUFBYSxHQWtKaEQ7U0FsSlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbU1hcmtlciwgR29vZ2xlTWFwc0FQSVdyYXBwZXIsIE1hcmtlck1hbmFnZXIgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAnanMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWdtTWFya2VyQ2x1c3RlciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbWFya2VyLWNsdXN0ZXInO1xuaW1wb3J0IHsgQ2x1c3Rlck9wdGlvbnMsIE1hcmtlckNsdXN0ZXJlckluc3RhbmNlIH0gZnJvbSAnLi4vZ29vZ2xlLWNsdXN0ZXJlci10eXBlcyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XG5cbmRlY2xhcmUgdmFyIE1hcmtlckNsdXN0ZXJlcjogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2x1c3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXJrZXJNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY2x1c3RlcmVySW5zdGFuY2U6IFByb21pc2U8TWFya2VyQ2x1c3RlcmVySW5zdGFuY2U+O1xuICBwcml2YXRlIF9yZXNvbHZlcjogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByb3RlY3RlZCBfem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoX21hcHNXcmFwcGVyLCBfem9uZSk7XG4gICAgdGhpcy5fY2x1c3RlcmVySW5zdGFuY2UgPSBuZXcgUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT4oKHJlc29sdmVyKSA9PiB7XG4gICAgICB0aGlzLl9yZXNvbHZlciA9IHJlc29sdmVyO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdChvcHRpb25zOiBDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4obWFwID0+IHtcbiAgICAgIGNvbnN0IGNsdXN0ZXJlciA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCBbXSwgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9yZXNvbHZlcihjbHVzdGVyZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTogUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZT4ge1xuICAgIHJldHVybiB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IEFnbU1hcmtlcik6IHZvaWQge1xuICAgIGNvbnN0IGNsdXN0ZXJQcm9taXNlOiBQcm9taXNlPE1hcmtlckNsdXN0ZXJlckluc3RhbmNlPiA9IHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTtcbiAgICBjb25zdCBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXJcbiAgICAgIC5jcmVhdGVNYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIGxhdDogbWFya2VyLmxhdGl0dWRlLFxuICAgICAgICAgIGxuZzogbWFya2VyLmxvbmdpdHVkZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IG1hcmtlci5sYWJlbCxcbiAgICAgICAgZHJhZ2dhYmxlOiBtYXJrZXIuZHJhZ2dhYmxlLFxuICAgICAgICBpY29uOiBtYXJrZXIuaWNvblVybCxcbiAgICAgICAgb3BhY2l0eTogbWFya2VyLm9wYWNpdHksXG4gICAgICAgIHZpc2libGU6IG1hcmtlci52aXNpYmxlLFxuICAgICAgICB6SW5kZXg6IG1hcmtlci56SW5kZXgsXG4gICAgICAgIHRpdGxlOiBtYXJrZXIudGl0bGUsXG4gICAgICAgIGNsaWNrYWJsZTogbWFya2VyLmNsaWNrYWJsZSxcbiAgICAgIH0sIGZhbHNlKTtcblxuICAgIFByb21pc2VcbiAgICAgIC5hbGwoW2NsdXN0ZXJQcm9taXNlLCBtYXJrZXJQcm9taXNlXSlcbiAgICAgIC50aGVuKChbY2x1c3RlciwgbWFya2VyXSkgPT4ge1xuICAgICAgICByZXR1cm4gY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX21hcmtlcnMuc2V0KG1hcmtlciwgbWFya2VyUHJvbWlzZSk7XG4gIH1cblxuICBkZWxldGVNYXJrZXIobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAvLyBtYXJrZXIgYWxyZWFkeSBkZWxldGVkXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKG06IE1hcmtlcikgPT4ge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBtLnNldE1hcChudWxsKTtcbiAgICAgICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICAgICAgY2x1c3Rlci5yZW1vdmVNYXJrZXIobSk7XG4gICAgICAgICAgdGhpcy5fbWFya2Vycy5kZWxldGUobWFya2VyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyTWFya2VycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XG4gICAgICBjbHVzdGVyLmNsZWFyTWFya2VycygpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0R3JpZFNpemUoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgY2x1c3Rlci5zZXRHcmlkU2l6ZShjLmdyaWRTaXplKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldE1heFpvb20oYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgY2x1c3Rlci5zZXRNYXhab29tKGMubWF4Wm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRTdHlsZXMoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgY2x1c3Rlci5zZXRTdHlsZXMoYy5zdHlsZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Wm9vbU9uQ2xpY2soYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKGMuem9vbU9uQ2xpY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbHVzdGVyLnpvb21PbkNsaWNrXyA9IGMuem9vbU9uQ2xpY2s7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRBdmVyYWdlQ2VudGVyKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcbiAgICAgIGlmIChjLmF2ZXJhZ2VDZW50ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbHVzdGVyLmF2ZXJhZ2VDZW50ZXJfID0gYy5hdmVyYWdlQ2VudGVyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW1hZ2VQYXRoKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcbiAgICAgIGlmIChjLmltYWdlUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsdXN0ZXIuaW1hZ2VQYXRoXyA9IGMuaW1hZ2VQYXRoO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0TWluaW11bUNsdXN0ZXJTaXplKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcbiAgICAgIGlmIChjLm1pbmltdW1DbHVzdGVyU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsdXN0ZXIubWluaW11bUNsdXN0ZXJTaXplXyA9IGMubWluaW11bUNsdXN0ZXJTaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW1hZ2VFeHRlbnNpb24oYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKGMuaW1hZ2VFeHRlbnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbHVzdGVyLmltYWdlRXh0ZW5zaW9uXyA9IGMuaW1hZ2VFeHRlbnNpb247XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVDbHVzdGVyRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZS50aGVuKChtOiBNYXJrZXJDbHVzdGVyZXJJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgIG0uYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Q2FsY3VsYXRvciAoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjLmNhbGN1bGF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2x1c3Rlci5zZXRDYWxjdWxhdG9yKGMuY2FsY3VsYXRvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==