import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex,
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) {
            if (typeof options.strokePosition === 'string') {
                options.strokePosition = google.maps.StrokePosition[options.strokePosition];
            }
            c.setOptions(options);
        });
    };
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    CircleManager.prototype.getNativeCircle = function (circle) {
        return this._circles.get(circle);
    };
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return new Observable(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], CircleManager);
    return CircleManager;
}());
export { CircleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU1sRTtJQUlFLHVCQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxhQUFRLEdBQ1osSUFBSSxHQUFHLEVBQXVDLENBQUM7SUFFNEIsQ0FBQztJQUVoRixpQ0FBUyxHQUFULFVBQVUsTUFBaUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3RELE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFDO1lBQ3JELFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDbkMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1lBQ3JDLFlBQVksRUFBRSxNQUFN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TUFBTSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBN0ZVLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQUtzQixvQkFBb0IsRUFBaUIsTUFBTTtPQUpqRSxhQUFhLENBOEZ6QjtJQUFELG9CQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0E5RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaXJjbGVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY2lyY2xlczogTWFwPEFnbUNpcmNsZSwgUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+PiA9XG4gICAgICBuZXcgTWFwPEFnbUNpcmNsZSwgUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwaVdyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgYWRkQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKSB7XG4gICAgdGhpcy5fY2lyY2xlcy5zZXQoY2lyY2xlLCB0aGlzLl9hcGlXcmFwcGVyLmNyZWF0ZUNpcmNsZSh7XG4gICAgICBjZW50ZXI6IHtsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlfSxcbiAgICAgIGNsaWNrYWJsZTogY2lyY2xlLmNsaWNrYWJsZSxcbiAgICAgIGRyYWdnYWJsZTogY2lyY2xlLmRyYWdnYWJsZSxcbiAgICAgIGVkaXRhYmxlOiBjaXJjbGUuZWRpdGFibGUsXG4gICAgICBmaWxsQ29sb3I6IGNpcmNsZS5maWxsQ29sb3IsXG4gICAgICBmaWxsT3BhY2l0eTogY2lyY2xlLmZpbGxPcGFjaXR5LFxuICAgICAgcmFkaXVzOiBjaXJjbGUucmFkaXVzLFxuICAgICAgc3Ryb2tlQ29sb3I6IGNpcmNsZS5zdHJva2VDb2xvcixcbiAgICAgIHN0cm9rZU9wYWNpdHk6IGNpcmNsZS5zdHJva2VPcGFjaXR5LFxuICAgICAgc3Ryb2tlUG9zaXRpb246IGNpcmNsZS5zdHJva2VQb3NpdGlvbixcbiAgICAgIHN0cm9rZVdlaWdodDogY2lyY2xlLnN0cm9rZVdlaWdodCxcbiAgICAgIHZpc2libGU6IGNpcmNsZS52aXNpYmxlLFxuICAgICAgekluZGV4OiBjaXJjbGUuekluZGV4LFxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBjaXJjbGUgZnJvbSB0aGUgbWFwLlxuICAgKi9cbiAgcmVtb3ZlQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xuICAgICAgYy5zZXRNYXAobnVsbCk7XG4gICAgICB0aGlzLl9jaXJjbGVzLmRlbGV0ZShjaXJjbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhjaXJjbGU6IEFnbUNpcmNsZSwgb3B0aW9uczogbWFwVHlwZXMuQ2lyY2xlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3B0aW9ucy5zdHJva2VQb3NpdGlvbiA9IGdvb2dsZS5tYXBzLlN0cm9rZVBvc2l0aW9uW29wdGlvbnMuc3Ryb2tlUG9zaXRpb25dO1xuICAgICAgfVxuICAgICAgYy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Qm91bmRzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmdCb3VuZHM+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiBjLmdldEJvdW5kcygpKTtcbiAgfVxuXG4gIGdldENlbnRlcihjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8bWFwVHlwZXMuTGF0TG5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4gYy5nZXRDZW50ZXIoKSk7XG4gIH1cblxuICBnZXRSYWRpdXMoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0UmFkaXVzKCkpO1xuICB9XG5cbiAgc2V0Q2VudGVyKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihcbiAgICAgICAgKGMpID0+IHsgcmV0dXJuIGMuc2V0Q2VudGVyKHtsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlfSk7IH0pO1xuICB9XG5cbiAgc2V0RWRpdGFibGUoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldEVkaXRhYmxlKGNpcmNsZS5lZGl0YWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0RHJhZ2dhYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXREcmFnZ2FibGUoY2lyY2xlLmRyYWdnYWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0VmlzaWJsZShjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHsgcmV0dXJuIGMuc2V0VmlzaWJsZShjaXJjbGUudmlzaWJsZSk7IH0pO1xuICB9XG5cbiAgc2V0UmFkaXVzKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXRSYWRpdXMoY2lyY2xlLnJhZGl1cyk7IH0pO1xuICB9XG5cbiAgZ2V0TmF0aXZlQ2lyY2xlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5DaXJjbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKTtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgY2lyY2xlOiBBZ21DaXJjbGUpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgbGV0IGxpc3RlbmVyOiBtYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHtcbiAgICAgICAgbGlzdGVuZXIgPSBjLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBsaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19