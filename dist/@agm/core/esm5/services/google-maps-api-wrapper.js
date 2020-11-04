import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = /** @class */ (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._loader.load().then(function () {
                var map = new google.maps.Map(el, mapOptions);
                _this._mapResolver(map);
                return;
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            _this._map.then(function (m) { m.setOptions(options); });
        });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleMapsAPIWrapper.prototype.createMarker = function (options, addToMap) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (addToMap === void 0) { addToMap = true; }
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function () { return new google.maps.InfoWindow(options); });
        });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) {
                if (typeof options.strokePosition === 'string') {
                    options.strokePosition = google.maps.StrokePosition[options.strokePosition];
                }
                options.map = map;
                return new google.maps.Circle(options);
            });
        });
    };
    /**
     * Creates a google.map.Rectangle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createRectangle = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this.getNativeMap().then(function (map) {
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this.getNativeMap().then(function (map) {
                var polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        });
    };
    /**
     * Creates a new google.map.Data layer for the current map
     */
    GoogleMapsAPIWrapper.prototype.createDataLayer = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (m) {
                var data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        });
    };
    /**
     * Creates a TransitLayer instance for a map
     * @param {TransitLayerOptions} options - used for setting layer options
     * @returns {Promise<TransitLayer>} a new transit layer object
     */
    GoogleMapsAPIWrapper.prototype.createTransitLayer = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) {
                var newLayer = new google.maps.TransitLayer();
                newLayer.setMap(options.visible ? map : null);
                return newLayer;
            });
        });
    };
    /**
     * Creates a BicyclingLayer instance for a map
     * @param {BicyclingLayerOptions} options - used for setting layer options
     * @returns {Promise<BicyclingLayer>} a new bicycling layer object
     */
    GoogleMapsAPIWrapper.prototype.createBicyclingLayer = function (options) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) {
                var newLayer = new google.maps.BicyclingLayer();
                newLayer.setMap(options.visible ? map : null);
                return newLayer;
            });
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return new Observable(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.clearInstanceListeners = function () {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            _this._map.then(function (map) {
                google.maps.event.clearInstanceListeners(map);
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.setCenter(latLng); });
        });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function () {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.getZoom(); });
        });
    };
    GoogleMapsAPIWrapper.prototype.getBounds = function () {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.getBounds(); });
        });
    };
    GoogleMapsAPIWrapper.prototype.getMapTypeId = function () {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.getMapTypeId(); });
        });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.setZoom(zoom); });
        });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function () {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.getCenter(); });
        });
    };
    GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.panTo(latLng); });
        });
    };
    GoogleMapsAPIWrapper.prototype.panBy = function (x, y) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.panBy(x, y); });
        });
    };
    GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng, padding) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.fitBounds(latLng, padding); });
        });
    };
    GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng, padding) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._map.then(function (map) { return map.panToBounds(latLng, padding); });
        });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    GoogleMapsAPIWrapper = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MapsAPILoader, NgZone])
    ], GoogleMapsAPIWrapper);
    return GoogleMapsAPIWrapper;
}());
export { GoogleMapsAPIWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUk1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFLbEU7OztHQUdHO0FBRUg7SUFJRSw4QkFBb0IsT0FBc0IsRUFBVSxLQUFhO1FBQWpFLGlCQUdDO1FBSG1CLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9ELElBQUksQ0FBQyxJQUFJO1lBQ0wsSUFBSSxPQUFPLENBQXFCLFVBQUMsT0FBbUIsSUFBTyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsRUFBZSxFQUFFLFVBQStCO1FBQTFELGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLElBQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQXlCLENBQUMsQ0FBQztnQkFDN0MsT0FBTztZQUNULENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQWEsR0FBYixVQUFjLE9BQTRCO1FBQTFDLGlCQUlDO1FBSEMsT0FBTyxJ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QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFyT1Usb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtpREFLa0IsYUFBYSxFQUFpQixNQUFNO09BSnRELG9CQUFvQixDQXNPaEM7SUFBRCwyQkFBQztDQUFBLEFBdE9ELElBc09DO1NBdE9ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgbWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBQb2x5bGluZSwgUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcblxuLy8gdG9kbzogYWRkIHR5cGVzIGZvciB0aGlzXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgaGFuZGxlcyB0aGUgY29tbXVuaWNhdGlvbiB3aXRoIHRoZSBHb29nbGUgTWFwcyBKYXZhc2NyaXB0XG4gKiBBUEkgdjNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcHNBUElXcmFwcGVyIHtcbiAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPG1hcFR5cGVzLkdvb2dsZU1hcD47XG4gIHByaXZhdGUgX21hcFJlc29sdmVyOiAodmFsdWU/OiBtYXBUeXBlcy5Hb29nbGVNYXApID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBzQVBJTG9hZGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLl9tYXAgPVxuICAgICAgICBuZXcgUHJvbWlzZTxtYXBUeXBlcy5Hb29nbGVNYXA+KChyZXNvbHZlOiAoKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XG4gIH1cblxuICBjcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBtYXBUeXBlcy5NYXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWwsIG1hcE9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXAgYXMgbWFwVHlwZXMuR29vZ2xlTWFwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXBPcHRpb25zKG9wdGlvbnM6IG1hcFR5cGVzLk1hcE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9tYXAudGhlbigobTogbWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7IG0uc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdvb2dsZSBtYXAgbWFya2VyIHdpdGggdGhlIG1hcCBjb250ZXh0XG4gICAqL1xuICBjcmVhdGVNYXJrZXIob3B0aW9uczogbWFwVHlwZXMuTWFya2VyT3B0aW9ucyA9IHt9IGFzIG1hcFR5cGVzLk1hcmtlck9wdGlvbnMsIGFkZFRvTWFwOiBib29sZWFuID0gdHJ1ZSk6XG4gICAgICBQcm9taXNlPG1hcFR5cGVzLk1hcmtlcj4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBtYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgaWYgKGFkZFRvTWFwKSB7XG4gICAgICAgICAgb3B0aW9ucy5tYXAgPSBtYXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5NYXJrZXIob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucz86IG1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxtYXBUeXBlcy5JbmZvV2luZG93PiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKCgpID0+IHsgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KG9wdGlvbnMpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZ29vZ2xlLm1hcC5DaXJjbGUgZm9yIHRoZSBjdXJyZW50IG1hcC5cbiAgICovXG4gIGNyZWF0ZUNpcmNsZShvcHRpb25zOiBtYXBUeXBlcy5DaXJjbGVPcHRpb25zKTogUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogbWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRpb25zLnN0cm9rZVBvc2l0aW9uID0gZ29vZ2xlLm1hcHMuU3Ryb2tlUG9zaXRpb25bb3B0aW9ucy5zdHJva2VQb3NpdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5tYXAgPSBtYXA7XG4gICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuQ2lyY2xlKG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdvb2dsZS5tYXAuUmVjdGFuZ2xlIGZvciB0aGUgY3VycmVudCBtYXAuXG4gICAqL1xuICBjcmVhdGVSZWN0YW5nbGUob3B0aW9uczogbWFwVHlwZXMuUmVjdGFuZ2xlT3B0aW9ucyk6IFByb21pc2U8bWFwVHlwZXMuUmVjdGFuZ2xlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICBvcHRpb25zLm1hcCA9IG1hcDtcbiAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5SZWN0YW5nbGUob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlsaW5lKG9wdGlvbnM6IFBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmU+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVNYXAoKS50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICBsZXQgbGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvcHRpb25zKTtcbiAgICAgICAgbGluZS5zZXRNYXAobWFwKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlnb24ob3B0aW9uczogbWFwVHlwZXMuUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPG1hcFR5cGVzLlBvbHlnb24+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVNYXAoKS50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICBsZXQgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKG9wdGlvbnMpO1xuICAgICAgICBwb2x5Z29uLnNldE1hcChtYXApO1xuICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZ29vZ2xlLm1hcC5EYXRhIGxheWVyIGZvciB0aGUgY3VycmVudCBtYXBcbiAgICovXG4gIGNyZWF0ZURhdGFMYXllcihvcHRpb25zPzogbWFwVHlwZXMuRGF0YU9wdGlvbnMpOiBQcm9taXNlPG1hcFR5cGVzLkRhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4obSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IGdvb2dsZS5tYXBzLkRhdGEob3B0aW9ucyk7XG4gICAgICAgIGRhdGEuc2V0TWFwKG0pO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBUcmFuc2l0TGF5ZXIgaW5zdGFuY2UgZm9yIGEgbWFwXG4gICAqIEBwYXJhbSB7VHJhbnNpdExheWVyT3B0aW9uc30gb3B0aW9ucyAtIHVzZWQgZm9yIHNldHRpbmcgbGF5ZXIgb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmFuc2l0TGF5ZXI+fSBhIG5ldyB0cmFuc2l0IGxheWVyIG9iamVjdFxuICAgKi9cbiAgY3JlYXRlVHJhbnNpdExheWVyKG9wdGlvbnM6IG1hcFR5cGVzLlRyYW5zaXRMYXllck9wdGlvbnMpOiBQcm9taXNlPG1hcFR5cGVzLlRyYW5zaXRMYXllcj57XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICBsZXQgbmV3TGF5ZXI6IG1hcFR5cGVzLlRyYW5zaXRMYXllciA9IG5ldyBnb29nbGUubWFwcy5UcmFuc2l0TGF5ZXIoKTtcbiAgICAgICAgbmV3TGF5ZXIuc2V0TWFwKG9wdGlvbnMudmlzaWJsZSA/IG1hcCA6IG51bGwpO1xuICAgICAgICByZXR1cm4gbmV3TGF5ZXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQmljeWNsaW5nTGF5ZXIgaW5zdGFuY2UgZm9yIGEgbWFwXG4gICAqIEBwYXJhbSB7QmljeWNsaW5nTGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gdXNlZCBmb3Igc2V0dGluZyBsYXllciBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEJpY3ljbGluZ0xheWVyPn0gYSBuZXcgYmljeWNsaW5nIGxheWVyIG9iamVjdFxuICAgKi9cbiAgY3JlYXRlQmljeWNsaW5nTGF5ZXIob3B0aW9uczogbWFwVHlwZXMuQmljeWNsaW5nTGF5ZXJPcHRpb25zKTogUHJvbWlzZTxtYXBUeXBlcy5CaWN5Y2xpbmdMYXllcj57XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICBsZXQgbmV3TGF5ZXI6IG1hcFR5cGVzLkJpY3ljbGluZ0xheWVyID0gbmV3IGdvb2dsZS5tYXBzLkJpY3ljbGluZ0xheWVyKCk7XG4gICAgICAgIG5ld0xheWVyLnNldE1hcChvcHRpb25zLnZpc2libGUgPyBtYXAgOiBudWxsKTtcbiAgICAgICAgcmV0dXJuIG5ld0xheWVyO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBnaXZlbiBjb29yZGluYXRlcyBhcmUgaW5zaXRlIGEgUG9seWdvbiBwYXRoLlxuICAgKi9cbiAgY29udGFpbnNMb2NhdGlvbihsYXRMbmc6IG1hcFR5cGVzLkxhdExuZ0xpdGVyYWwsIHBvbHlnb246IG1hcFR5cGVzLlBvbHlnb24pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkucG9seS5jb250YWluc0xvY2F0aW9uKGxhdExuZywgcG9seWdvbik7XG4gIH1cblxuICBzdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RT4pID0+IHtcbiAgICAgIHRoaXMuX21hcC50aGVuKChtOiBtYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgbS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChhcmc6IEUpID0+IHsgdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChhcmcpKTsgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFySW5zdGFuY2VMaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fbWFwLnRoZW4oKG1hcDogbWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFySW5zdGFuY2VMaXN0ZW5lcnMobWFwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Q2VudGVyKGxhdExuZzogbWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBtYXBUeXBlcy5Hb29nbGVNYXApID0+IG1hcC5zZXRDZW50ZXIobGF0TG5nKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRab29tKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLmdldFpvb20oKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRCb3VuZHMoKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogbWFwVHlwZXMuR29vZ2xlTWFwKSA9PiBtYXAuZ2V0Qm91bmRzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TWFwVHlwZUlkKCk6IFByb21pc2U8bWFwVHlwZXMuTWFwVHlwZUlkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLmdldE1hcFR5cGVJZCgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLnNldFpvb20oem9vbSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2VudGVyKCk6IFByb21pc2U8bWFwVHlwZXMuTGF0TG5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IG1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLmdldENlbnRlcigpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhblRvKGxhdExuZzogbWFwVHlwZXMuTGF0TG5nIHwgbWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwKSA9PiBtYXAucGFuVG8obGF0TG5nKSk7XG4gICAgfSk7XG4gIH1cblxuICBwYW5CeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwKSA9PiBtYXAucGFuQnkoeCwgeSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZml0Qm91bmRzKGxhdExuZzogbWFwVHlwZXMuTGF0TG5nQm91bmRzIHwgbWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCwgcGFkZGluZz86IG51bWJlciB8IG1hcFR5cGVzLlBhZGRpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcCkgPT4gbWFwLmZpdEJvdW5kcyhsYXRMbmcsIHBhZGRpbmcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhblRvQm91bmRzKGxhdExuZzogbWFwVHlwZXMuTGF0TG5nQm91bmRzIHwgbWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCwgcGFkZGluZz86IG51bWJlciB8IG1hcFR5cGVzLlBhZGRpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcCkgPT4gbWFwLnBhblRvQm91bmRzKGxhdExuZywgcGFkZGluZykpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hdGl2ZSBHb29nbGUgTWFwcyBNYXAgaW5zdGFuY2UuIEJlIGNhcmVmdWwgd2hlbiB1c2luZyB0aGlzIGluc3RhbmNlIGRpcmVjdGx5LlxuICAgKi9cbiAgZ2V0TmF0aXZlTWFwKCk6IFByb21pc2U8bWFwVHlwZXMuR29vZ2xlTWFwPiB7IHJldHVybiB0aGlzLl9tYXA7IH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cbiAgICovXG4gIHRyaWdnZXJNYXBFdmVudChldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobSkgPT4gZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtLCBldmVudE5hbWUpKTtcbiAgfVxufVxuIl19