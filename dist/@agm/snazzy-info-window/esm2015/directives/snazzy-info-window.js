import * as tslib_1 from "tslib";
import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
let AgmSnazzyInfoWindow = class AgmSnazzyInfoWindow {
    constructor(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    ngOnChanges(changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    }
    /**
     * @internal
     */
    ngAfterViewInit() {
        const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(() => require('snazzy-info-window'))
            .then((module) => Promise.all([module, m, this._wrapper.getNativeMap()]))
            .then((elems) => {
            const options = {
                map: elems[2],
                content: '',
                placement: this.placement,
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
                backgroundColor: this.backgroundColor,
                padding: this.padding,
                border: this.border,
                borderRadius: this.borderRadius,
                fontColor: this.fontColor,
                pointer: this.pointer,
                shadow: this.shadow,
                closeOnMapClick: this.closeOnMapClick,
                openOnMarkerClick: this.openOnMarkerClick,
                closeWhenOthersOpen: this.closeWhenOthersOpen,
                showCloseButton: this.showCloseButton,
                panOnOpen: this.panOnOpen,
                wrapperClass: this.wrapperClass,
                callbacks: {
                    beforeOpen: () => {
                        this._createViewContent();
                        this.beforeOpen.emit();
                    },
                    afterOpen: () => {
                        this.isOpenChange.emit(this.openStatus());
                    },
                    afterClose: () => {
                        this.afterClose.emit();
                        this.isOpenChange.emit(this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: this.latitude,
                    lng: this.longitude,
                };
            }
            this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(() => {
            if (this.isOpen) {
                this._openInfoWindow();
            }
        });
    }
    _openInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._createViewContent();
            this._nativeSnazzyInfoWindow.open();
        });
    }
    _closeInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._nativeSnazzyInfoWindow.close();
        });
    }
    _createViewContent() {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(() => {
            evr.detectChanges();
        });
    }
    _updatePosition() {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    }
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus() {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmSnazzyInfoWindow.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], AgmSnazzyInfoWindow.prototype, "longitude", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "isOpen", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "isOpenChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "placement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "maxWidth", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "maxHeight", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "padding", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "border", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "borderRadius", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "fontColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "fontSize", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "pointer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "shadow", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "openOnMarkerClick", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "closeOnMapClick", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "wrapperClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "closeWhenOthersOpen", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "showCloseButton", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "panOnOpen", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "beforeOpen", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "afterClose", void 0);
tslib_1.__decorate([
    ViewChild('outerWrapper', { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], AgmSnazzyInfoWindow.prototype, "_outerWrapper", void 0);
tslib_1.__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: false }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], AgmSnazzyInfoWindow.prototype, "_viewContainerRef", void 0);
tslib_1.__decorate([
    ContentChild(TemplateRef, { static: false }),
    tslib_1.__metadata("design:type", TemplateRef)
], AgmSnazzyInfoWindow.prototype, "_templateRef", void 0);
AgmSnazzyInfoWindow = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'agm-snazzy-info-window',
        template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Host()), tslib_1.__param(0, SkipSelf()),
    tslib_1.__metadata("design:paramtypes", [AgmMarker,
        GoogleMapsAPIWrapper,
        MarkerManager,
        MapsAPILoader])
], AgmSnazzyInfoWindow);
export { AgmSnazzyInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9zbmF6enktaW5mby13aW5kb3cvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NuYXp6eS1pbmZvLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFGLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQXdCLFFBQVEsRUFBRSxNQUFNLEVBQWlCLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3pOLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBK0k5QixZQUMwQyxPQUFrQixFQUNsRCxRQUE4QixFQUM5QixRQUF1QixFQUN2QixPQUFzQjtRQUhVLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBdEloQzs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTVFOztXQUVHO1FBQ00sY0FBUyxHQUF3QyxLQUFLLENBQUM7UUFFaEU7O1dBRUc7UUFDTSxhQUFRLEdBQW9CLEdBQUcsQ0FBQztRQUV6Qzs7V0FFRztRQUNNLGNBQVMsR0FBb0IsR0FBRyxDQUFDO1FBOEMxQzs7O1dBR0c7UUFDTSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFbEM7OztXQUdHO1FBQ00sb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFRaEM7O1dBRUc7UUFDTSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFckM7O1dBRUc7UUFDTSxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7O1dBRUc7UUFDTyxlQUFVLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFcEU7O1dBRUc7UUFDTyxlQUFVLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFrQjFELGlDQUE0QixHQUF3QixJQUFJLENBQUM7SUFPaEUsQ0FBQztJQUVKOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7YUFBTSxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQzdFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckYsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2FBQ3BELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUN6QyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQVE7Z0JBQ25CLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUM3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixTQUFTLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO29CQUNELFVBQVUsRUFBRSxHQUFHLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzVDLENBQUM7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNwQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsUUFBUSxHQUFHO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztpQkFDcEIsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLGVBQWU7UUFDdkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsa0JBQWtCO1FBQzFCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsT0FBTztTQUNSO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUUsMkNBQTJDO1FBQzNDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsZUFBZTtRQUN2QixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1lBQ3ZDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUE1UVU7SUFBUixLQUFLLEVBQUU7O3FEQUFrQjtBQU1qQjtJQUFSLEtBQUssRUFBRTs7c0RBQW1CO0FBS2xCO0lBQVIsS0FBSyxFQUFFOzttREFBZ0I7QUFLZDtJQUFULE1BQU0sRUFBRTtzQ0FBZSxZQUFZO3lEQUF3QztBQUtuRTtJQUFSLEtBQUssRUFBRTs7c0RBQXdEO0FBS3ZEO0lBQVIsS0FBSyxFQUFFOztxREFBaUM7QUFLaEM7SUFBUixLQUFLLEVBQUU7O3NEQUFrQztBQUtqQztJQUFSLEtBQUssRUFBRTs7NERBQXlCO0FBS3hCO0lBQVIsS0FBSyxFQUFFOztvREFBaUI7QUFNaEI7SUFBUixLQUFLLEVBQUU7O21EQUFrRDtBQUtqRDtJQUFSLEtBQUssRUFBRTs7eURBQXNCO0FBS3JCO0lBQVIsS0FBSyxFQUFFOztzREFBbUI7QUFLbEI7SUFBUixLQUFLLEVBQUU7O3FEQUFrQjtBQU9qQjtJQUFSLEtBQUssRUFBRTs7b0RBQTJCO0FBTTFCO0lBQVIsS0FBSyxFQUFFOzttREFBMEc7QUFNekc7SUFBUixLQUFLLEVBQUU7OzhEQUEwQjtBQU16QjtJQUFSLEtBQUssRUFBRTs7NERBQXdCO0FBTXZCO0lBQVIsS0FBSyxFQUFFOzt5REFBc0I7QUFLckI7SUFBUixLQUFLLEVBQUU7O2dFQUE2QjtBQUs1QjtJQUFSLEtBQUssRUFBRTs7NERBQXdCO0FBS3ZCO0lBQVIsS0FBSyxFQUFFOztzREFBa0I7QUFLaEI7SUFBVCxNQUFNLEVBQUU7c0NBQWEsWUFBWTt1REFBa0M7QUFLMUQ7SUFBVCxNQUFNLEVBQUU7c0NBQWEsWUFBWTt1REFBa0M7QUFLTjtJQUE3RCxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7c0NBQWdCLFVBQVU7MERBQUM7QUFLbkI7SUFBcEUsU0FBUyxDQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7c0NBQW9CLGdCQUFnQjs4REFBQztBQUs3RDtJQUEzQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO3NDQUFlLFdBQVc7eURBQU07QUExSWhFLG1CQUFtQjtJQUwvQixTQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxRQUFRLEVBQUUsOEVBQThFO0tBQ3pGLENBQUM7SUFpSkcsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxJQUFJLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQUFrQixTQUFTO1FBQ3hDLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2QsYUFBYTtHQW5KckIsbUJBQW1CLENBaVIvQjtTQWpSWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21NYXJrZXIsIEdvb2dsZU1hcHNBUElXcmFwcGVyLCBNYXBzQVBJTG9hZGVyLCBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgU2tpcFNlbGYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2FnbS1zbmF6enktaW5mby13aW5kb3cnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI291dGVyV3JhcHBlcj48ZGl2ICN2aWV3Q29udGFpbmVyPjwvZGl2PjwvZGl2PjxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21TbmF6enlJbmZvV2luZG93IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVGhlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUgd2hlcmUgdGhlIGluZm8gd2luZG93IGlzIGFuY2hvcmVkLlxuICAgKiBUaGUgb2Zmc2V0IHdpbGwgZGVmYXVsdCB0byAwcHggd2hlbiB1c2luZyB0aGlzIG9wdGlvbi4gT25seSByZXF1aXJlZC91c2VkIGlmIHlvdSBhcmUgbm90IHVzaW5nIGEgYWdtLW1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpIGxhdGl0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsb25naXR1ZGUgd2hlcmUgdGhlIGluZm8gd2luZG93IGlzIGFuY2hvcmVkLlxuICAgKiBUaGUgb2Zmc2V0IHdpbGwgZGVmYXVsdCB0byAwcHggd2hlbiB1c2luZyB0aGlzIG9wdGlvbi4gT25seSByZXF1aXJlZC91c2VkIGlmIHlvdSBhcmUgbm90IHVzaW5nIGEgYWdtLW1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBvcGVuIHN0YXR1cyBvZiB0aGUgc25henp5IGluZm8gd2luZG93LlxuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIG9wZW4gc3RhdHVzIGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIENob29zZSB3aGVyZSB5b3Ugd2FudCB0aGUgaW5mbyB3aW5kb3cgdG8gYmUgZGlzcGxheWVkLCByZWxhdGl2ZSB0byB0aGUgbWFya2VyLlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyA9ICd0b3AnO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4IHdpZHRoIGluIHBpeGVscyBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4IGhlaWdodCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyMDA7XG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvciB0byB1c2UgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBwYWRkaW5nIHNpemUgYXJvdW5kIHRoZSBjb250ZW50IG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIHBhZGRpbmc6IHN0cmluZztcblxuICAvKipcbiAgICogQSBjdXN0b20gYm9yZGVyIGFyb3VuZCB0aGUgaW5mbyB3aW5kb3cuIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgYm9yZGVyLlxuICAgKiBUaGUgdW5pdHMgdXNlZCBmb3IgYm9yZGVyIHNob3VsZCBiZSB0aGUgc2FtZSBhcyBwb2ludGVyLlxuICAgKi9cbiAgQElucHV0KCkgYm9yZGVyOiB7d2lkdGg6IHN0cmluZzsgY29sb3I6IHN0cmluZ30gfCBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBDU1MgYm9yZGVyIHJhZGl1cyBwcm9wZXJ0eSB0byBzcGVjaWZ5IHRoZSByb3VuZGVkIGNvcm5lcnMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgQElucHV0KCkgYm9yZGVyUmFkaXVzOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBmb250IGNvbG9yIHRvIHVzZSBmb3IgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBib2R5IG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGZvbnRDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBzaXplIHRvIHVzZSBmb3IgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBib2R5IG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGZvbnRTaXplOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIHBvaW50ZXIgZnJvbSB0aGUgaW5mbyB3aW5kb3cgdG8gdGhlIG1hcmtlci5cbiAgICogU2V0IHRvIGZhbHNlIHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBwb2ludGVyLlxuICAgKiBUaGUgdW5pdHMgdXNlZCBmb3IgcG9pbnRlciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgYm9yZGVyLlxuICAgKi9cbiAgQElucHV0KCkgcG9pbnRlcjogc3RyaW5nIHwgYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIENTUyBwcm9wZXJ0aWVzIGZvciB0aGUgc2hhZG93IG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICogU2V0IHRvIGZhbHNlIHRvIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBzaGFkb3cuXG4gICAqL1xuICBASW5wdXQoKSBzaGFkb3c6IGJvb2xlYW4gfCB7aD86IHN0cmluZywgdj86IHN0cmluZywgYmx1cjogc3RyaW5nLCBzcHJlYWQ6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyLCBjb2xvcjogc3RyaW5nfTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBvcGVuIHdoZW4gdGhlIG1hcmtlciBpcyBjbGlja2VkLlxuICAgKiBBbiBpbnRlcm5hbCBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIG9wZW4oKSBtZXRob2QuXG4gICAqL1xuICBASW5wdXQoKSBvcGVuT25NYXJrZXJDbGljayA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgY2xvc2Ugd2hlbiB0aGUgbWFwIGlzIGNsaWNrZWQuIEFuIGludGVybmFsIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBHb29nbGUgTWFwcyBjbGljayBldmVudCB3aGljaCBjYWxscyB0aGUgY2xvc2UoKSBtZXRob2QuXG4gICAqIFRoaXMgd2lsbCBub3QgYWN0aXZhdGUgb24gdGhlIEdvb2dsZSBNYXBzIGRyYWcgZXZlbnQgd2hlbiB0aGUgdXNlciBpcyBwYW5uaW5nIHRoZSBtYXAuXG4gICAqL1xuICBASW5wdXQoKSBjbG9zZU9uTWFwQ2xpY2sgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBDU1MgY2xhc3MgdG8gYXNzaWduIHRvIHRoZSB3cmFwcGVyIGNvbnRhaW5lciBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqIENhbiBiZSB1c2VkIGZvciBhcHBseWluZyBjdXN0b20gQ1NTIHRvIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGNsb3NlIHdoZW4gYW55IG90aGVyIFNuYXp6eSBJbmZvIFdpbmRvdyBpcyBvcGVuZWQuXG4gICAqL1xuICBASW5wdXQoKSBjbG9zZVdoZW5PdGhlcnNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgc2hvdyBhIGNsb3NlIGJ1dHRvbi5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dDbG9zZUJ1dHRvbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgYmUgcGFubmVkIGludG8gdmlldyB3aGVuIG9wZW5lZC5cbiAgICovXG4gIEBJbnB1dCgpIHBhbk9uT3BlbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGJlZm9yZSB0aGUgaW5mbyB3aW5kb3cgb3BlbnMuXG4gICAqL1xuICBAT3V0cHV0KCkgYmVmb3JlT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IGNsb3Nlcy5cbiAgICovXG4gIEBPdXRwdXQoKSBhZnRlckNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnb3V0ZXJXcmFwcGVyJywge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2V9KSBfb3V0ZXJXcmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3ZpZXdDb250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZX0pIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IGZhbHNlfSkgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHByb3RlY3RlZCBfbmF0aXZlU25henp5SW5mb1dpbmRvdzogYW55O1xuICBwcm90ZWN0ZWQgX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZDogUHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9tYXJrZXI6IEFnbU1hcmtlcixcbiAgICBwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcixcbiAgICBwcml2YXRlIF9tYW5hZ2VyOiBNYXJrZXJNYW5hZ2VyLFxuICAgIHByaXZhdGUgX2xvYWRlcjogTWFwc0FQSUxvYWRlcixcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgnaXNPcGVuJyBpbiBjaGFuZ2VzICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuSW5mb1dpbmRvdygpO1xuICAgIH0gZWxzZSBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiAhdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuX2Nsb3NlSW5mb1dpbmRvdygpO1xuICAgIH1cbiAgICBpZiAoKCdsYXRpdHVkZScgaW4gY2hhbmdlcyB8fCAnbG9uZ2l0dWRlJyBpbiBjaGFuZ2VzKSAmJiB0aGlzLl9tYXJrZXIgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgbSA9IHRoaXMuX21hbmFnZXIgIT0gbnVsbCA/IHRoaXMuX21hbmFnZXIuZ2V0TmF0aXZlTWFya2VyKHRoaXMuX21hcmtlcikgOiBudWxsO1xuICAgIHRoaXMuX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZCA9IHRoaXMuX2xvYWRlci5sb2FkKClcbiAgICAgIC50aGVuKCgpID0+IHJlcXVpcmUoJ3NuYXp6eS1pbmZvLXdpbmRvdycpKVxuICAgICAgLnRoZW4oKG1vZHVsZTogYW55KSA9PiBQcm9taXNlLmFsbChbbW9kdWxlLCBtLCB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpXSkpXG4gICAgICAudGhlbigoZWxlbXMpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogYW55ID0ge1xuICAgICAgICAgIG1hcDogZWxlbXNbMl0sXG4gICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICBtYXhXaWR0aDogdGhpcy5tYXhXaWR0aCxcbiAgICAgICAgICBtYXhIZWlnaHQ6IHRoaXMubWF4SGVpZ2h0LFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgcGFkZGluZzogdGhpcy5wYWRkaW5nLFxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLmJvcmRlclJhZGl1cyxcbiAgICAgICAgICBmb250Q29sb3I6IHRoaXMuZm9udENvbG9yLFxuICAgICAgICAgIHBvaW50ZXI6IHRoaXMucG9pbnRlcixcbiAgICAgICAgICBzaGFkb3c6IHRoaXMuc2hhZG93LFxuICAgICAgICAgIGNsb3NlT25NYXBDbGljazogdGhpcy5jbG9zZU9uTWFwQ2xpY2ssXG4gICAgICAgICAgb3Blbk9uTWFya2VyQ2xpY2s6IHRoaXMub3Blbk9uTWFya2VyQ2xpY2ssXG4gICAgICAgICAgY2xvc2VXaGVuT3RoZXJzT3BlbjogdGhpcy5jbG9zZVdoZW5PdGhlcnNPcGVuLFxuICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdGhpcy5zaG93Q2xvc2VCdXR0b24sXG4gICAgICAgICAgcGFuT25PcGVuOiB0aGlzLnBhbk9uT3BlbixcbiAgICAgICAgICB3cmFwcGVyQ2xhc3M6IHRoaXMud3JhcHBlckNsYXNzLFxuICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgYmVmb3JlT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVWaWV3Q29udGVudCgpO1xuICAgICAgICAgICAgICB0aGlzLmJlZm9yZU9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMub3BlblN0YXR1cygpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlckNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYWZ0ZXJDbG9zZS5lbWl0KCk7XG4gICAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5vcGVuU3RhdHVzKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZWxlbXNbMV0gIT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMubWFya2VyID0gZWxlbXNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ID0gbmV3IGVsZW1zWzBdKG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgIHRoaXMuX29wZW5JbmZvV2luZG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vcGVuSW5mb1dpbmRvdygpIHtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9jcmVhdGVWaWV3Q29udGVudCgpO1xuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5vcGVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Nsb3NlSW5mb1dpbmRvdygpIHtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVZpZXdDb250ZW50KCkge1xuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBldnIgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5zZXRDb250ZW50KHRoaXMuX291dGVyV3JhcHBlci5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyB3ZSBoYXZlIHRvIHJ1biB0aGlzIGluIGEgc2VwYXJhdGUgY3ljbGUuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBldnIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91cGRhdGVQb3NpdGlvbigpIHtcbiAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LnNldFBvc2l0aW9uKHtcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIFNuYXp6eSBJbmZvIFdpbmRvdyBpcyBpbml0aWFsaXplZCBhbmQgb3Blbi5cbiAgICovXG4gIG9wZW5TdGF0dXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgJiYgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5pc09wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93KSB7XG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==