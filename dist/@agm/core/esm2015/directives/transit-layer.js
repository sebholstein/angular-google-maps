import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
let layerId = 0;
/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
let AgmTransitLayer = class AgmTransitLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show transit layer
         */
        this.visible = true;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this, { visible: this.visible });
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
    toString() { return `AgmTransitLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmTransitLayer.prototype, "visible", void 0);
AgmTransitLayer = tslib_1.__decorate([
    Directive({
        selector: 'agm-transit-layer',
    }),
    tslib_1.__metadata("design:paramtypes", [LayerManager])
], AgmTransitLayer);
export { AgmTransitLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdHJhbnNpdC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7OztLQUdLO0FBS0wsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVN4QixZQUFxQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBUm5DLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFFBQUcsR0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0M7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRXVCLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLEVBQUUsS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixRQUFRLEtBQWEsT0FBTyxtQkFBbUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2RSxnQkFBZ0I7SUFDaEIsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFSixDQUFBO0FBaENZO0lBQVIsS0FBSyxFQUFFOztnREFBZ0I7QUFQZixlQUFlO0lBSjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7S0FDaEMsQ0FBQzs2Q0FXaUMsWUFBWTtHQVRsQyxlQUFlLENBdUMzQjtTQXZDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XG5cbmxldCBsYXllcklkID0gMDtcblxuLypcbiAqIFRoaXMgZGlyZWN0aXZlIGFkZHMgYSB0cmFuc2l0IGxheWVyIHRvIGEgZ29vZ2xlIG1hcCBpbnN0YW5jZVxuICogPGFnbS10cmFuc2l0LWxheWVyIFt2aXNpYmxlXT1cInRydWV8ZmFsc2VcIj4gPGFnbS10cmFuc2l0LWxheWVyPlxuICogKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYWdtLXRyYW5zaXQtbGF5ZXInLFxufSlcblxuZXhwb3J0IGNsYXNzIEFnbVRyYW5zaXRMYXllciBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3l7XG4gICAgcHJpdmF0ZSBfYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nID0gKGxheWVySWQrKykudG9TdHJpbmcoKTtcblxuICAgIC8qKlxuICAgICAqIEhpZGUvc2hvdyB0cmFuc2l0IGxheWVyXG4gICAgICovXG4gICAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfbWFuYWdlcjogTGF5ZXJNYW5hZ2VyICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFkZFRyYW5zaXRMYXllcih0aGlzLCB7dmlzaWJsZTogdGhpcy52aXNpYmxlfSk7XG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIudG9nZ2xlTGF5ZXJWaXNpYmlsaXR5KHRoaXMsIHt2aXNpYmxlOiBjaGFuZ2VzWyd2aXNpYmxlJ10uY3VycmVudFZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBBZ21UcmFuc2l0TGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5kZWxldGVMYXllcih0aGlzKTtcbiAgICB9XG5cbn1cbiJdfQ==