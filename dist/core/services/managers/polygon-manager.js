import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { GoogleMapsAPIWrapper } from "../google-maps-api-wrapper";
var PolygonManager = (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setPaths(polygon.paths);
            });
        });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        var _this = this;
        return this._polygons.get(path).then(function (l) {
            l.setOptions(options);
            if (options['paths']) {
                _this.updatePolygon(path);
            }
        });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths) || null;
        if (m == null) {
            this._polygons.forEach(function (p) {
                _this._polygons.delete(p);
            });
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) {
                    return _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    PolygonManager.prototype.createDragEventObservable = function (eventName, path) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function () {
                    return _this._zone.run(function () { return observer.next(_this.getBounds(l)); });
                });
                // google.maps.event.addListener(l, eventName, () =>
                //   this._zone.run(() => observer.next(this.getBounds(l)))
                // );
            });
        });
    };
    PolygonManager.prototype.createPolyChangesObservable = function (eventName, path) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.getPaths().forEach(function (path) {
                    google.maps.event.addListener(path, eventName, function () {
                        return _this._zone.run(function () { return observer.next(_this.getBounds(l)); });
                    });
                });
            });
        });
    };
    PolygonManager.prototype.getBounds = function (polygon) {
        var bounds = [];
        var length = polygon.getPath().getLength();
        for (var i = 0; i < length; i++) {
            var ln = {
                lat: polygon
                    .getPath()
                    .getAt(i)
                    .lat(),
                lng: polygon
                    .getPath()
                    .getAt(i)
                    .lng()
            };
            bounds.push(ln);
        }
        return bounds;
    };
    return PolygonManager;
}());
export { PolygonManager };
PolygonManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PolygonManager.ctorParameters = function () { return [
    { type: GoogleMapsAPIWrapper, },
    { type: NgZone, },
]; };
//# sourceMappingURL=polygon-manager.js.map