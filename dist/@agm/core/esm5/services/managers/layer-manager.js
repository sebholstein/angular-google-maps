import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
var LayerManager = /** @class */ (function () {
    function LayerManager(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    LayerManager.prototype.addTransitLayer = function (layer, options) {
        var newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    LayerManager.prototype.addBicyclingLayer = function (layer, options) {
        var newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    LayerManager.prototype.deleteLayer = function (layer) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            currentLayer.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    LayerManager.prototype.toggleLayerVisibility = function (layer, options) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            }
            else {
                return _this._wrapper.getNativeMap().then(function (map) {
                    currentLayer.setMap(map);
                });
            }
        });
    };
    LayerManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper])
    ], LayerManager);
    return LayerManager;
}());
export { LayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEU7O0dBRUc7QUFHSDtJQUlJLHNCQUFvQixRQUE4QjtRQUE5QixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUgxQyxZQUFPLEdBQ1gsSUFBSSxHQUFHLEVBQStFLENBQUM7SUFFdEMsQ0FBQztJQUV0RDs7Ozs7T0FLRztJQUNILHNDQUFlLEdBQWYsVUFBZ0IsS0FBc0IsRUFBRSxPQUE0QjtRQUNoRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBaUIsR0FBakIsVUFBa0IsS0FBd0IsRUFBRSxPQUE4QjtRQUN0RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtDQUFXLEdBQVgsVUFBWSxLQUEwQztRQUF0RCxpQkFLQztRQUpHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWTtZQUM1QyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNENBQXFCLEdBQXJCLFVBQXNCLEtBQTBDLEVBQUUsT0FBb0Q7UUFBdEgsaUJBV0M7UUFWRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFlBQVk7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU87YUFDVjtpQkFBTTtnQkFDSixPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFFLFVBQUMsR0FBYztvQkFDckQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpEUSxZQUFZO1FBRHhCLFVBQVUsRUFBRTtpREFLcUIsb0JBQW9CO09BSnpDLFlBQVksQ0EwRHhCO0lBQUQsbUJBQUM7Q0FBQSxBQTFERCxJQTBEQztTQTFEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWdtQmljeWNsaW5nTGF5ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2JpY3ljbGluZy1sYXllcic7XG5pbXBvcnQgeyBBZ21UcmFuc2l0TGF5ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RyYW5zaXQtbGF5ZXInO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBCaWN5Y2xpbmdMYXllciwgQmljeWNsaW5nTGF5ZXJPcHRpb25zLCBHb29nbGVNYXAsIFRyYW5zaXRMYXllciwgVHJhbnNpdExheWVyT3B0aW9ucyB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG1hbmFnZXMgVHJhbnNpdCBhbmQgQmljeWNsaW5nIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMYXllck1hbmFnZXIge1xuICAgIHByaXZhdGUgX2xheWVyczogTWFwPEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBQcm9taXNlPFRyYW5zaXRMYXllciB8IEJpY3ljbGluZ0xheWVyPj4gPVxuICAgICAgICBuZXcgTWFwPEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBQcm9taXNlPFRyYW5zaXRMYXllciB8IEJpY3ljbGluZ0xheWVyPj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyKSB7fVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHRyYW5zaXQgbGF5ZXIgdG8gYSBtYXAgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtBZ21UcmFuc2l0TGF5ZXJ9IGxheWVyIC0gYSBUcmFuc2l0TGF5ZXIgb2JqZWN0XG4gICAgICogQHBhcmFtIHtUcmFuc2l0TGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gVHJhbnNpdExheWVyT3B0aW9ucyBvcHRpb25zXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGFkZFRyYW5zaXRMYXllcihsYXllcjogQWdtVHJhbnNpdExheWVyLCBvcHRpb25zOiBUcmFuc2l0TGF5ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5jcmVhdGVUcmFuc2l0TGF5ZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgYmljeWNsaW5nIGxheWVyIHRvIGEgbWFwIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7QWdtQmljeWNsaW5nTGF5ZXJ9IGxheWVyIC0gYSBiaWN5Y2xpbmcgbGF5ZXIgb2JqZWN0XG4gICAgICogQHBhcmFtIHtCaWN5Y2xpbmdMYXllck9wdGlvbnN9IG9wdGlvbnMgLSBCaWN5Y2xpbmdMYXllciBvcHRpb25zXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGFkZEJpY3ljbGluZ0xheWVyKGxheWVyOiBBZ21CaWN5Y2xpbmdMYXllciwgb3B0aW9uczogQmljeWNsaW5nTGF5ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5jcmVhdGVCaWN5Y2xpbmdMYXllcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllciwgbmV3TGF5ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBtYXAgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge0FnbVRyYW5zaXRMYXllcnxBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgdG8gZGVsZXRlXG4gICAgICogQHJldHVybnMgIFByb21pc2U8dm9pZD5cbiAgICAgKi9cbiAgICBkZWxldGVMYXllcihsYXllcjogQWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oY3VycmVudExheWVyID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZS9TaG93IGEgZ29vZ2xlIG1hcCBsYXllclxuICAgICAqIEBwYXJhbSB7IEFnbVRyYW5zaXRMYXllcnxBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSB0aGUgbGF5ZXIgdG8gaGlkZS9zaG93XG4gICAgICogQHBhcmFtIHtUcmFuc2l0TGF5ZXJPcHRpb25zfEJpY3ljbGluZ0xheWVyT3B0aW9uc30gb3B0aW9ucyAtIHVzZWQgdG8gc2V0IHZpc2liaWxpdHkgb2YgdGhlIGxheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTx2b2lkPlxuICAgICAqL1xuICAgIHRvZ2dsZUxheWVyVmlzaWJpbGl0eShsYXllcjogQWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIsIG9wdGlvbnM6IFRyYW5zaXRMYXllck9wdGlvbnMgfCBCaWN5Y2xpbmdMYXllck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oY3VycmVudExheWVyID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudExheWVyLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbiggKG1hcDogR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgY3VycmVudExheWVyLnNldE1hcChtYXApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=