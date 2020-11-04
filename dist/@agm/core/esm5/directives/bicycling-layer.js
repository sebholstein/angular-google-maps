import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
var layerId = 0;
/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
var AgmBicyclingLayer = /** @class */ (function () {
    function AgmBicyclingLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show bicycling layer
         */
        this.visible = true;
    }
    AgmBicyclingLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addBicyclingLayer(this, { visible: this.visible });
        this._addedToManager = true;
    };
    AgmBicyclingLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    };
    /** @internal */
    AgmBicyclingLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmBicyclingLayer.prototype.toString = function () { return "AgmBicyclingLayer-" + this._id.toString(); };
    /** @internal */
    AgmBicyclingLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteLayer(this);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmBicyclingLayer.prototype, "visible", void 0);
    AgmBicyclingLayer = tslib_1.__decorate([
        Directive({
            selector: 'agm-bicycling-layer',
        }),
        tslib_1.__metadata("design:paramtypes", [LayerManager])
    ], AgmBicyclingLayer);
    return AgmBicyclingLayer;
}());
export { AgmBicyclingLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljeWNsaW5nLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCOzs7S0FHSztBQUtMO0lBU0ksMkJBQXFCLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFSbkMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFFdUIsQ0FBQztJQUVoRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiw4QkFBRSxHQUFGLGNBQWUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsb0NBQVEsR0FBUixjQUFxQixPQUFPLHVCQUFxQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUV6RSxnQkFBZ0I7SUFDaEIsdUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUE5QlE7UUFBUixLQUFLLEVBQUU7O3NEQUFnQjtJQVBmLGlCQUFpQjtRQUo3QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1NBQ2xDLENBQUM7aURBV2lDLFlBQVk7T0FUbEMsaUJBQWlCLENBdUM3QjtJQUFELHdCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XG5cbmxldCBsYXllcklkID0gMDtcblxuLypcbiAqIFRoaXMgZGlyZWN0aXZlIGFkZHMgYSBiaWN5Y2xpbmcgbGF5ZXIgdG8gYSBnb29nbGUgbWFwIGluc3RhbmNlXG4gKiA8YWdtLWJpY3ljbGluZy1sYXllciBbdmlzaWJsZV09XCJ0cnVlfGZhbHNlXCI+IDxhZ20tYmljeWNsaW5nLWxheWVyPlxuICogKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYWdtLWJpY3ljbGluZy1sYXllcicsXG59KVxuXG5leHBvcnQgY2xhc3MgQWdtQmljeWNsaW5nTGF5ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95e1xuICAgIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlL3Nob3cgYmljeWNsaW5nIGxheWVyXG4gICAgICovXG4gICAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfbWFuYWdlcjogTGF5ZXJNYW5hZ2VyICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFkZEJpY3ljbGluZ0xheWVyKHRoaXMsIHt2aXNpYmxlOiB0aGlzLnZpc2libGV9KTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci50b2dnbGVMYXllclZpc2liaWxpdHkodGhpcywge3Zpc2libGU6IGNoYW5nZXNbJ3Zpc2libGUnXS5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEFnbUJpY3ljbGluZ0xheWVyLSR7dGhpcy5faWQudG9TdHJpbmcoKX1gOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlTGF5ZXIodGhpcyk7XG4gICAgfVxuXG59XG4iXX0=