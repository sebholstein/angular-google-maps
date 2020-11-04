import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
var MarkerManager = /** @class */ (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.convertAnimation = function (uiAnim) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (uiAnim === null) {
                    return [2 /*return*/, null];
                }
                else {
                    return [2 /*return*/, this._mapsWrapper.getNativeMap().then(function () { return google.maps.Animation[uiAnim]; })];
                }
                return [2 /*return*/];
            });
        });
    };
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.updateClickable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
    };
    MarkerManager.prototype.updateAnimation = function (marker) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var m, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._markers.get(marker)];
                    case 1:
                        m = _c.sent();
                        _b = (_a = m).setAnimation;
                        return [4 /*yield*/, this.convertAnimation(marker.animation)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var _this = this;
        var markerPromise = new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = this._mapsWrapper).createMarker;
                        _c = {
                            position: { lat: marker.latitude, lng: marker.longitude },
                            label: marker.label,
                            draggable: marker.draggable,
                            icon: marker.iconUrl,
                            opacity: marker.opacity,
                            visible: marker.visible,
                            zIndex: marker.zIndex,
                            title: marker.title,
                            clickable: marker.clickable
                        };
                        return [4 /*yield*/, this.convertAnimation(marker.animation)];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.animation = _d.sent(),
                                _c)]).then(resolve)];
                }
            });
        }); });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return new Observable(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    MarkerManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], MarkerManager);
    return MarkerManager;
}());
export { MarkerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUk1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQU1wRTtJQUlFLHVCQUFzQixZQUFrQyxFQUFZLEtBQWE7UUFBM0QsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUh2RSxhQUFRLEdBQ2QsSUFBSSxHQUFHLEVBQThCLENBQUM7SUFFMEMsQ0FBQztJQUUvRSx3Q0FBZ0IsR0FBdEIsVUFBdUIsTUFBZ0M7OztnQkFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUNuQixzQkFBTyxJQUFJLEVBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsc0JBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixDQUFDLEVBQUM7aUJBQ25GOzs7O0tBQ0Y7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsTUFBaUI7UUFBOUIsaUJBWUM7UUFYQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDYix5QkFBeUI7WUFDekIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTO1lBQ3RCLE9BQU8s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QyxFQUFBOzRCQVYzRCxzQkFBQSxlQVVHLFlBQVMsR0FBRSxTQUE2QztxQ0FDeEQsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7OzthQUFBLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsTUFBaUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkNBQXFCLEdBQXJCLFVBQXlCLFNBQWlCLEVBQUUsTUFBaUI7UUFBN0QsaUJBTUM7UUFMQyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsUUFBcUI7WUFDMUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUztnQkFDdkMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFJLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7WUFDN0UsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFqR1UsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBS3lCLG9CQUFvQixFQUFtQixNQUFNO09BSnRFLGFBQWEsQ0FrR3pCO0lBQUQsb0JBQUM7Q0FBQSxBQWxHRCxJQWtHQztTQWxHWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvbWFya2VyJztcblxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtlck1hbmFnZXIge1xuICBwcm90ZWN0ZWQgX21hcmtlcnM6IE1hcDxBZ21NYXJrZXIsIFByb21pc2U8TWFya2VyPj4gPVxuICAgICAgbmV3IE1hcDxBZ21NYXJrZXIsIFByb21pc2U8TWFya2VyPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgYXN5bmMgY29udmVydEFuaW1hdGlvbih1aUFuaW06ICdCT1VOQ0UnIHwgJ0RST1AnIHwgbnVsbCk6IFByb21pc2U8YW55PntcbiAgICBpZiAodWlBbmltID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oKCkgPT4gZ29vZ2xlLm1hcHMuQW5pbWF0aW9uW3VpQW5pbV0pO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZU1hcmtlcihtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIC8vIG1hcmtlciBhbHJlYWR5IGRlbGV0ZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobTogTWFya2VyKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBtLnNldE1hcChudWxsKTtcbiAgICAgICAgdGhpcy5fbWFya2Vycy5kZWxldGUobWFya2VyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWFya2VyUG9zaXRpb24obWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKFxuICAgICAgICAobTogTWFya2VyKSA9PiBtLnNldFBvc2l0aW9uKHtsYXQ6IG1hcmtlci5sYXRpdHVkZSwgbG5nOiBtYXJrZXIubG9uZ2l0dWRlfSkpO1xuICB9XG5cbiAgdXBkYXRlVGl0bGUobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uc2V0VGl0bGUobWFya2VyLnRpdGxlKSk7XG4gIH1cblxuICB1cGRhdGVMYWJlbChtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4geyBtLnNldExhYmVsKG1hcmtlci5sYWJlbCk7IH0pO1xuICB9XG5cbiAgdXBkYXRlRHJhZ2dhYmxlKG1hcmtlcjogQWdtTWFya2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLnNldERyYWdnYWJsZShtYXJrZXIuZHJhZ2dhYmxlKSk7XG4gIH1cblxuICB1cGRhdGVJY29uKG1hcmtlcjogQWdtTWFya2VyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbigobTogTWFya2VyKSA9PiBtLnNldEljb24obWFya2VyLmljb25VcmwpKTtcbiAgfVxuXG4gIHVwZGF0ZU9wYWNpdHkobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uc2V0T3BhY2l0eShtYXJrZXIub3BhY2l0eSkpO1xuICB9XG5cbiAgdXBkYXRlVmlzaWJsZShtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5zZXRWaXNpYmxlKG1hcmtlci52aXNpYmxlKSk7XG4gIH1cblxuICB1cGRhdGVaSW5kZXgobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uc2V0WkluZGV4KG1hcmtlci56SW5kZXgpKTtcbiAgfVxuXG4gIHVwZGF0ZUNsaWNrYWJsZShtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5zZXRDbGlja2FibGUobWFya2VyLmNsaWNrYWJsZSkpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlQW5pbWF0aW9uKG1hcmtlcjogQWdtTWFya2VyKSB7XG4gICAgY29uc3QgbSA9IGF3YWl0IHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XG4gICAgbS5zZXRBbmltYXRpb24oYXdhaXQgdGhpcy5jb252ZXJ0QW5pbWF0aW9uKG1hcmtlci5hbmltYXRpb24pKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IEFnbU1hcmtlcikge1xuICAgIGNvbnN0IG1hcmtlclByb21pc2UgPSBuZXcgUHJvbWlzZTxNYXJrZXI+KGFzeW5jIChyZXNvbHZlKSA9PlxuICAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjoge2xhdDogbWFya2VyLmxhdGl0dWRlLCBsbmc6IG1hcmtlci5sb25naXR1ZGV9LFxuICAgICAgICBsYWJlbDogbWFya2VyLmxhYmVsLFxuICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5kcmFnZ2FibGUsXG4gICAgICAgIGljb246IG1hcmtlci5pY29uVXJsLFxuICAgICAgICBvcGFjaXR5OiBtYXJrZXIub3BhY2l0eSxcbiAgICAgICAgdmlzaWJsZTogbWFya2VyLnZpc2libGUsXG4gICAgICAgIHpJbmRleDogbWFya2VyLnpJbmRleCxcbiAgICAgICAgdGl0bGU6IG1hcmtlci50aXRsZSxcbiAgICAgICAgY2xpY2thYmxlOiBtYXJrZXIuY2xpY2thYmxlLFxuICAgICAgICBhbmltYXRpb246IGF3YWl0IHRoaXMuY29udmVydEFuaW1hdGlvbihtYXJrZXIuYW5pbWF0aW9uKSxcbiAgICAgIH0pLnRoZW4ocmVzb2x2ZSkpO1xuICAgIHRoaXMuX21hcmtlcnMuc2V0KG1hcmtlciwgbWFya2VyUHJvbWlzZSk7XG4gIH1cblxuICBnZXROYXRpdmVNYXJrZXIobWFya2VyOiBBZ21NYXJrZXIpOiBQcm9taXNlPE1hcmtlcj4ge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBtYXJrZXI6IEFnbU1hcmtlcik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xuICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=