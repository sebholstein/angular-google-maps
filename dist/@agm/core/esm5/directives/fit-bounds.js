import * as tslib_1 from "tslib";
import { Directive, Input, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FitBoundsAccessor, FitBoundsService } from '../services/fit-bounds';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
var AgmFitBounds = /** @class */ (function () {
    function AgmFitBounds(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnChanges = function () {
        this._updateBounds();
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnInit = function () {
        var _this = this;
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged(function (x, y) {
            return x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng;
        }), takeUntil(this._destroyed$))
            .subscribe(function (details) { return _this._updateBounds(details); });
    };
    /*
     Either the location changed, or visible status changed.
     Possible state changes are
     invisible -> visible
     visible -> invisible
     visible -> visible (new location)
    */
    AgmFitBounds.prototype._updateBounds = function (newFitBoundsDetails) {
        // either visibility will change, or location, so remove the old one anyway
        if (this._latestFitBoundsDetails) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
            // don't set latestFitBoundsDetails to null, because we can toggle visibility from
            // true -> false -> true, in which case we still need old value cached here
        }
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds === true) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    /**
     * @internal
     */
    AgmFitBounds.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmFitBounds.prototype, "agmFitBounds", void 0);
    AgmFitBounds = tslib_1.__decorate([
        Directive({
            selector: '[agmFitBounds]',
        }),
        tslib_1.__param(0, Self()),
        tslib_1.__metadata("design:paramtypes", [FitBoundsAccessor,
            FitBoundsService])
    ], AgmFitBounds);
    return AgmFitBounds;
}());
export { AgmFitBounds };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZml0LWJvdW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQW9CLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0Y7Ozs7O0dBS0c7QUFJSDtJQVVFLHNCQUMyQixrQkFBcUMsRUFDN0MsaUJBQW1DO1FBRDNCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVh0RDs7O1dBR0c7UUFDTSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVyQixnQkFBVyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2pELDRCQUF1QixHQUE0QixJQUFJLENBQUM7SUFLN0QsQ0FBQztJQUVKOztPQUVHO0lBQ0gsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQkFBUSxHQUFSO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLG9CQUFvQixFQUFFO2FBQ3RCLElBQUksQ0FDSCxvQkFBb0IsQ0FDbEIsVUFBQyxDQUFtQixFQUFFLENBQW1CO1lBQ3ZDLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQTlELENBQThELENBQ2pFLEVBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDNUI7YUFDQSxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNNLG9DQUFhLEdBQXJCLFVBQXNCLG1CQUFzQztRQUMxRCwyRUFBMkU7UUFDM0UsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RSxrRkFBa0Y7WUFDbEYsMkVBQTJFO1NBQzVFO1FBRUQsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsbUJBQW1CLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekU7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLHVCQUF1QixLQUFLLElBQUksRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQztJQXBFUTtRQUFSLEtBQUssRUFBRTs7c0RBQXFCO0lBTGxCLFlBQVk7UUFIeEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO1FBWUcsbUJBQUEsSUFBSSxFQUFFLENBQUE7aURBQXNDLGlCQUFpQjtZQUMxQixnQkFBZ0I7T0FaM0MsWUFBWSxDQTBFeEI7SUFBRCxtQkFBQztDQUFBLEFBMUVELElBMEVDO1NBMUVZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscywgRml0Qm91bmRzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xuXG4vKipcbiAqIEFkZHMgdGhlIGdpdmVuIGRpcmVjdGl2ZSB0byB0aGUgYXV0byBmaXQgYm91bmRzIGZlYXR1cmUgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS5cbiAqIFRvIG1ha2UgaXQgd29yayB3aXRoIHlvdSBjdXN0b20gQUdNIGNvbXBvbmVudCwgeW91IGFsc28gaGF2ZSB0byBpbXBsZW1lbnQgdGhlIHtAbGluayBGaXRCb3VuZHNBY2Nlc3Nvcn0gYWJzdHJhY3QgY2xhc3MuXG4gKiBAZXhhbXBsZVxuICogPGFnbS1tYXJrZXIgW2FnbUZpdEJvdW5kc109XCJ0cnVlXCI+PC9hZ20tbWFya2VyPlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWdtRml0Qm91bmRzXScsXG59KVxuZXhwb3J0IGNsYXNzIEFnbUZpdEJvdW5kcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogSWYgdGhlIHZhbHVlIGlzIHRydWUsIHRoZSBlbGVtZW50IGdldHMgYWRkZWQgdG8gdGhlIGJvdW5kcyBvZiB0aGUgbWFwLlxuICAgKiBEZWZhdWx0OiB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgYWdtRml0Qm91bmRzID0gdHJ1ZTtcblxuICBwcml2YXRlIF9kZXN0cm95ZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfbGF0ZXN0Rml0Qm91bmRzRGV0YWlsczogRml0Qm91bmRzRGV0YWlscyB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBTZWxmKCkgcHJpdmF0ZSByZWFkb25seSBfZml0Qm91bmRzQWNjZXNzb3I6IEZpdEJvdW5kc0FjY2Vzc29yLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2ZpdEJvdW5kc1NlcnZpY2U6IEZpdEJvdW5kc1NlcnZpY2UsXG4gICkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2ZpdEJvdW5kc0FjY2Vzc29yXG4gICAgICAuZ2V0Rml0Qm91bmRzRGV0YWlscyQoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICh4OiBGaXRCb3VuZHNEZXRhaWxzLCB5OiBGaXRCb3VuZHNEZXRhaWxzKSA9PlxuICAgICAgICAgICAgeC5sYXRMbmcubGF0ID09PSB5LmxhdExuZy5sYXQgJiYgeC5sYXRMbmcubG5nID09PSB5LmxhdExuZy5sbmcsXG4gICAgICAgICksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZGV0YWlscyA9PiB0aGlzLl91cGRhdGVCb3VuZHMoZGV0YWlscykpO1xuICB9XG5cbiAgLypcbiAgIEVpdGhlciB0aGUgbG9jYXRpb24gY2hhbmdlZCwgb3IgdmlzaWJsZSBzdGF0dXMgY2hhbmdlZC5cbiAgIFBvc3NpYmxlIHN0YXRlIGNoYW5nZXMgYXJlXG4gICBpbnZpc2libGUgLT4gdmlzaWJsZVxuICAgdmlzaWJsZSAtPiBpbnZpc2libGVcbiAgIHZpc2libGUgLT4gdmlzaWJsZSAobmV3IGxvY2F0aW9uKVxuICAqL1xuICBwcml2YXRlIF91cGRhdGVCb3VuZHMobmV3Rml0Qm91bmRzRGV0YWlscz86IEZpdEJvdW5kc0RldGFpbHMpIHtcbiAgICAvLyBlaXRoZXIgdmlzaWJpbGl0eSB3aWxsIGNoYW5nZSwgb3IgbG9jYXRpb24sIHNvIHJlbW92ZSB0aGUgb2xkIG9uZSBhbnl3YXlcbiAgICBpZiAodGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscykge1xuICAgICAgdGhpcy5fZml0Qm91bmRzU2VydmljZS5yZW1vdmVGcm9tQm91bmRzKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMubGF0TG5nKTtcbiAgICAgIC8vIGRvbid0IHNldCBsYXRlc3RGaXRCb3VuZHNEZXRhaWxzIHRvIG51bGwsIGJlY2F1c2Ugd2UgY2FuIHRvZ2dsZSB2aXNpYmlsaXR5IGZyb21cbiAgICAgIC8vIHRydWUgLT4gZmFsc2UgLT4gdHJ1ZSwgaW4gd2hpY2ggY2FzZSB3ZSBzdGlsbCBuZWVkIG9sZCB2YWx1ZSBjYWNoZWQgaGVyZVxuICAgIH1cblxuICAgIGlmIChuZXdGaXRCb3VuZHNEZXRhaWxzKSB7XG4gICAgICB0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzID0gbmV3Rml0Qm91bmRzRGV0YWlscztcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmFnbUZpdEJvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fZml0Qm91bmRzU2VydmljZS5hZGRUb0JvdW5kcyh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzLmxhdExuZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICAgIGlmICh0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLnJlbW92ZUZyb21Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xuICAgIH1cbiAgfVxufVxuIl19