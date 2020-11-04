import * as tslib_1 from "tslib";
import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
var AgmPolylinePoint = /** @class */ (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    AgmPolylinePoint_1 = AgmPolylinePoint;
    AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    };
    /** @internal */
    AgmPolylinePoint.prototype.getFitBoundsDetails$ = function () {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(function (position) { return ({ latLng: position }); }));
    };
    var AgmPolylinePoint_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmPolylinePoint.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmPolylinePoint.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmPolylinePoint.prototype, "positionChanged", void 0);
    AgmPolylinePoint = AgmPolylinePoint_1 = tslib_1.__decorate([
        Directive({
            selector: 'agm-polyline-point',
            providers: [
                { provide: FitBoundsAccessor, useExisting: forwardRef(function () { return AgmPolylinePoint_1; }) },
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AgmPolylinePoint);
    return AgmPolylinePoint;
}());
export { AgmPolylinePoint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFN0csT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW9CLE1BQU0sd0JBQXdCLENBQUM7QUFFN0U7OztHQUdHO0FBT0g7SUFnQkU7UUFMQTs7V0FFRztRQUNPLG9CQUFlLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRTVFLENBQUM7eUJBaEJMLGdCQUFnQjtJQWtCM0Isc0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQyxJQUFNLFFBQVEsR0FBa0I7Z0JBQzlCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUMzRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzthQUM5RCxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiwrQ0FBb0IsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUM5QixTQUFTLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQ3BELEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUN0QyxDQUFDO0lBQ0osQ0FBQzs7SUE5QlE7UUFBUixLQUFLLEVBQUU7O3NEQUF5QjtJQUt4QjtRQUFSLEtBQUssRUFBRTs7dURBQTBCO0lBS3hCO1FBQVQsTUFBTSxFQUFFOzBDQUFrQixZQUFZOzZEQUFvRDtJQWRoRixnQkFBZ0I7UUFONUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWdCLEVBQWhCLENBQWdCLENBQUMsRUFBQzthQUM5RTtTQUNGLENBQUM7O09BQ1csZ0JBQWdCLENBbUM1QjtJQUFELHVCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXRMbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xuXG4vKipcbiAqIEFnbVBvbHlsaW5lUG9pbnQgcmVwcmVzZW50cyBvbmUgZWxlbWVudCBvZiBhIHBvbHlsaW5lIHdpdGhpbiBhICB7QGxpbmtcbiAqIEFnbVBvbHlsaW5lfVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tcG9seWxpbmUtcG9pbnQnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogRml0Qm91bmRzQWNjZXNzb3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFnbVBvbHlsaW5lUG9pbnQpfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWdtUG9seWxpbmVQb2ludCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRml0Qm91bmRzQWNjZXNzb3Ige1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludDtcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBwb3NpdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxMYXRMbmdMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IGFueSB7XG4gICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBMYXRMbmdMaXRlcmFsID0ge1xuICAgICAgICBsYXQ6IGNoYW5nZXNbJ2xhdGl0dWRlJ10gPyBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgIGxuZzogY2hhbmdlc1snbG9uZ2l0dWRlJ10gPyBjaGFuZ2VzWydsb25naXR1ZGUnXS5jdXJyZW50VmFsdWUgOiB0aGlzLmxvbmdpdHVkZSxcbiAgICAgIH0gYXMgTGF0TG5nTGl0ZXJhbDtcbiAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkLmVtaXQocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25DaGFuZ2VkLnBpcGUoXG4gICAgICBzdGFydFdpdGgoe2xhdDogdGhpcy5sYXRpdHVkZSwgbG5nOiB0aGlzLmxvbmdpdHVkZX0pLFxuICAgICAgbWFwKHBvc2l0aW9uID0+ICh7bGF0TG5nOiBwb3NpdGlvbn0pKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==