import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolygonManager = /** @class */ (function () {
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
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.getPath = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPath().getArray(); });
    };
    PolygonManager.prototype.getPaths = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPaths().getArray().map(function (p) { return p.getArray(); }); });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.prototype.createPathEventObservable = function (agmPolygon) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var polygon, paths, pathsChanges$;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polygons.get(agmPolygon)];
                    case 1:
                        polygon = _a.sent();
                        paths = polygon.getPaths();
                        pathsChanges$ = createMVCEventObservable(paths);
                        return [2 /*return*/, pathsChanges$.pipe(startWith({ newArr: paths.getArray() }), // in order to subscribe to them all
                            switchMap(function (parentMVEvent) { return merge.apply(void 0, tslib_1.__spread(// rest parameter
                            parentMVEvent.newArr.map(function (chMVC, index) {
                                return createMVCEventObservable(chMVC)
                                    .pipe(map(function (chMVCEvent) { return ({ parentMVEvent: parentMVEvent, chMVCEvent: chMVCEvent, pathIndex: index }); }));
                            }))).pipe(startWith({ parentMVEvent: parentMVEvent, chMVCEvent: null, pathIndex: null })); }), // start the merged ob with an event signinifing change to parent
                            skip(1), // skip the manually added event
                            map(function (_a) {
                                var parentMVEvent = _a.parentMVEvent, chMVCEvent = _a.chMVCEvent, pathIndex = _a.pathIndex;
                                var retVal;
                                if (!chMVCEvent) {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        eventName: parentMVEvent.evName,
                                        index: parentMVEvent.index,
                                    };
                                    if (parentMVEvent.previous) {
                                        retVal.previous = parentMVEvent.previous.getArray();
                                    }
                                }
                                else {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        pathIndex: pathIndex,
                                        eventName: chMVCEvent.evName,
                                        index: chMVCEvent.index,
                                    };
                                    if (chMVCEvent.previous) {
                                        retVal.previous = chMVCEvent.previous;
                                    }
                                }
                                return retVal;
                            }))];
                }
            });
        });
    };
    PolygonManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], PolygonManager);
    return PolygonManager;
}());
export { PolygonManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakUsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJbEU7SUFJRSx3QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsY0FBUyxHQUNmLElBQUksR0FBRyxFQUFnQyxDQUFDO0lBRXVDLENBQUM7SUFFbEYsbUNBQVUsR0FBVixVQUFXLElBQWdCO1FBQ3pCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBQ3JELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxh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LENBQUMsRUFBQzs7OztLQUNQO0lBdEdVLGNBQWM7UUFEMUIsVUFBVSxFQUFFO2lEQUt1QixvQkFBb0IsRUFBaUIsTUFBTTtPQUpsRSxjQUFjLENBdUcxQjtJQUFELHFCQUFDO0NBQUEsQUF2R0QsSUF1R0M7U0F2R1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNraXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBZ21Qb2x5Z29uLCBQYXRoQ2hhbmdlUG9seWdvblBhdGhFdmVudCwgUGF0aENvbGxlY3Rpb25DaGFuZ2VQb2x5Z29uUGF0aEV2ZW50LCBQb2x5Z29uUGF0aEV2ZW50IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5Z29uJztcbmltcG9ydCB7IGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZSwgTVZDRXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9tdmNhcnJheS11dGlscyc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IExhdExuZywgTVZDQXJyYXksIFBvbHlnb24gfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb2x5Z29uTWFuYWdlciB7XG4gIHByaXZhdGUgX3BvbHlnb25zOiBNYXA8QWdtUG9seWdvbiwgUHJvbWlzZTxQb2x5Z29uPj4gPVxuICAgIG5ldyBNYXA8QWdtUG9seWdvbiwgUHJvbWlzZTxQb2x5Z29uPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgYWRkUG9seWdvbihwYXRoOiBBZ21Qb2x5Z29uKSB7XG4gICAgY29uc3QgcG9seWdvblByb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVQb2x5Z29uKHtcbiAgICAgIGNsaWNrYWJsZTogcGF0aC5jbGlja2FibGUsXG4gICAgICBkcmFnZ2FibGU6IHBhdGguZHJhZ2dhYmxlLFxuICAgICAgZWRpdGFibGU6IHBhdGguZWRpdGFibGUsXG4gICAgICBmaWxsQ29sb3I6IHBhdGguZmlsbENvbG9yLFxuICAgICAgZmlsbE9wYWNpdHk6IHBhdGguZmlsbE9wYWNpdHksXG4gICAgICBnZW9kZXNpYzogcGF0aC5nZW9kZXNpYyxcbiAgICAgIHBhdGhzOiBwYXRoLnBhdGhzLFxuICAgICAgc3Ryb2tlQ29sb3I6IHBhdGguc3Ryb2tlQ29sb3IsXG4gICAgICBzdHJva2VPcGFjaXR5OiBwYXRoLnN0cm9rZU9wYWNpdHksXG4gICAgICBzdHJva2VXZWlnaHQ6IHBhdGguc3Ryb2tlV2VpZ2h0LFxuICAgICAgdmlzaWJsZTogcGF0aC52aXNpYmxlLFxuICAgICAgekluZGV4OiBwYXRoLnpJbmRleCxcbiAgICB9KTtcbiAgICB0aGlzLl9wb2x5Z29ucy5zZXQocGF0aCwgcG9seWdvblByb21pc2UpO1xuICB9XG5cbiAgdXBkYXRlUG9seWdvbihwb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHsgbC5zZXRQYXRocyhwb2x5Z29uLnBhdGhzKTsgfSkpO1xuICB9XG5cbiAgc2V0UG9seWdvbk9wdGlvbnMocGF0aDogQWdtUG9seWdvbiwgb3B0aW9uczogeyBbcHJvcE5hbWU6IHN0cmluZ106IGFueSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwYXRoKS50aGVuKChsOiBQb2x5Z29uKSA9PiB7IGwuc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gIH1cblxuICBkZWxldGVQb2x5Z29uKHBhdGhzOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwYXRocyk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuZGVsZXRlKHBhdGhzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGF0aChwb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKVxuICAgICAgLnRoZW4oKHBvbHlnb24pID0+IHBvbHlnb24uZ2V0UGF0aCgpLmdldEFycmF5KCkpO1xuICB9XG5cbiAgZ2V0UGF0aHMocG9seWdvbjogQWdtUG9seWdvbik6IFByb21pc2U8QXJyYXk8QXJyYXk8TGF0TG5nPj4+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRocygpLmdldEFycmF5KCkubWFwKChwKSA9PiBwLmdldEFycmF5KCkpKTtcbiAgfVxuXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcGF0aDogQWdtUG9seWdvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aCkudGhlbigobDogUG9seWdvbikgPT4ge1xuICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUGF0aEV2ZW50T2JzZXJ2YWJsZShhZ21Qb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTxPYnNlcnZhYmxlPFBvbHlnb25QYXRoRXZlbnQ8YW55Pj4+IHtcbiAgICBjb25zdCBwb2x5Z29uID0gYXdhaXQgdGhpcy5fcG9seWdvbnMuZ2V0KGFnbVBvbHlnb24pO1xuICAgIGNvbnN0IHBhdGhzID0gcG9seWdvbi5nZXRQYXRocygpO1xuICAgIGNvbnN0IHBhdGhzQ2hhbmdlcyQgPSBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUocGF0aHMpO1xuICAgIHJldHVybiBwYXRoc0NoYW5nZXMkLnBpcGUoc3RhcnRXaXRoKCh7IG5ld0FycjogcGF0aHMuZ2V0QXJyYXkoKSB9IGFzIE1WQ0V2ZW50PE1WQ0FycmF5PExhdExuZz4+KSksIC8vIGluIG9yZGVyIHRvIHN1YnNjcmliZSB0byB0aGVtIGFsbFxuICAgICAgc3dpdGNoTWFwKHBhcmVudE1WRXZlbnQgPT4gbWVyZ2UoLi4uLy8gcmVzdCBwYXJhbWV0ZXJcbiAgICAgICAgcGFyZW50TVZFdmVudC5uZXdBcnIubWFwKChjaE1WQywgaW5kZXgpID0+XG4gICAgICAgICAgY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlKGNoTVZDKVxuICAgICAgICAgIC5waXBlKG1hcChjaE1WQ0V2ZW50ID0+ICh7IHBhcmVudE1WRXZlbnQsIGNoTVZDRXZlbnQsIHBhdGhJbmRleDogaW5kZXggfSkpKSkpXG4gICAgICAgIC5waXBlKHN0YXJ0V2l0aCh7IHBhcmVudE1WRXZlbnQsIGNoTVZDRXZlbnQ6IG51bGwsIHBhdGhJbmRleDogbnVsbCB9KSkpLCAvLyBzdGFydCB0aGUgbWVyZ2VkIG9iIHdpdGggYW4gZXZlbnQgc2lnbmluaWZpbmcgY2hhbmdlIHRvIHBhcmVudFxuICAgICAgc2tpcCgxKSwgLy8gc2tpcCB0aGUgbWFudWFsbHkgYWRkZWQgZXZlbnRcbiAgICAgIG1hcCgoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50LCBwYXRoSW5kZXggfSkgPT4ge1xuICAgICAgICBsZXQgcmV0VmFsO1xuICAgICAgICBpZiAoIWNoTVZDRXZlbnQpIHtcbiAgICAgICAgICByZXRWYWwgPSB7XG4gICAgICAgICAgICBuZXdBcnI6IHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcChzdWJBcnIgPT4gc3ViQXJyLmdldEFycmF5KCkubWFwKGxhdExuZyA9PiBsYXRMbmcudG9KU09OKCkpKSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogcGFyZW50TVZFdmVudC5ldk5hbWUsXG4gICAgICAgICAgICBpbmRleDogcGFyZW50TVZFdmVudC5pbmRleCxcbiAgICAgICAgICB9IGFzIFBhdGhDb2xsZWN0aW9uQ2hhbmdlUG9seWdvblBhdGhFdmVudDtcbiAgICAgICAgICBpZiAocGFyZW50TVZFdmVudC5wcmV2aW91cykge1xuICAgICAgICAgICAgcmV0VmFsLnByZXZpb3VzID0gIHBhcmVudE1WRXZlbnQucHJldmlvdXMuZ2V0QXJyYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0VmFsID0ge1xuICAgICAgICAgICAgbmV3QXJyOiBwYXJlbnRNVkV2ZW50Lm5ld0Fyci5tYXAoc3ViQXJyID0+IHN1YkFyci5nZXRBcnJheSgpLm1hcChsYXRMbmcgPT4gbGF0TG5nLnRvSlNPTigpKSksXG4gICAgICAgICAgICBwYXRoSW5kZXgsXG4gICAgICAgICAgICBldmVudE5hbWU6IGNoTVZDRXZlbnQuZXZOYW1lLFxuICAgICAgICAgICAgaW5kZXg6IGNoTVZDRXZlbnQuaW5kZXgsXG4gICAgICAgICAgfSBhcyBQYXRoQ2hhbmdlUG9seWdvblBhdGhFdmVudDtcbiAgICAgICAgICBpZiAoY2hNVkNFdmVudC5wcmV2aW91cykge1xuICAgICAgICAgICAgcmV0VmFsLnByZXZpb3VzID0gY2hNVkNFdmVudC5wcmV2aW91cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgIH0pKTtcbiAgfVxufVxuIl19