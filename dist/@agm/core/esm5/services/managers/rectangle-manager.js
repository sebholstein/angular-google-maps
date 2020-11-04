import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var RectangleManager = /** @class */ (function () {
    function RectangleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._rectangles = new Map();
    }
    RectangleManager.prototype.addRectangle = function (rectangle) {
        this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
            bounds: {
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            },
            clickable: rectangle.clickable,
            draggable: rectangle.draggable,
            editable: rectangle.editable,
            fillColor: rectangle.fillColor,
            fillOpacity: rectangle.fillOpacity,
            strokeColor: rectangle.strokeColor,
            strokeOpacity: rectangle.strokeOpacity,
            strokePosition: rectangle.strokePosition,
            strokeWeight: rectangle.strokeWeight,
            visible: rectangle.visible,
            zIndex: rectangle.zIndex,
        }));
    };
    /**
     * Removes the given rectangle from the map.
     */
    RectangleManager.prototype.removeRectangle = function (rectangle) {
        var _this = this;
        return this._rectangles.get(rectangle).then(function (r) {
            r.setMap(null);
            _this._rectangles.delete(rectangle);
        });
    };
    RectangleManager.prototype.setOptions = function (rectangle, options) {
        return this._rectangles.get(rectangle).then(function (r) { return r.setOptions(options); });
    };
    RectangleManager.prototype.getBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) { return r.getBounds(); });
    };
    RectangleManager.prototype.setBounds = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setBounds({
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            });
        });
    };
    RectangleManager.prototype.setEditable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setEditable(rectangle.editable);
        });
    };
    RectangleManager.prototype.setDraggable = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setDraggable(rectangle.draggable);
        });
    };
    RectangleManager.prototype.setVisible = function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setVisible(rectangle.visible);
        });
    };
    RectangleManager.prototype.createEventObservable = function (eventName, rectangle) {
        var _this = this;
        return Observable.create(function (observer) {
            var listener = null;
            _this._rectangles.get(rectangle).then(function (r) {
                listener = r.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    RectangleManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], RectangleManager);
    return RectangleManager;
}());
export { RectangleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUlsRTtJQUlFLDBCQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxnQkFBVyxHQUNmLElBQUksR0FBRyxFQUE2QyxDQUFDO0lBRXNCLENBQUM7SUFFaEYsdUNBQVksR0FBWixVQUFhLFNBQXVCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztZQUMvRCxNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO2dCQUN0QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzlCLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM5QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7WUFDNUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzlCLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVztZQUNsQyxXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVc7WUFDbEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxhQUFhO1lBQ3RDLGNB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LElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ3JDLFFBQVEsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU87Z0JBQ0wsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNyQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBeEZVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7aURBS3NCLG9CQUFvQixFQUFpQixNQUFNO09BSmpFLGdCQUFnQixDQXlGNUI7SUFBRCx1QkFBQztDQUFBLEFBekZELElBeUZDO1NBekZZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBZ21SZWN0YW5nbGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JlY3RhbmdsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCAqIGFzIG1hcFR5cGVzIGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZU1hbmFnZXIge1xuICBwcml2YXRlIF9yZWN0YW5nbGVzOiBNYXA8QWdtUmVjdGFuZ2xlLCBQcm9taXNlPG1hcFR5cGVzLlJlY3RhbmdsZT4+ID1cbiAgICAgIG5ldyBNYXA8QWdtUmVjdGFuZ2xlLCBQcm9taXNlPG1hcFR5cGVzLlJlY3RhbmdsZT4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXBpV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICBhZGRSZWN0YW5nbGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpIHtcbiAgICB0aGlzLl9yZWN0YW5nbGVzLnNldChyZWN0YW5nbGUsIHRoaXMuX2FwaVdyYXBwZXIuY3JlYXRlUmVjdGFuZ2xlKHtcbiAgICAgIGJvdW5kczoge1xuICAgICAgICBub3J0aDogcmVjdGFuZ2xlLm5vcnRoLFxuICAgICAgICBlYXN0OiByZWN0YW5nbGUuZWFzdCxcbiAgICAgICAgc291dGg6IHJlY3RhbmdsZS5zb3V0aCxcbiAgICAgICAgd2VzdDogcmVjdGFuZ2xlLndlc3QsXG4gICAgICB9LFxuICAgICAgY2xpY2thYmxlOiByZWN0YW5nbGUuY2xpY2thYmxlLFxuICAgICAgZHJhZ2dhYmxlOiByZWN0YW5nbGUuZHJhZ2dhYmxlLFxuICAgICAgZWRpdGFibGU6IHJlY3RhbmdsZS5lZGl0YWJsZSxcbiAgICAgIGZpbGxDb2xvcjogcmVjdGFuZ2xlLmZpbGxDb2xvcixcbiAgICAgIGZpbGxPcGFjaXR5OiByZWN0YW5nbGUuZmlsbE9wYWNpdHksXG4gICAgICBzdHJva2VDb2xvcjogcmVjdGFuZ2xlLnN0cm9rZUNvbG9yLFxuICAgICAgc3Ryb2tlT3BhY2l0eTogcmVjdGFuZ2xlLnN0cm9rZU9wYWNpdHksXG4gICAgICBzdHJva2VQb3NpdGlvbjogcmVjdGFuZ2xlLnN0cm9rZVBvc2l0aW9uLFxuICAgICAgc3Ryb2tlV2VpZ2h0OiByZWN0YW5nbGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgdmlzaWJsZTogcmVjdGFuZ2xlLnZpc2libGUsXG4gICAgICB6SW5kZXg6IHJlY3RhbmdsZS56SW5kZXgsXG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGdpdmVuIHJlY3RhbmdsZSBmcm9tIHRoZSBtYXAuXG4gICAqL1xuICByZW1vdmVSZWN0YW5nbGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XG4gICAgICByLnNldE1hcChudWxsKTtcbiAgICAgIHRoaXMuX3JlY3RhbmdsZXMuZGVsZXRlKHJlY3RhbmdsZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRPcHRpb25zKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlLCBvcHRpb25zOiBtYXBUeXBlcy5SZWN0YW5nbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4gci5zZXRPcHRpb25zKG9wdGlvbnMpKTtcbiAgfVxuXG4gIGdldEJvdW5kcyhyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8bWFwVHlwZXMuTGF0TG5nQm91bmRzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4gci5nZXRCb3VuZHMoKSk7XG4gIH1cblxuICBzZXRCb3VuZHMocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XG4gICAgICByZXR1cm4gci5zZXRCb3VuZHMoe1xuICAgICAgICBub3J0aDogcmVjdGFuZ2xlLm5vcnRoLFxuICAgICAgICBlYXN0OiByZWN0YW5nbGUuZWFzdCxcbiAgICAgICAgc291dGg6IHJlY3RhbmdsZS5zb3V0aCxcbiAgICAgICAgd2VzdDogcmVjdGFuZ2xlLndlc3QsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEVkaXRhYmxlKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xuICAgICAgcmV0dXJuIHIuc2V0RWRpdGFibGUocmVjdGFuZ2xlLmVkaXRhYmxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERyYWdnYWJsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcbiAgICAgIHJldHVybiByLnNldERyYWdnYWJsZShyZWN0YW5nbGUuZHJhZ2dhYmxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZpc2libGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XG4gICAgICByZXR1cm4gci5zZXRWaXNpYmxlKHJlY3RhbmdsZS52aXNpYmxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgbGV0IGxpc3RlbmVyOiBtYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgICB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcbiAgICAgICAgbGlzdGVuZXIgPSByLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBsaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19