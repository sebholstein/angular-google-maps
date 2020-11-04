import { __decorate, __metadata, __param } from 'tslib';
import { EventEmitter, Input, Output, ViewChild, ElementRef, ViewContainerRef, ContentChild, TemplateRef, Component, Optional, Host, SkipSelf, NgModule } from '@angular/core';
import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager, MapsAPILoader } from '@agm/core';

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
__decorate([
    Input(),
    __metadata("design:type", Number)
], AgmSnazzyInfoWindow.prototype, "latitude", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AgmSnazzyInfoWindow.prototype, "longitude", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "isOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "isOpenChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "placement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "maxWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "maxHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "backgroundColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "padding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "border", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "borderRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "fontColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "fontSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "pointer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "shadow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "openOnMarkerClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "closeOnMapClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AgmSnazzyInfoWindow.prototype, "wrapperClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "closeWhenOthersOpen", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "showCloseButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AgmSnazzyInfoWindow.prototype, "panOnOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "beforeOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AgmSnazzyInfoWindow.prototype, "afterClose", void 0);
__decorate([
    ViewChild('outerWrapper', { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], AgmSnazzyInfoWindow.prototype, "_outerWrapper", void 0);
__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: false }),
    __metadata("design:type", ViewContainerRef)
], AgmSnazzyInfoWindow.prototype, "_viewContainerRef", void 0);
__decorate([
    ContentChild(TemplateRef, { static: false }),
    __metadata("design:type", TemplateRef)
], AgmSnazzyInfoWindow.prototype, "_templateRef", void 0);
AgmSnazzyInfoWindow = __decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'agm-snazzy-info-window',
        template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
    }),
    __param(0, Optional()), __param(0, Host()), __param(0, SkipSelf()),
    __metadata("design:paramtypes", [AgmMarker,
        GoogleMapsAPIWrapper,
        MarkerManager,
        MapsAPILoader])
], AgmSnazzyInfoWindow);

let AgmSnazzyInfoWindowModule = class AgmSnazzyInfoWindowModule {
};
AgmSnazzyInfoWindowModule = __decorate([
    NgModule({
        declarations: [AgmSnazzyInfoWindow],
        exports: [AgmSnazzyInfoWindow],
    })
], AgmSnazzyInfoWindowModule);

export { AgmSnazzyInfoWindow, AgmSnazzyInfoWindowModule };
//# sourceMappingURL=agm-snazzy-info-window.js.map
