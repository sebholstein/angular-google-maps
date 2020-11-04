import * as tslib_1 from "tslib";
var AgmPolylinePoint_1;
import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
let AgmPolylinePoint = AgmPolylinePoint_1 = class AgmPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['latitude'] || changes['longitude']) {
            const position = {
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            };
            this.positionChanged.emit(position);
        }
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(position => ({ latLng: position })));
    }
};
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
            { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint_1) },
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AgmPolylinePoint);
export { AgmPolylinePoint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBRTdFOzs7R0FHRztBQU9ILElBQWEsZ0JBQWdCLHdCQUE3QixNQUFhLGdCQUFnQjtJQWdCM0I7UUFMQTs7V0FFRztRQUNPLG9CQUFlLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRTVFLENBQUM7SUFFaEIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQyxNQUFNLFFBQVEsR0FBa0I7Z0JBQzlCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUMzRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzthQUM5RCxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUNwRCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBL0JVO0lBQVIsS0FBSyxFQUFFOztrREFBeUI7QUFLeEI7SUFBUixLQUFLLEVBQUU7O21EQUEwQjtBQUt4QjtJQUFULE1BQU0sRUFBRTtzQ0FBa0IsWUFBWTt5REFBb0Q7QUFkaEYsZ0JBQWdCO0lBTjVCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsU0FBUyxFQUFFO1lBQ1QsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBZ0IsQ0FBQyxFQUFDO1NBQzlFO0tBQ0YsQ0FBQzs7R0FDVyxnQkFBZ0IsQ0FtQzVCO1NBbkNZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF0TG5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcblxuLyoqXG4gKiBBZ21Qb2x5bGluZVBvaW50IHJlcHJlc2VudHMgb25lIGVsZW1lbnQgb2YgYSBwb2x5bGluZSB3aXRoaW4gYSAge0BsaW5rXG4gKiBBZ21Qb2x5bGluZX1cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lLXBvaW50JyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEZpdEJvdW5kc0FjY2Vzc29yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZ21Qb2x5bGluZVBvaW50KX0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFnbVBvbHlsaW5lUG9pbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEZpdEJvdW5kc0FjY2Vzc29yIHtcbiAgLyoqXG4gICAqIFRoZSBsYXRpdHVkZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgbGF0aXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQ7XG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgbG9uZ2l0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zaXRpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xuICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbjogTGF0TG5nTGl0ZXJhbCA9IHtcbiAgICAgICAgbGF0OiBjaGFuZ2VzWydsYXRpdHVkZSddID8gY2hhbmdlc1snbGF0aXR1ZGUnXS5jdXJyZW50VmFsdWUgOiB0aGlzLmxhdGl0dWRlLFxuICAgICAgICBsbmc6IGNoYW5nZXNbJ2xvbmdpdHVkZSddID8gY2hhbmdlc1snbG9uZ2l0dWRlJ10uY3VycmVudFZhbHVlIDogdGhpcy5sb25naXR1ZGUsXG4gICAgICB9IGFzIExhdExuZ0xpdGVyYWw7XG4gICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZC5lbWl0KHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uQ2hhbmdlZC5waXBlKFxuICAgICAgc3RhcnRXaXRoKHtsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGV9KSxcbiAgICAgIG1hcChwb3NpdGlvbiA9PiAoe2xhdExuZzogcG9zaXRpb259KSlcbiAgICApO1xuICB9XG59XG4iXX0=