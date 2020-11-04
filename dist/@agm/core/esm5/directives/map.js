import * as tslib_1 from "tslib";
import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID } from '@angular/core';
import { FitBoundsService } from '../services/fit-bounds';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { LayerManager } from '../services/managers/layer-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
import { RectangleManager } from '../services/managers/rectangle-manager';
import { DataLayerManager } from './../services/managers/data-layer-manager';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap = /** @class */ (function () {
    function AgmMap(_elem, _mapsWrapper, _platformId, _fitBoundsService, _zone) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._platformId = _platformId;
        this._fitBoundsService = _fitBoundsService;
        this._zone = _zone;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * Sets the viewport to contain the given bounds.
         * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
         */
        this.fitBounds = false;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * The initial enabled/disabled state of the Pan control.
         */
        this.panControl = false;
        /**
         * The initial enabled/disabled state of the Rotate control.
         */
        this.rotateControl = false;
        /**
         * The initial enabled/disabled state of the Fullscreen control.
         */
        this.fullscreenControl = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = 'roadmap';
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * A map icon represents a point of interest, also known as a POI.
         * When map icons are clickable by default, an info window is displayed.
         * When this property is set to false, the info window will not be shown but the click event
         * will still fire
         */
        this.showDefaultInfoWindow = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = 'auto';
        /**
         * Controls the automatic switching behavior for the angle of incidence of
         * the map. The only allowed values are 0 and 45. The value 0 causes the map
         * to always use a 0° overhead view regardless of the zoom level and
         * viewport. The value 45 causes the tilt angle to automatically switch to
         * 45 whenever 45° imagery is available for the current zoom level and
         * viewport, and switch back to 0 whenever 45° imagery is not available
         * (this is the default behavior). 45° imagery is only available for
         * satellite and hybrid map types, within some locations, and at some zoom
         * levels. Note: getTilt returns the current tilt angle, not the value
         * specified by this option. Because getTilt and this option refer to
         * different things, do not bind() the tilt property; doing so may yield
         * unpredictable effects. (Default of AGM is 0 (disabled). Enable it with value 45.)
         */
        this.tilt = 0;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the mapTypeId property changes.
         */
        this.mapTypeIdChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new EventEmitter();
        /**
         * This event is fired when the visible tiles have finished loading.
         */
        this.tilesLoaded = new EventEmitter();
    }
    AgmMap_1 = AgmMap;
    /** @internal */
    AgmMap.prototype.ngOnInit = function () {
        if (isPlatformServer(this._platformId)) {
            // The code is running on the server, do nothing
            return;
        }
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    };
    AgmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            controlSize: this.controlSize,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            streetViewControl: this.streetViewControl,
            streetViewControlOptions: this.streetViewControlOptions,
            scaleControl: this.scaleControl,
            scaleControlOptions: this.scaleControlOptions,
            mapTypeControl: this.mapTypeControl,
            mapTypeControlOptions: this.mapTypeControlOptions,
            panControl: this.panControl,
            panControlOptions: this.panControlOptions,
            rotateControl: this.rotateControl,
            rotateControlOptions: this.rotateControlOptions,
            fullscreenControl: this.fullscreenControl,
            fullscreenControlOptions: this.fullscreenControlOptions,
            mapTypeId: this.mapTypeId,
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling,
            tilt: this.tilt,
            restriction: this.restriction,
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) { return _this.mapReady.emit(map); });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleMapTypeIdChange();
        this._handleTilesLoadedEvent();
        this._handleIdleEvent();
    };
    /** @internal */
    AgmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        // remove all listeners from the map instance
        this._mapsWrapper.clearInstanceListeners();
        if (this._fitBoundsSubscription) {
            this._fitBoundsSubscription.unsubscribe();
        }
    };
    /* @internal */
    AgmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AgmMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap_1._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmMap.prototype.triggerResize = function (recenter) {
        var _this = this;
        if (recenter === void 0) { recenter = true; }
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
                    if (recenter) {
                        _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                    }
                    resolve();
                });
            });
        });
    };
    AgmMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            !changes['fitBounds']) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if ('fitBounds' in changes) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    };
    AgmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    AgmMap.prototype._fitBounds = function () {
        switch (this.fitBounds) {
            case true:
                this._subscribeToFitBoundsUpdates();
                break;
            case false:
                if (this._fitBoundsSubscription) {
                    this._fitBoundsSubscription.unsubscribe();
                }
                break;
            default:
                this._updateBounds(this.fitBounds, this.fitBoundsPadding);
        }
    };
    AgmMap.prototype._subscribeToFitBoundsUpdates = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._fitBoundsSubscription = _this._fitBoundsService.getBounds$().subscribe(function (b) {
                _this._zone.run(function () { return _this._updateBounds(b, _this.fitBoundsPadding); });
            });
        });
    };
    AgmMap.prototype._updateBounds = function (bounds, padding) {
        if (!bounds) {
            return;
        }
        if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
            var newBounds = new google.maps.LatLngBounds();
            newBounds.union(bounds);
            bounds = newBounds;
        }
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(bounds, padding);
            return;
        }
        this._mapsWrapper.fitBounds(bounds, padding);
    };
    AgmMap.prototype._isLatLngBoundsLiteral = function (bounds) {
        return bounds != null && bounds.extend === undefined;
    };
    AgmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapTypeIdChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(function () {
            _this._mapsWrapper.getMapTypeId().then(function (mapTypeId) { _this.mapTypeIdChange.emit(mapTypeId); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleTilesLoadedEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(function () { return _this.tilesLoaded.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = {
                    coords: {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    },
                    placeId: event.placeId,
                };
                // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
                if (value.placeId && !_this.showDefaultInfoWindow) {
                    event.stop();
                }
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    var AgmMap_1;
    /**
     * Map option attributes that can change over time
     */
    AgmMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
        'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
        'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
        'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
        'mapTypeId', 'clickableIcons', 'gestureHandling', 'tilt', 'restriction',
    ];
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "zoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMap.prototype, "minZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMap.prototype, "maxZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmMap.prototype, "controlSize", void 0);
    tslib_1.__decorate([
        Input('mapDraggable'),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "draggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "disableDoubleClickZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "disableDefaultUI", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "scrollwheel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMap.prototype, "backgroundColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMap.prototype, "draggableCursor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMap.prototype, "draggingCursor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "keyboardShortcuts", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AgmMap.prototype, "zoomControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "zoomControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AgmMap.prototype, "styles", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "usePanning", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AgmMap.prototype, "streetViewControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "streetViewControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "fitBounds", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "fitBoundsPadding", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "scaleControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "scaleControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "mapTypeControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "mapTypeControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "panControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "panControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "rotateControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "rotateControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "fullscreenControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "fullscreenControlOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMap.prototype, "mapTypeId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "clickableIcons", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "showDefaultInfoWindow", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AgmMap.prototype, "gestureHandling", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "tilt", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmMap.prototype, "restriction", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapRightClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapDblClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "centerChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "boundsChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapTypeIdChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "idle", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "zoomChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "mapReady", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmMap.prototype, "tilesLoaded", void 0);
    AgmMap = AgmMap_1 = tslib_1.__decorate([
        Component({
            selector: 'agm-map',
            providers: [
                CircleManager,
                DataLayerManager,
                DataLayerManager,
                FitBoundsService,
                GoogleMapsAPIWrapper,
                InfoWindowManager,
                KmlLayerManager,
                LayerManager,
                MarkerManager,
                PolygonManager,
                PolylineManager,
                RectangleManager,
            ],
            host: {
                // todo: deprecated - we will remove it with the next version
                '[class.sebm-google-map-container]': 'true',
            },
            template: "\n              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n              <div class='agm-map-content'>\n                <ng-content></ng-content>\n              </div>\n  ",
            styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "]
        }),
        tslib_1.__param(2, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            GoogleMapsAPIWrapper,
            Object,
            FitBoundsService,
            NgZone])
    ], AgmMap);
    return AgmMap;
}());
export { AgmMap };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZ0MsTUFBTSxFQUFFLFdBQVcsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJN0osT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFNM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFJM0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFxQ0g7SUEwU0UsZ0JBQ1UsS0FBaUIsRUFDakIsWUFBa0MsRUFDYixXQUFtQixFQUN0QyxpQkFBbUMsRUFDckMsS0FBYTtRQUpiLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsaUJBQVksR0FB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WUFDOUIsTUFBTTtPQS9TWixNQUFNLENBeWpCbEI7SUFBRCxhQUFDO0NBQUEsQUF6akJELElBeWpCQztTQXpqQlksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBQTEFURk9STV9JRCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9tYXAtdHlwZXMnO1xuaW1wb3J0IHsgRml0Qm91bmRzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQge1xuICBGdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMsIExhdExuZywgTGF0TG5nQm91bmRzLCBMYXRMbmdCb3VuZHNMaXRlcmFsLCBMYXRMbmdMaXRlcmFsLFxuICBNYXBSZXN0cmljdGlvbiwgTWFwVHlwZUNvbnRyb2xPcHRpb25zLCBNYXBUeXBlSWQsIE1hcFR5cGVTdHlsZSwgUGFkZGluZywgUGFuQ29udHJvbE9wdGlvbnMsXG4gIFJvdGF0ZUNvbnRyb2xPcHRpb25zLCBTY2FsZUNvbnRyb2xPcHRpb25zLCBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMsIFpvb21Db250cm9sT3B0aW9ucyxcbn0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcbmltcG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlcic7XG5pbXBvcnQgeyBMYXllck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9sYXllci1tYW5hZ2VyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmltcG9ydCB7IFJlY3RhbmdsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlcic7XG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG4vKipcbiAqIEFnbU1hcCByZW5kZXJzIGEgR29vZ2xlIE1hcC5cbiAqICoqSW1wb3J0YW50IG5vdGUqKjogVG8gYmUgYWJsZSBzZWUgYSBtYXAgaW4gdGhlIGJyb3dzZXIsIHlvdSBoYXZlIHRvIGRlZmluZSBhIGhlaWdodCBmb3IgdGhlXG4gKiBlbGVtZW50IGBhZ20tbWFwYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICBhZ20tbWFwIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZ20tbWFwJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ2lyY2xlTWFuYWdlcixcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLFxuICAgIERhdGFMYXllck1hbmFnZXIsXG4gICAgRml0Qm91bmRzU2VydmljZSxcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlcixcbiAgICBJbmZvV2luZG93TWFuYWdlcixcbiAgICBLbWxMYXllck1hbmFnZXIsXG4gICAgTGF5ZXJNYW5hZ2VyLFxuICAgIE1hcmtlck1hbmFnZXIsXG4gICAgUG9seWdvbk1hbmFnZXIsXG4gICAgUG9seWxpbmVNYW5hZ2VyLFxuICAgIFJlY3RhbmdsZU1hbmFnZXIsXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAvLyB0b2RvOiBkZXByZWNhdGVkIC0gd2Ugd2lsbCByZW1vdmUgaXQgd2l0aCB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgJ1tjbGFzcy5zZWJtLWdvb2dsZS1tYXAtY29udGFpbmVyXSc6ICd0cnVlJyxcbiAgfSxcbiAgc3R5bGVzOiBbYFxuICAgIC5hZ20tbWFwLWNvbnRhaW5lci1pbm5lciB7XG4gICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICB9XG4gICAgLmFnbS1tYXAtY29udGVudCB7XG4gICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICBgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWdtLW1hcC1jb250YWluZXItaW5uZXIgc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lci1pbm5lcic+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnbS1tYXAtY29udGVudCc+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWdtTWFwIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGUgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICovXG4gIEBJbnB1dCgpIGxhdGl0dWRlID0gMDtcblxuICAvKipcbiAgICogVGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgem9vbSBsZXZlbCBpcyA4LlxuICAgKi9cbiAgQElucHV0KCkgem9vbSA9IDg7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbWFsIHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBhbGxvd2VkLiBXaGVuIG5vdCBwcm92aWRlZCwgbm8gcmVzdHJpY3Rpb25zIHRvIHRoZSB6b29tIGxldmVsXG4gICAqIGFyZSBlbmZvcmNlZC5cbiAgICovXG4gIEBJbnB1dCgpIG1pblpvb206IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltYWwgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGFsbG93ZWQuIFdoZW4gbm90IHByb3ZpZGVkLCBubyByZXN0cmljdGlvbnMgdG8gdGhlIHpvb20gbGV2ZWxcbiAgICogYXJlIGVuZm9yY2VkLlxuICAgKi9cbiAgQElucHV0KCkgbWF4Wm9vbTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbCBzaXplIGZvciB0aGUgZGVmYXVsdCBtYXAgY29udHJvbHMuIE9ubHkgZ292ZXJucyB0aGUgY29udHJvbHMgbWFkZSBieSB0aGUgTWFwcyBBUEkgaXRzZWxmXG4gICAqL1xuICBASW5wdXQoKSBjb250cm9sU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBFbmFibGVzL2Rpc2FibGVzIGlmIG1hcCBpcyBkcmFnZ2FibGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWFwRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogRW5hYmxlcy9kaXNhYmxlcyB6b29tIGFuZCBjZW50ZXIgb24gZG91YmxlIGNsaWNrLiBFbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlRG91YmxlQ2xpY2tab29tID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMvZGlzYWJsZXMgYWxsIGRlZmF1bHQgVUkgb2YgdGhlIEdvb2dsZSBtYXAuIFBsZWFzZSBub3RlOiBXaGVuIHRoZSBtYXAgaXMgY3JlYXRlZCwgdGhpc1xuICAgKiB2YWx1ZSBjYW5ub3QgZ2V0IHVwZGF0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlRGVmYXVsdFVJID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIGZhbHNlLCBkaXNhYmxlcyBzY3JvbGx3aGVlbCB6b29taW5nIG9uIHRoZSBtYXAuIFRoZSBzY3JvbGx3aGVlbCBpcyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGx3aGVlbCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbG9yIHVzZWQgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBNYXAgZGl2LiBUaGlzIGNvbG9yIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRpbGVzIGhhdmUgbm90XG4gICAqIHlldCBsb2FkZWQgYXMgdGhlIHVzZXIgcGFucy4gVGhpcyBvcHRpb24gY2FuIG9ubHkgYmUgc2V0IHdoZW4gdGhlIG1hcCBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvciB1cmwgb2YgdGhlIGN1cnNvciB0byBkaXNwbGF5IHdoZW4gbW91c2luZyBvdmVyIGEgZHJhZ2dhYmxlIG1hcC4gVGhpcyBwcm9wZXJ0eSB1c2VzXG4gICAqIHRoZSBjc3MgICogY3Vyc29yIGF0dHJpYnV0ZSB0byBjaGFuZ2UgdGhlIGljb24uIEFzIHdpdGggdGhlIGNzcyBwcm9wZXJ0eSwgeW91IG11c3Qgc3BlY2lmeSBhdFxuICAgKiBsZWFzdCBvbmUgZmFsbGJhY2sgY3Vyc29yIHRoYXQgaXMgbm90IGEgVVJMLiBGb3IgZXhhbXBsZTpcbiAgICogW2RyYWdnYWJsZUN1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxuICAgKi9cbiAgQElucHV0KCkgZHJhZ2dhYmxlQ3Vyc29yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9yIHVybCBvZiB0aGUgY3Vyc29yIHRvIGRpc3BsYXkgd2hlbiB0aGUgbWFwIGlzIGJlaW5nIGRyYWdnZWQuIFRoaXMgcHJvcGVydHkgdXNlcyB0aGVcbiAgICogY3NzIGN1cnNvciBhdHRyaWJ1dGUgdG8gY2hhbmdlIHRoZSBpY29uLiBBcyB3aXRoIHRoZSBjc3MgcHJvcGVydHksIHlvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3RcbiAgICogb25lIGZhbGxiYWNrIGN1cnNvciB0aGF0IGlzIG5vdCBhIFVSTC4gRm9yIGV4YW1wbGU6XG4gICAqIFtkcmFnZ2luZ0N1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxuICAgKi9cbiAgQElucHV0KCkgZHJhZ2dpbmdDdXJzb3I6IHN0cmluZztcblxuICAvKipcbiAgICogSWYgZmFsc2UsIHByZXZlbnRzIHRoZSBtYXAgZnJvbSBiZWluZyBjb250cm9sbGVkIGJ5IHRoZSBrZXlib2FyZC4gS2V5Ym9hcmQgc2hvcnRjdXRzIGFyZVxuICAgKiBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBrZXlib2FyZFNob3J0Y3V0cyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBab29tIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSB6b29tQ29udHJvbDogYm9vbGVhbjtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIFpvb20gY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHpvb21Db250cm9sT3B0aW9uczogWm9vbUNvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBTdHlsZXMgdG8gYXBwbHkgdG8gZWFjaCBvZiB0aGUgZGVmYXVsdCBtYXAgdHlwZXMuIE5vdGUgdGhhdCBmb3IgU2F0ZWxsaXRlL0h5YnJpZCBhbmQgVGVycmFpblxuICAgKiBtb2RlcywgdGhlc2Ugc3R5bGVzIHdpbGwgb25seSBhcHBseSB0byBsYWJlbHMgYW5kIGdlb21ldHJ5LlxuICAgKi9cbiAgQElucHV0KCkgc3R5bGVzOiBNYXBUeXBlU3R5bGVbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgYW5kIHRoZSBsYXRpdHVkZSBhbmQvb3IgbG9uZ2l0dWRlIHZhbHVlcyBjaGFuZ2VzLCB0aGUgR29vZ2xlIE1hcHMgcGFuVG8gbWV0aG9kIGlzXG4gICAqIHVzZWQgdG9cbiAgICogY2VudGVyIHRoZSBtYXAuIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvcmVmZXJlbmNlI01hcFxuICAgKi9cbiAgQElucHV0KCkgdXNlUGFubmluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBTdHJlZXQgVmlldyBQZWdtYW4gY29udHJvbC5cbiAgICogVGhpcyBjb250cm9sIGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgVUksIGFuZCBzaG91bGQgYmUgc2V0IHRvIGZhbHNlIHdoZW4gZGlzcGxheWluZyBhIG1hcCB0eXBlXG4gICAqIG9uIHdoaWNoIHRoZSBTdHJlZXQgVmlldyByb2FkIG92ZXJsYXkgc2hvdWxkIG5vdCBhcHBlYXIgKGUuZy4gYSBub24tRWFydGggbWFwIHR5cGUpLlxuICAgKi9cbiAgQElucHV0KCkgc3RyZWV0Vmlld0NvbnRyb2w6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBTdHJlZXQgVmlldyBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zOiBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZpZXdwb3J0IHRvIGNvbnRhaW4gdGhlIGdpdmVuIGJvdW5kcy5cbiAgICogSWYgdGhpcyBvcHRpb24gdG8gYHRydWVgLCB0aGUgYm91bmRzIGdldCBhdXRvbWF0aWNhbGx5IGNvbXB1dGVkIGZyb20gYWxsIGVsZW1lbnRzIHRoYXQgdXNlIHRoZSB7QGxpbmsgQWdtRml0Qm91bmRzfSBkaXJlY3RpdmUuXG4gICAqL1xuICBASW5wdXQoKSBmaXRCb3VuZHM6IExhdExuZ0JvdW5kc0xpdGVyYWwgfCBMYXRMbmdCb3VuZHMgfCBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBhZGRpbmcgYW1vdW50IGZvciB0aGUgYm91bmRzLlxuICAgKi9cbiAgQElucHV0KCkgZml0Qm91bmRzUGFkZGluZzogbnVtYmVyIHwgUGFkZGluZztcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgU2NhbGUgY29udHJvbC4gVGhpcyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KCkgc2NhbGVDb250cm9sID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBzY2FsZSBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgc2NhbGVDb250cm9sT3B0aW9uczogU2NhbGVDb250cm9sT3B0aW9ucztcblxuICAvKipcbiAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWFwIHR5cGUgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIG1hcFR5cGVDb250cm9sID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBNYXAgdHlwZSBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiBNYXBUeXBlQ29udHJvbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFBhbiBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgcGFuQ29udHJvbCAgPSBmYWxzZTtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIFBhbiBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgcGFuQ29udHJvbE9wdGlvbnM6IFBhbkNvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBSb3RhdGUgY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIHJvdGF0ZUNvbnRyb2wgPSBmYWxzZTtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIFJvdGF0ZSBjb250cm9sLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlQ29udHJvbE9wdGlvbnM6IFJvdGF0ZUNvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXG4gICAqL1xuICBASW5wdXQoKSBmdWxsc2NyZWVuQ29udHJvbCAgPSBmYWxzZTtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIEZ1bGxzY3JlZW4gY29udHJvbC5cbiAgICovXG4gIEBJbnB1dCgpIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczogRnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBUaGUgbWFwIG1hcFR5cGVJZC4gRGVmYXVsdHMgdG8gJ3JvYWRtYXAnLlxuICAgKi9cbiAgQElucHV0KCkgbWFwVHlwZUlkOiAncm9hZG1hcCcgfCAnaHlicmlkJyB8ICdzYXRlbGxpdGUnIHwgJ3RlcnJhaW4nIHwgc3RyaW5nID0gJ3JvYWRtYXAnO1xuXG4gIC8qKlxuICAgKiBXaGVuIGZhbHNlLCBtYXAgaWNvbnMgYXJlIG5vdCBjbGlja2FibGUuIEEgbWFwIGljb24gcmVwcmVzZW50cyBhIHBvaW50IG9mIGludGVyZXN0LFxuICAgKiBhbHNvIGtub3duIGFzIGEgUE9JLiBCeSBkZWZhdWx0IG1hcCBpY29ucyBhcmUgY2xpY2thYmxlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2thYmxlSWNvbnMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBpY29uIHJlcHJlc2VudHMgYSBwb2ludCBvZiBpbnRlcmVzdCwgYWxzbyBrbm93biBhcyBhIFBPSS5cbiAgICogV2hlbiBtYXAgaWNvbnMgYXJlIGNsaWNrYWJsZSBieSBkZWZhdWx0LCBhbiBpbmZvIHdpbmRvdyBpcyBkaXNwbGF5ZWQuXG4gICAqIFdoZW4gdGhpcyBwcm9wZXJ0eSBpcyBzZXQgdG8gZmFsc2UsIHRoZSBpbmZvIHdpbmRvdyB3aWxsIG5vdCBiZSBzaG93biBidXQgdGhlIGNsaWNrIGV2ZW50XG4gICAqIHdpbGwgc3RpbGwgZmlyZVxuICAgKi9cbiAgQElucHV0KCkgc2hvd0RlZmF1bHRJbmZvV2luZG93ID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGhvdyBnZXN0dXJlcyBvbiB0aGUgbWFwIGFyZSBoYW5kbGVkLlxuICAgKiBBbGxvd2VkIHZhbHVlczpcbiAgICogLSAnY29vcGVyYXRpdmUnIChUd28tZmluZ2VyIHRvdWNoIGdlc3R1cmVzIHBhbiBhbmQgem9vbSB0aGUgbWFwLiBPbmUtZmluZ2VyIHRvdWNoIGdlc3R1cmVzIGFyZSBub3QgaGFuZGxlZCBieSB0aGUgbWFwLilcbiAgICogLSAnZ3JlZWR5JyAgICAgIChBbGwgdG91Y2ggZ2VzdHVyZXMgcGFuIG9yIHpvb20gdGhlIG1hcC4pXG4gICAqIC0gJ25vbmUnICAgICAgICAoVGhlIG1hcCBjYW5ub3QgYmUgcGFubmVkIG9yIHpvb21lZCBieSB1c2VyIGdlc3R1cmVzLilcbiAgICogLSAnYXV0bycgICAgICAgIFtkZWZhdWx0XSAoR2VzdHVyZSBoYW5kbGluZyBpcyBlaXRoZXIgY29vcGVyYXRpdmUgb3IgZ3JlZWR5LCBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgcGFnZSBpcyBzY3JvbGxhYmxlIG9yIG5vdC5cbiAgICovXG4gIEBJbnB1dCgpIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyB8ICdncmVlZHknIHwgJ25vbmUnIHwgJ2F1dG8nID0gJ2F1dG8nO1xuXG4gICAgLyoqXG4gICAgICogQ29udHJvbHMgdGhlIGF1dG9tYXRpYyBzd2l0Y2hpbmcgYmVoYXZpb3IgZm9yIHRoZSBhbmdsZSBvZiBpbmNpZGVuY2Ugb2ZcbiAgICAgKiB0aGUgbWFwLiBUaGUgb25seSBhbGxvd2VkIHZhbHVlcyBhcmUgMCBhbmQgNDUuIFRoZSB2YWx1ZSAwIGNhdXNlcyB0aGUgbWFwXG4gICAgICogdG8gYWx3YXlzIHVzZSBhIDDCsCBvdmVyaGVhZCB2aWV3IHJlZ2FyZGxlc3Mgb2YgdGhlIHpvb20gbGV2ZWwgYW5kXG4gICAgICogdmlld3BvcnQuIFRoZSB2YWx1ZSA0NSBjYXVzZXMgdGhlIHRpbHQgYW5nbGUgdG8gYXV0b21hdGljYWxseSBzd2l0Y2ggdG9cbiAgICAgKiA0NSB3aGVuZXZlciA0NcKwIGltYWdlcnkgaXMgYXZhaWxhYmxlIGZvciB0aGUgY3VycmVudCB6b29tIGxldmVsIGFuZFxuICAgICAqIHZpZXdwb3J0LCBhbmQgc3dpdGNoIGJhY2sgdG8gMCB3aGVuZXZlciA0NcKwIGltYWdlcnkgaXMgbm90IGF2YWlsYWJsZVxuICAgICAqICh0aGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yKS4gNDXCsCBpbWFnZXJ5IGlzIG9ubHkgYXZhaWxhYmxlIGZvclxuICAgICAqIHNhdGVsbGl0ZSBhbmQgaHlicmlkIG1hcCB0eXBlcywgd2l0aGluIHNvbWUgbG9jYXRpb25zLCBhbmQgYXQgc29tZSB6b29tXG4gICAgICogbGV2ZWxzLiBOb3RlOiBnZXRUaWx0IHJldHVybnMgdGhlIGN1cnJlbnQgdGlsdCBhbmdsZSwgbm90IHRoZSB2YWx1ZVxuICAgICAqIHNwZWNpZmllZCBieSB0aGlzIG9wdGlvbi4gQmVjYXVzZSBnZXRUaWx0IGFuZCB0aGlzIG9wdGlvbiByZWZlciB0b1xuICAgICAqIGRpZmZlcmVudCB0aGluZ3MsIGRvIG5vdCBiaW5kKCkgdGhlIHRpbHQgcHJvcGVydHk7IGRvaW5nIHNvIG1heSB5aWVsZFxuICAgICAqIHVucHJlZGljdGFibGUgZWZmZWN0cy4gKERlZmF1bHQgb2YgQUdNIGlzIDAgKGRpc2FibGVkKS4gRW5hYmxlIGl0IHdpdGggdmFsdWUgNDUuKVxuICAgICAqL1xuICBASW5wdXQoKSB0aWx0ID0gMDtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgcmVzdHJpY3RpbmcgdGhlIGJvdW5kcyBvZiB0aGUgbWFwLlxuICAgKiBVc2VyIGNhbm5vdCBwYW4gb3Igem9vbSBhd2F5IGZyb20gcmVzdHJpY3RlZCBhcmVhLlxuICAgKi9cbiAgQElucHV0KCkgcmVzdHJpY3Rpb246IE1hcFJlc3RyaWN0aW9uO1xuICAvKipcbiAgICogTWFwIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgY2FuIGNoYW5nZSBvdmVyIHRpbWVcbiAgICovXG4gIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLCAnc2Nyb2xsd2hlZWwnLCAnZHJhZ2dhYmxlJywgJ2RyYWdnYWJsZUN1cnNvcicsICdkcmFnZ2luZ0N1cnNvcicsXG4gICAgJ2tleWJvYXJkU2hvcnRjdXRzJywgJ3pvb21Db250cm9sJywgJ3pvb21Db250cm9sT3B0aW9ucycsICdzdHlsZXMnLCAnc3RyZWV0Vmlld0NvbnRyb2wnLFxuICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLCAnem9vbScsICdtYXBUeXBlQ29udHJvbCcsICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnLCAnbWluWm9vbScsXG4gICAgJ21heFpvb20nLCAncGFuQ29udHJvbCcsICdwYW5Db250cm9sT3B0aW9ucycsICdyb3RhdGVDb250cm9sJywgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnZnVsbHNjcmVlbkNvbnRyb2wnLCAnZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zJywgJ3NjYWxlQ29udHJvbCcsICdzY2FsZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnbWFwVHlwZUlkJywgJ2NsaWNrYWJsZUljb25zJywgJ2dlc3R1cmVIYW5kbGluZycsICd0aWx0JywgJ3Jlc3RyaWN0aW9uJyxcbiAgXTtcblxuICBwcml2YXRlIF9vYnNlcnZhYmxlU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfZml0Qm91bmRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2sgb24gYVxuICAgKiBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHJpZ2h0LWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICovXG4gIEBPdXRwdXQoKSBtYXBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcERibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgY2VudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZ0xpdGVyYWw+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdmlld3BvcnQgYm91bmRzIGhhdmUgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBib3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMYXRMbmdCb3VuZHM+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmdCb3VuZHM+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFwVHlwZUlkIHByb3BlcnR5IGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwVHlwZUlkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWFwVHlwZUlkPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVHlwZUlkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBiZWNvbWVzIGlkbGUgYWZ0ZXIgcGFubmluZyBvciB6b29taW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIGlkbGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB6b29tIGxldmVsIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHpvb21DaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgZ29vZ2xlIG1hcCBpcyBmdWxseSBpbml0aWFsaXplZC5cbiAgICogWW91IGdldCB0aGUgZ29vZ2xlLm1hcHMuTWFwIGluc3RhbmNlIGFzIGEgcmVzdWx0IG9mIHRoaXMgRXZlbnRFbWl0dGVyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcFJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpc2libGUgdGlsZXMgaGF2ZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIHRpbGVzTG9hZGVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbTogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByb3RlY3RlZCBfZml0Qm91bmRzU2VydmljZTogRml0Qm91bmRzU2VydmljZSxcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgIC8vIFRoZSBjb2RlIGlzIHJ1bm5pbmcgb24gdGhlIHNlcnZlciwgZG8gbm90aGluZ1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBzb2x2ZWQgd2l0aCBhIG5ldyBjb21wb25lbnQgYW5kIGEgdmlld0NoaWxkIGRlY29yYXRvclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2VsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWdtLW1hcC1jb250YWluZXItaW5uZXInKTtcbiAgICB0aGlzLl9pbml0TWFwSW5zdGFuY2UoY29udGFpbmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYXBJbnN0YW5jZShlbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXAoZWwsIHtcbiAgICAgIGNlbnRlcjoge2xhdDogdGhpcy5sYXRpdHVkZSB8fCAwLCBsbmc6IHRoaXMubG9uZ2l0dWRlIHx8IDB9LFxuICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgY29udHJvbFNpemU6IHRoaXMuY29udHJvbFNpemUsXG4gICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0aGlzLmRpc2FibGVEZWZhdWx0VUksXG4gICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20sXG4gICAgICBzY3JvbGx3aGVlbDogdGhpcy5zY3JvbGx3aGVlbCxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBkcmFnZ2FibGU6IHRoaXMuZHJhZ2dhYmxlLFxuICAgICAgZHJhZ2dhYmxlQ3Vyc29yOiB0aGlzLmRyYWdnYWJsZUN1cnNvcixcbiAgICAgIGRyYWdnaW5nQ3Vyc29yOiB0aGlzLmRyYWdnaW5nQ3Vyc29yLFxuICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IHRoaXMua2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgem9vbUNvbnRyb2w6IHRoaXMuem9vbUNvbnRyb2wsXG4gICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zLFxuICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2wsXG4gICAgICBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zLFxuICAgICAgc2NhbGVDb250cm9sOiB0aGlzLnNjYWxlQ29udHJvbCxcbiAgICAgIHNjYWxlQ29udHJvbE9wdGlvbnM6IHRoaXMuc2NhbGVDb250cm9sT3B0aW9ucyxcbiAgICAgIG1hcFR5cGVDb250cm9sOiB0aGlzLm1hcFR5cGVDb250cm9sLFxuICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB0aGlzLm1hcFR5cGVDb250cm9sT3B0aW9ucyxcbiAgICAgIHBhbkNvbnRyb2w6IHRoaXMucGFuQ29udHJvbCxcbiAgICAgIHBhbkNvbnRyb2xPcHRpb25zOiB0aGlzLnBhbkNvbnRyb2xPcHRpb25zLFxuICAgICAgcm90YXRlQ29udHJvbDogdGhpcy5yb3RhdGVDb250cm9sLFxuICAgICAgcm90YXRlQ29udHJvbE9wdGlvbnM6IHRoaXMucm90YXRlQ29udHJvbE9wdGlvbnMsXG4gICAgICBmdWxsc2NyZWVuQ29udHJvbDogdGhpcy5mdWxsc2NyZWVuQ29udHJvbCxcbiAgICAgIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczogdGhpcy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMsXG4gICAgICBtYXBUeXBlSWQ6IHRoaXMubWFwVHlwZUlkLFxuICAgICAgY2xpY2thYmxlSWNvbnM6IHRoaXMuY2xpY2thYmxlSWNvbnMsXG4gICAgICBnZXN0dXJlSGFuZGxpbmc6IHRoaXMuZ2VzdHVyZUhhbmRsaW5nLFxuICAgICAgdGlsdDogdGhpcy50aWx0LFxuICAgICAgcmVzdHJpY3Rpb246IHRoaXMucmVzdHJpY3Rpb24sXG4gICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpKVxuICAgICAgLnRoZW4obWFwID0+IHRoaXMubWFwUmVhZHkuZW1pdChtYXApKTtcblxuICAgIC8vIHJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuX2hhbmRsZU1hcENlbnRlckNoYW5nZSgpO1xuICAgIHRoaXMuX2hhbmRsZU1hcFpvb21DaGFuZ2UoKTtcbiAgICB0aGlzLl9oYW5kbGVNYXBNb3VzZUV2ZW50cygpO1xuICAgIHRoaXMuX2hhbmRsZUJvdW5kc0NoYW5nZSgpO1xuICAgIHRoaXMuX2hhbmRsZU1hcFR5cGVJZENoYW5nZSgpO1xuICAgIHRoaXMuX2hhbmRsZVRpbGVzTG9hZGVkRXZlbnQoKTtcbiAgICB0aGlzLl9oYW5kbGVJZGxlRXZlbnQoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcblxuICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIG1hcCBpbnN0YW5jZVxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmNsZWFySW5zdGFuY2VMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKGNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlTWFwT3B0aW9uc0NoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGxldCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgbGV0IG9wdGlvbktleXMgPVxuICAgICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGsgPT4gQWdtTWFwLl9tYXBPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSk7XG4gICAgb3B0aW9uS2V5cy5mb3JFYWNoKChrKSA9PiB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0TWFwT3B0aW9ucyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHJlc2l6ZSBldmVudCBvbiB0aGUgZ29vZ2xlIG1hcCBpbnN0YW5jZS5cbiAgICogV2hlbiByZWNlbnRlciBpcyB0cnVlLCB0aGUgb2YgdGhlIGdvb2dsZSBtYXAgZ2V0cyBjYWxsZWQgd2l0aCB0aGUgY3VycmVudCBsYXQvbG5nIHZhbHVlcyBvciBmaXRCb3VuZHMgdmFsdWUgdG8gcmVjZW50ZXIgdGhlIG1hcC5cbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgdHJpZ2dlclJlc2l6ZShyZWNlbnRlcjogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBOb3RlOiBXaGVuIHdlIHdvdWxkIHRyaWdnZXIgdGhlIHJlc2l6ZSBldmVudCBhbmQgc2hvdyB0aGUgbWFwIGluIHRoZSBzYW1lIHR1cm4gKHdoaWNoIGlzIGFcbiAgICAvLyBjb21tb24gY2FzZSBmb3IgdHJpZ2dlcmluZyBhIHJlc2l6ZSBldmVudCksIHRoZW4gdGhlIHJlc2l6ZSBldmVudCB3b3VsZCBub3RcbiAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcHNXcmFwcGVyLnRyaWdnZXJNYXBFdmVudCgncmVzaXplJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgaWYgKHJlY2VudGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZpdEJvdW5kcyAhPSBudWxsID8gdGhpcy5fZml0Qm91bmRzKCkgOiB0aGlzLl9zZXRDZW50ZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUG9zaXRpb24oY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddID09IG51bGwgJiYgY2hhbmdlc1snbG9uZ2l0dWRlJ10gPT0gbnVsbCAmJlxuICAgICAgICAhY2hhbmdlc1snZml0Qm91bmRzJ10pIHtcbiAgICAgIC8vIG5vIHBvc2l0aW9uIHVwZGF0ZSBuZWVkZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3ZSBwcmVmZXIgZml0Qm91bmRzIGluIGNoYW5nZXNcbiAgICBpZiAoJ2ZpdEJvdW5kcycgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fZml0Qm91bmRzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NldENlbnRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2VudGVyKCkge1xuICAgIGxldCBuZXdDZW50ZXIgPSB7XG4gICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxuICAgIH07XG4gICAgaWYgKHRoaXMudXNlUGFubmluZykge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIucGFuVG8obmV3Q2VudGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0Q2VudGVyKG5ld0NlbnRlcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml0Qm91bmRzKCkge1xuICAgIHN3aXRjaCAodGhpcy5maXRCb3VuZHMpIHtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlVG9GaXRCb3VuZHNVcGRhdGVzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgaWYgKHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fdXBkYXRlQm91bmRzKHRoaXMuZml0Qm91bmRzLCB0aGlzLmZpdEJvdW5kc1BhZGRpbmcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvRml0Qm91bmRzVXBkYXRlcygpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbiA9IHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UuZ2V0Qm91bmRzJCgpLnN1YnNjcmliZShiID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5fdXBkYXRlQm91bmRzKGIsIHRoaXMuZml0Qm91bmRzUGFkZGluZykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZUJvdW5kcyhib3VuZHM6IExhdExuZ0JvdW5kcyB8IExhdExuZ0JvdW5kc0xpdGVyYWwsIHBhZGRpbmc/OiBudW1iZXIgfCBQYWRkaW5nKSB7XG4gICAgaWYgKCFib3VuZHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzTGF0TG5nQm91bmRzTGl0ZXJhbChib3VuZHMpICYmIHR5cGVvZiBnb29nbGUgIT09ICd1bmRlZmluZWQnICYmIGdvb2dsZSAmJiBnb29nbGUubWFwcyAmJiBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMpIHtcbiAgICAgIGNvbnN0IG5ld0JvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgIG5ld0JvdW5kcy51bmlvbihib3VuZHMpO1xuICAgICAgYm91bmRzID0gbmV3Qm91bmRzO1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5Ub0JvdW5kcyhib3VuZHMsIHBhZGRpbmcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXBzV3JhcHBlci5maXRCb3VuZHMoYm91bmRzLCBwYWRkaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTGF0TG5nQm91bmRzTGl0ZXJhbChib3VuZHM6IExhdExuZ0JvdW5kcyB8IExhdExuZ0JvdW5kc0xpdGVyYWwpOiBib3VuZHMgaXMgTGF0TG5nQm91bmRzTGl0ZXJhbCB7XG4gICAgcmV0dXJuIGJvdW5kcyAhPSBudWxsICYmIChib3VuZHMgYXMgYW55KS5leHRlbmQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1hcENlbnRlckNoYW5nZSgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignY2VudGVyX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Q2VudGVyKCkudGhlbigoY2VudGVyOiBMYXRMbmcpID0+IHtcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGNlbnRlci5sYXQoKTtcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBjZW50ZXIubG5nKCk7XG4gICAgICAgIHRoaXMuY2VudGVyQ2hhbmdlLmVtaXQoe2xhdDogdGhpcy5sYXRpdHVkZSwgbG5nOiB0aGlzLmxvbmdpdHVkZX0gYXMgTGF0TG5nTGl0ZXJhbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQm91bmRzQ2hhbmdlKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdib3VuZHNfY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRCb3VuZHMoKS50aGVuKFxuICAgICAgICAoYm91bmRzOiBMYXRMbmdCb3VuZHMpID0+IHsgdGhpcy5ib3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpOyB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWFwVHlwZUlkQ2hhbmdlKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdtYXB0eXBlaWRfY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRNYXBUeXBlSWQoKS50aGVuKFxuICAgICAgICAobWFwVHlwZUlkOiBNYXBUeXBlSWQpID0+IHsgdGhpcy5tYXBUeXBlSWRDaGFuZ2UuZW1pdChtYXBUeXBlSWQpOyB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWFwWm9vbUNoYW5nZSgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPignem9vbV9jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldFpvb20oKS50aGVuKCh6OiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy56b29tID0gejtcbiAgICAgICAgdGhpcy56b29tQ2hhbmdlLmVtaXQoeik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlSWRsZUV2ZW50KCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdpZGxlJykuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4geyB0aGlzLmlkbGUuZW1pdCh2b2lkIDApOyB9KTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVGlsZXNMb2FkZWRFdmVudCgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx2b2lkPigndGlsZXNsb2FkZWQnKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB0aGlzLnRpbGVzTG9hZGVkLmVtaXQodm9pZCAwKSxcbiAgICApO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNYXBNb3VzZUV2ZW50cygpIHtcbiAgICBpbnRlcmZhY2UgRW1pdHRlciB7XG4gICAgICBlbWl0KHZhbHVlOiBhbnkpOiB2b2lkO1xuICAgIH1cblxuICAgIHR5cGUgRXZlbnQgPSB7IG5hbWU6IHN0cmluZywgZW1pdHRlcjogRW1pdHRlciB9O1xuXG4gICAgY29uc3QgZXZlbnRzOiBFdmVudFtdID0gW1xuICAgICAge25hbWU6ICdjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwQ2xpY2t9LFxuICAgICAge25hbWU6ICdyaWdodGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBSaWdodENsaWNrfSxcbiAgICAgIHtuYW1lOiAnZGJsY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcERibENsaWNrfSxcbiAgICBdO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKGU6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudDx7bGF0TG5nOiBMYXRMbmd9PihlLm5hbWUpLnN1YnNjcmliZShcbiAgICAgICAgKGV2ZW50OiB7bGF0TG5nOiBMYXRMbmd9KSA9PiB7XG4gICAgICAgICAgbGV0IHZhbHVlOiBNb3VzZUV2ZW50ID0ge1xuICAgICAgICAgICAgY29vcmRzOiB7XG4gICAgICAgICAgICAgIGxhdDogZXZlbnQubGF0TG5nLmxhdCgpLFxuICAgICAgICAgICAgICBsbmc6IGV2ZW50LmxhdExuZy5sbmcoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbGFjZUlkOiAoZXZlbnQgYXMge2xhdExuZzogTGF0TG5nLCBwbGFjZUlkOiBzdHJpbmd9KS5wbGFjZUlkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdGhlIHBsYWNlSWQgd2lsbCBiZSB1bmRlZmluZWQgaW4gY2FzZSB0aGUgZXZlbnQgd2FzIG5vdCBhbiBJY29uTW91c2VFdmVudCAoZ29vZ2xlIHR5cGVzKVxuICAgICAgICAgIGlmICh2YWx1ZS5wbGFjZUlkICYmICF0aGlzLnNob3dEZWZhdWx0SW5mb1dpbmRvdykge1xuICAgICAgICAgICAgKGV2ZW50IGFzIGFueSkuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLmVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICB9KTtcbiAgfVxufVxuIl19