import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
let layerId = 0;
/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
let AgmBicyclingLayer = class AgmBicyclingLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show bicycling layer
         */
        this.visible = true;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addBicyclingLayer(this, { visible: this.visible });
        this._addedToManager = true;
    }
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmBicyclingLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }
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
export { AgmBicyclingLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljeWNsaW5nLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCOzs7S0FHSztBQUtMLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBUzFCLFlBQXFCLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFSbkMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFFdUIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixFQUFFLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsUUFBUSxLQUFhLE9BQU8scUJBQXFCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFekUsZ0JBQWdCO0lBQ2hCLFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBRUosQ0FBQTtBQWhDWTtJQUFSLEtBQUssRUFBRTs7a0RBQWdCO0FBUGYsaUJBQWlCO0lBSjdCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxQkFBcUI7S0FDbEMsQ0FBQzs2Q0FXaUMsWUFBWTtHQVRsQyxpQkFBaUIsQ0F1QzdCO1NBdkNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXInO1xuXG5sZXQgbGF5ZXJJZCA9IDA7XG5cbi8qXG4gKiBUaGlzIGRpcmVjdGl2ZSBhZGRzIGEgYmljeWNsaW5nIGxheWVyIHRvIGEgZ29vZ2xlIG1hcCBpbnN0YW5jZVxuICogPGFnbS1iaWN5Y2xpbmctbGF5ZXIgW3Zpc2libGVdPVwidHJ1ZXxmYWxzZVwiPiA8YWdtLWJpY3ljbGluZy1sYXllcj5cbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2FnbS1iaWN5Y2xpbmctbGF5ZXInLFxufSlcblxuZXhwb3J0IGNsYXNzIEFnbUJpY3ljbGluZ0xheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveXtcbiAgICBwcml2YXRlIF9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuXG4gICAgLyoqXG4gICAgICogSGlkZS9zaG93IGJpY3ljbGluZyBsYXllclxuICAgICAqL1xuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX21hbmFnZXI6IExheWVyTWFuYWdlciApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRCaWN5Y2xpbmdMYXllcih0aGlzLCB7dmlzaWJsZTogdGhpcy52aXNpYmxlfSk7XG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIudG9nZ2xlTGF5ZXJWaXNpYmlsaXR5KHRoaXMsIHt2aXNpYmxlOiBjaGFuZ2VzWyd2aXNpYmxlJ10uY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBBZ21CaWN5Y2xpbmdMYXllci0ke3RoaXMuX2lkLnRvU3RyaW5nKCl9YDsgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZUxheWVyKHRoaXMpO1xuICAgIH1cblxufVxuIl19