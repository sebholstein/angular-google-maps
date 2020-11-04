import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { MarkerManager } from './marker-manager';
var InfoWindowManager = /** @class */ (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude,
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return new Observable(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone,
            MarkerManager])
    ], InfoWindowManager);
    return InfoWindowManager;
}());
export { InfoWindowManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pEO0lBSUUsMkJBQ1ksWUFBa0MsRUFBVSxLQUFhLEVBQ3pELGNBQTZCO1FBRDdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDekQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFMakMsaUJBQVksR0FDaEIsSUFBSSxHQUFHLEVBQXNDLENBQUM7SUFJTixDQUFDO0lBRTdDLDRDQUFnQixHQUFoQixVQUFpQixVQUF5QjtRQUExQyxpQkFZQztRQVhDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNuQiw4QkFBOEI7WUFDOUIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFhO1lBQ2hDLE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDVixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FB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QUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFQTs7T0FFRztJQUNKLGlEQUFxQixHQUFyQixVQUF5QixTQUFpQixFQUFFLFVBQXlCO1FBQXJFLGlCQU1DO1FBTEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQXFCO1lBQzFDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQWE7Z0JBQ25ELENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBNUVVLGlCQUFpQjtRQUQ3QixVQUFVLEVBQUU7aURBTWUsb0JBQW9CLEVBQWlCLE1BQU07WUFDekMsYUFBYTtPQU45QixpQkFBaUIsQ0E2RTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTdFRCxJQTZFQztTQTdFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZm8td2luZG93JztcblxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBJbmZvV2luZG93LCBJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuL21hcmtlci1tYW5hZ2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZm9XaW5kb3dNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfaW5mb1dpbmRvd3M6IE1hcDxBZ21JbmZvV2luZG93LCBQcm9taXNlPEluZm9XaW5kb3c+PiA9XG4gICAgICBuZXcgTWFwPEFnbUluZm9XaW5kb3csIFByb21pc2U8SW5mb1dpbmRvdz4+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgX21hcmtlck1hbmFnZXI6IE1hcmtlck1hbmFnZXIpIHt9XG5cbiAgZGVsZXRlSW5mb1dpbmRvdyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaVdpbmRvdyA9IHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KTtcbiAgICBpZiAoaVdpbmRvdyA9PSBudWxsKSB7XG4gICAgICAvLyBpbmZvIHdpbmRvdyBhbHJlYWR5IGRlbGV0ZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGlXaW5kb3cudGhlbigoaTogSW5mb1dpbmRvdykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgaS5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93cy5kZWxldGUoaW5mb1dpbmRvdyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuc2V0UG9zaXRpb24oe1xuICAgICAgbGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLFxuICAgICAgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZSxcbiAgICB9KSk7XG4gIH1cblxuICBzZXRaSW5kZXgoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdylcbiAgICAgICAgLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuc2V0WkluZGV4KGluZm9XaW5kb3cuekluZGV4KSk7XG4gIH1cblxuICBvcGVuKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKHcpID0+IHtcbiAgICAgIGlmIChpbmZvV2luZG93Lmhvc3RNYXJrZXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyTWFuYWdlci5nZXROYXRpdmVNYXJrZXIoaW5mb1dpbmRvdy5ob3N0TWFya2VyKS50aGVuKChtYXJrZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwKSA9PiB3Lm9wZW4obWFwLCBtYXJrZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwKSA9PiB3Lm9wZW4obWFwKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZShpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKCh3KSA9PiB3LmNsb3NlKCkpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93LCBvcHRpb25zOiBJbmZvV2luZG93T3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogSW5mb1dpbmRvdykgPT4gaS5zZXRPcHRpb25zKG9wdGlvbnMpKTtcbiAgfVxuXG4gIGFkZEluZm9XaW5kb3coaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdykge1xuICAgIGNvbnN0IG9wdGlvbnM6IEluZm9XaW5kb3dPcHRpb25zID0ge1xuICAgICAgY29udGVudDogaW5mb1dpbmRvdy5jb250ZW50LFxuICAgICAgbWF4V2lkdGg6IGluZm9XaW5kb3cubWF4V2lkdGgsXG4gICAgICB6SW5kZXg6IGluZm9XaW5kb3cuekluZGV4LFxuICAgICAgZGlzYWJsZUF1dG9QYW46IGluZm9XaW5kb3cuZGlzYWJsZUF1dG9QYW4sXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGluZm9XaW5kb3cubGF0aXR1ZGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBpbmZvV2luZG93LmxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7bGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLCBsbmc6IGluZm9XaW5kb3cubG9uZ2l0dWRlfTtcbiAgICB9XG4gICAgY29uc3QgaW5mb1dpbmRvd1Byb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVJbmZvV2luZG93KG9wdGlvbnMpO1xuICAgIHRoaXMuX2luZm9XaW5kb3dzLnNldChpbmZvV2luZG93LCBpbmZvV2luZG93UHJvbWlzZSk7XG4gIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBJbmZvV2luZG93IGFzIGFuIE9ic2VydmFibGVcbiAgICAqL1xuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IHtcbiAgICAgICAgaS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19