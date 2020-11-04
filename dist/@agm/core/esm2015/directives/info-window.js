import * as tslib_1 from "tslib";
var AgmInfoWindow_1;
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
let infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
let AgmInfoWindow = AgmInfoWindow_1 = class AgmInfoWindow {
    constructor(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    ngOnInit() {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    }
    _registerEventListeners() {
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(() => {
            this.isOpen = false;
            this.infoWindowClose.emit();
        });
    }
    _updateOpenState() {
        this.isOpen ? this.open() : this.close();
    }
    _setInfoWindowOptions(changes) {
        let options = {};
        let optionKeys = Object.keys(changes).filter(k => AgmInfoWindow_1._infoWindowOptionsInputs.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    }
    /**
     * Opens the info window.
     */
    open() { return this._infoWindowManager.open(this); }
    /**
     * Closes the info window.
     */
    close() {
        return this._infoWindowManager.close(this).then(() => { this.infoWindowClose.emit(); });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'AgmInfoWindow-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() { this._infoWindowManager.deleteInfoWindow(this); }
};
AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmInfoWindow.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmInfoWindow.prototype, "longitude", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AgmInfoWindow.prototype, "disableAutoPan", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmInfoWindow.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmInfoWindow.prototype, "maxWidth", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmInfoWindow.prototype, "isOpen", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmInfoWindow.prototype, "infoWindowClose", void 0);
AgmInfoWindow = AgmInfoWindow_1 = tslib_1.__decorate([
    Component({
        selector: 'agm-info-window',
        template: `<div class='agm-info-window-content'>
      <ng-content></ng-content>
    </div>
  `
    }),
    tslib_1.__metadata("design:paramtypes", [InfoWindowManager, ElementRef])
], AgmInfoWindow);
export { AgmInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUUvSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUk3RSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFRSCxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYTtJQTBEeEIsWUFBb0Isa0JBQXFDLEVBQVUsR0FBZTtRQUE5RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQWRsRjs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxvQkFBZSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR2pFLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNsQyxRQUFHLEdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRW1DLENBQUM7SUFFdEYsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQkFBZ0I7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akQxRTtJQUFSLEtBQUssRUFBRTs7K0NBQWtCO0FBTWpCO0lBQVIsS0FBSyxFQUFFOztnREFBbUI7QUFNbEI7SUFBUixLQUFLLEVBQUU7O3FEQUF5QjtBQVF4QjtJQUFSLEtBQUssRUFBRTs7NkNBQWdCO0FBT2Y7SUFBUixLQUFLLEVBQUU7OytDQUFrQjtBQWVqQjtJQUFSLEtBQUssRUFBRTs7NkNBQWdCO0FBS2Q7SUFBVCxNQUFNLEVBQUU7c0NBQWtCLFlBQVk7c0RBQWtDO0FBcEQ5RCxhQUFhO0lBUHpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsUUFBUSxFQUFFOzs7R0FHVDtLQUNGLENBQUM7NkNBMkR3QyxpQkFBaUIsRUFBZSxVQUFVO0dBMUR2RSxhQUFhLENBNkh6QjtTQTdIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXInO1xuXG5pbXBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuL21hcmtlcic7XG5cbmxldCBpbmZvV2luZG93SWQgPSAwO1xuXG4vKipcbiAqIEFnbUluZm9XaW5kb3cgcmVuZGVycyBhIGluZm8gd2luZG93IGluc2lkZSBhIHtAbGluayBBZ21NYXJrZXJ9IG9yIHN0YW5kYWxvbmUuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cbiAqICAgICAgICA8YWdtLWluZm8td2luZG93IFtkaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XG4gKiAgICAgICAgICBIaSwgdGhpcyBpcyB0aGUgY29udGVudCBvZiB0aGUgPHN0cm9uZz5pbmZvIHdpbmRvdzwvc3Ryb25nPlxuICogICAgICAgIDwvYWdtLWluZm8td2luZG93PlxuICogICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZ20taW5mby13aW5kb3cnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2FnbS1pbmZvLXdpbmRvdy1jb250ZW50Jz5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWdtSW5mb1dpbmRvdyBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQge1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdyAob25seSB1c2VmdWxsIGlmIHlvdSB1c2UgaXQgb3VzaWRlIG9mIGEge0BsaW5rXG4gICAqIEFnbU1hcmtlcn0pLlxuICAgKi9cbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cgKG9ubHkgdXNlZnVsbCBpZiB5b3UgdXNlIGl0IG91c2lkZSBvZiBhIHtAbGlua1xuICAgKiBBZ21NYXJrZXJ9KS5cbiAgICovXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGF1dG8tcGFuIG9uIG9wZW4uIEJ5IGRlZmF1bHQsIHRoZSBpbmZvIHdpbmRvdyB3aWxsIHBhbiB0aGUgbWFwIHNvIHRoYXQgaXQgaXMgZnVsbHlcbiAgICogdmlzaWJsZSB3aGVuIGl0IG9wZW5zLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZUF1dG9QYW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFsbCBJbmZvV2luZG93cyBhcmUgZGlzcGxheWVkIG9uIHRoZSBtYXAgaW4gb3JkZXIgb2YgdGhlaXIgekluZGV4LCB3aXRoIGhpZ2hlciB2YWx1ZXNcbiAgICogZGlzcGxheWluZyBpbiBmcm9udCBvZiBJbmZvV2luZG93cyB3aXRoIGxvd2VyIHZhbHVlcy4gQnkgZGVmYXVsdCwgSW5mb1dpbmRvd3MgYXJlIGRpc3BsYXllZFxuICAgKiBhY2NvcmRpbmcgdG8gdGhlaXIgbGF0aXR1ZGUsIHdpdGggSW5mb1dpbmRvd3Mgb2YgbG93ZXIgbGF0aXR1ZGVzIGFwcGVhcmluZyBpbiBmcm9udCBvZlxuICAgKiBJbmZvV2luZG93cyBhdCBoaWdoZXIgbGF0aXR1ZGVzLiBJbmZvV2luZG93cyBhcmUgYWx3YXlzIGRpc3BsYXllZCBpbiBmcm9udCBvZiBtYXJrZXJzLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE1heGltdW0gd2lkdGggb2YgdGhlIGluZm93aW5kb3csIHJlZ2FyZGxlc3Mgb2YgY29udGVudCdzIHdpZHRoLiBUaGlzIHZhbHVlIGlzIG9ubHkgY29uc2lkZXJlZFxuICAgKiBpZiBpdCBpcyBzZXQgYmVmb3JlIGEgY2FsbCB0byBvcGVuLiBUbyBjaGFuZ2UgdGhlIG1heGltdW0gd2lkdGggd2hlbiBjaGFuZ2luZyBjb250ZW50LCBjYWxsXG4gICAqIGNsb3NlLCB1cGRhdGUgbWF4V2lkdGgsIGFuZCB0aGVuIG9wZW4uXG4gICAqL1xuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBIb2xkcyB0aGUgbWFya2VyIHRoYXQgaXMgdGhlIGhvc3Qgb2YgdGhlIGluZm8gd2luZG93IChpZiBhdmFpbGFibGUpXG4gICAqL1xuICBob3N0TWFya2VyOiBBZ21NYXJrZXI7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHRoZSBuYXRpdmUgZWxlbWVudCB0aGF0IGlzIHVzZWQgZm9yIHRoZSBpbmZvIHdpbmRvdyBjb250ZW50LlxuICAgKi9cbiAgY29udGVudDogTm9kZTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgb3BlbiBzdGF0ZSBmb3IgdGhlIEluZm9XaW5kb3cuIFlvdSBjYW4gYWxzbyBjYWxsIHRoZSBvcGVuKCkgYW5kIGNsb3NlKCkgbWV0aG9kcy5cbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBpbmZvIHdpbmRvdyBpcyBjbG9zZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgaW5mb1dpbmRvd0Nsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2luZm9XaW5kb3dPcHRpb25zSW5wdXRzOiBzdHJpbmdbXSA9IFsnZGlzYWJsZUF1dG9QYW4nLCAnbWF4V2lkdGgnXTtcbiAgcHJpdmF0ZSBfaW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAoaW5mb1dpbmRvd0lkKyspLnRvU3RyaW5nKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb1dpbmRvd01hbmFnZXI6IEluZm9XaW5kb3dNYW5hZ2VyLCBwcml2YXRlIF9lbDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20taW5mby13aW5kb3ctY29udGVudCcpO1xuICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmFkZEluZm9XaW5kb3codGhpcyk7XG4gICAgdGhpcy5faW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgaWYgKCF0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSAmJiB0eXBlb2YgdGhpcy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgdHlwZW9mIHRoaXMubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0UG9zaXRpb24odGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd6SW5kZXgnXSkge1xuICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0WkluZGV4KHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaXNPcGVuJ10pIHtcbiAgICAgIHRoaXMuX3VwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdjbG9zZWNsaWNrJywgdGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVPcGVuU3RhdGUoKSB7XG4gICAgdGhpcy5pc09wZW4gPyB0aGlzLm9wZW4oKSA6IHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEluZm9XaW5kb3dPcHRpb25zKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgbGV0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBsZXQgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihcbiAgICAgICAgayA9PiBBZ21JbmZvV2luZG93Ll9pbmZvV2luZG93T3B0aW9uc0lucHV0cy5pbmRleE9mKGspICE9PSAtMSk7XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChrKSA9PiB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBvcGVuKCk6IFByb21pc2U8dm9pZD4geyByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIub3Blbih0aGlzKTsgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmNsb3NlKHRoaXMpLnRoZW4oKCkgPT4geyB0aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7IH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnQWdtSW5mb1dpbmRvdy0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmRlbGV0ZUluZm9XaW5kb3codGhpcyk7IH1cbn1cbiJdfQ==