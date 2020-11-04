import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = /** @class */ (function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    KmlLayerManager.prototype.addKmlLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex,
            });
        });
        this._layers.set(layer, newLayer);
    };
    KmlLayerManager.prototype.setOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) { return l.setOptions(options); });
    };
    KmlLayerManager.prototype.deleteKmlLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    KmlLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return new Observable(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    KmlLayerManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], KmlLayerManager);
    return KmlLayerManager;
}());
export { KmlLayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21sLWxheWVyLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUtwRTs7R0FFRztBQUVIO0lBSUUseUJBQW9CLFFBQThCLEVBQVUsS0FBYTtRQUFyRCxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIakUsWUFBTyxHQUNYLElBQUksR0FBRyxFQUFrQyxDQUFDO0lBRThCLENBQUM7SUFFN0U7O09BRUc7SUFDSCxxQ0FBVyxHQUFYLFVBQVksS0FBa0I7UUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ2xELE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixHQUFHLEVBQUUsQ0FBQztnQkFDTixnQkFBZ0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO2dCQUN4QyxjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQ3BDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxtQkFBbUI7Z0JBQzlDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07YUFDRixDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxLQUFrQixFQUFFLE9BQXdCO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLEtBQWtCO1FBQWpDLGlCQUtDO1FBSkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUM1QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQ0FBcUIsR0FBckIsVUFBeUIsU0FBaUIsRUFBRSxLQUFrQjtRQUE5RCxpQkFNQztRQUxDLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFxQjtZQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXO2dCQUN2QyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTVDVSxlQUFlO1FBRDNCLFVBQVUsRUFBRTtpREFLbUIsb0JBQW9CLEVBQWlCLE1BQU07T0FKOUQsZUFBZSxDQTZDM0I7SUFBRCxzQkFBQztDQUFBLEFBN0NELElBNkNDO1NBN0NZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbUttbExheWVyIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ttbC1sYXllcic7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgS21sTGF5ZXIsIEttbExheWVyT3B0aW9ucyB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuLyoqXG4gKiBNYW5hZ2VzIGFsbCBLTUwgTGF5ZXJzIGZvciBhIEdvb2dsZSBNYXAgaW5zdGFuY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLbWxMYXllck1hbmFnZXIge1xuICBwcml2YXRlIF9sYXllcnM6IE1hcDxBZ21LbWxMYXllciwgUHJvbWlzZTxLbWxMYXllcj4+ID1cbiAgICAgIG5ldyBNYXA8QWdtS21sTGF5ZXIsIFByb21pc2U8S21sTGF5ZXI+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgS01MIExheWVyIHRvIHRoZSBtYXAuXG4gICAqL1xuICBhZGRLbWxMYXllcihsYXllcjogQWdtS21sTGF5ZXIpIHtcbiAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbihtID0+IHtcbiAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICAgICAgICBjbGlja2FibGU6IGxheWVyLmNsaWNrYWJsZSxcbiAgICAgICAgbWFwOiBtLFxuICAgICAgICBwcmVzZXJ2ZVZpZXdwb3J0OiBsYXllci5wcmVzZXJ2ZVZpZXdwb3J0LFxuICAgICAgICBzY3JlZW5PdmVybGF5czogbGF5ZXIuc2NyZWVuT3ZlcmxheXMsXG4gICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3M6IGxheWVyLnN1cHByZXNzSW5mb1dpbmRvd3MsXG4gICAgICAgIHVybDogbGF5ZXIudXJsLFxuICAgICAgICB6SW5kZXg6IGxheWVyLnpJbmRleCxcbiAgICAgIH0gYXMgS21sTGF5ZXJPcHRpb25zKTtcbiAgICB9KTtcbiAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gIH1cblxuICBzZXRPcHRpb25zKGxheWVyOiBBZ21LbWxMYXllciwgb3B0aW9uczogS21sTGF5ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IGwuc2V0T3B0aW9ucyhvcHRpb25zKSk7XG4gIH1cblxuICBkZWxldGVLbWxMYXllcihsYXllcjogQWdtS21sTGF5ZXIpIHtcbiAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGwgPT4ge1xuICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICB0aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBLbWxMYXllciBhcyBhbiBPYnNlcnZhYmxlXG4gICAqL1xuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGxheWVyOiBBZ21LbWxMYXllcik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKChtOiBLbWxMYXllcikgPT4ge1xuICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=