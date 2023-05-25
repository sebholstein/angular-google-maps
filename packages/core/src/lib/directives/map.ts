import { isPlatformServer } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, Output, PLATFORM_ID, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

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

export type ControlPosition = keyof typeof google.maps.ControlPosition;

@Directive()
export abstract class AgmMapControl {
  @Input() position: ControlPosition;
  abstract getOptions(): Partial<google.maps.MapOptions>;
}

@Directive({
  selector: 'agm-map agm-fullscreen-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmFullscreenControl }],
})
export class AgmFullscreenControl extends AgmMapControl {
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
      },
    };
  }
}
@Directive({
  selector: 'agm-map agm-map-type-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmMapTypeControl }],
})
export class AgmMapTypeControl extends AgmMapControl {
  @Input() mapTypeIds: (keyof typeof google.maps.MapTypeId)[];
  @Input() style: keyof typeof google.maps.MapTypeControlStyle;

  getOptions(): Partial<google.maps.MapOptions> {
    return {
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
        style: this.style && google.maps.MapTypeControlStyle[this.style],
        mapTypeIds: this.mapTypeIds && this.mapTypeIds.map(mapTypeId => google.maps.MapTypeId[mapTypeId]),
      },
    };
  }
}

@Directive({
  selector: 'agm-map agm-pan-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmPanControl }],
})
export class AgmPanControl extends AgmMapControl {
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      panControl: true,
      panControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
      },
    };
  }
}

@Directive({
  selector: 'agm-map agm-rotate-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmRotateControl }],
})
export class AgmRotateControl extends AgmMapControl {
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      rotateControl: true,
      rotateControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
      },
    };
  }
}

@Directive({
  selector: 'agm-map agm-scale-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmScaleControl }],
})
export class AgmScaleControl extends AgmMapControl{
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      scaleControl: true,
    };
  }
}

@Directive({
  selector: 'agm-map agm-street-view-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmStreetViewControl }],
})
export class AgmStreetViewControl extends AgmMapControl {
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      streetViewControl: true,
      streetViewControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
      },
    };
  }
}

@Directive({
  selector: 'agm-map agm-zoom-control',
  providers: [{ provide: AgmMapControl, useExisting: AgmZoomControl }],
})
export class AgmZoomControl extends AgmMapControl{
  @Input() style: keyof typeof google.maps.ZoomControlStyle;
  getOptions(): Partial<google.maps.MapOptions> {
    return {
      zoomControl: true,
      zoomControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
        style: this.style && google.maps.ZoomControlStyle[this.style],
      },
    };
  }
}

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
@Component({
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
  styles: [`
    .agm-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .agm-map-content {
      display:none;
    }
  `],
  template: `
              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
              <div class='agm-map-content'>
                <ng-content></ng-content>
              </div>
  `,
})
export class AgmMap implements OnChanges, AfterContentInit, OnDestroy {
  /**
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = [
    'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
    'keyboardShortcuts', 'styles', 'zoom', 'minZoom', 'maxZoom', 'mapTypeId', 'clickableIcons',
    'gestureHandling', 'tilt', 'restriction',
  ];
  /**
   * The longitude that defines the center of the map.
   */
  @Input() longitude = 0;

  /**
   * The latitude that defines the center of the map.
   */
  @Input() latitude = 0;

  /**
   * The zoom level of the map. The default zoom level is 8.
   */
  @Input() zoom = 8;

  /**
   * The minimal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  @Input() minZoom: number;

  /**
   * The maximal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  @Input() maxZoom: number;

  /**
   * The control size for the default map controls. Only governs the controls made by the Maps API itself
   */
  @Input() controlSize: number;

  /**
   * Enables/disables if map is draggable.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('mapDraggable') draggable = true;

  /**
   * Enables/disables zoom and center on double click. Enabled by default.
   */
  @Input() disableDoubleClickZoom = false;

  /**
   * Enables/disables all default UI of the Google map. Please note: When the map is created, this
   * value cannot get updated.
   */
  @Input() disableDefaultUI = false;

  /**
   * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
   */
  @Input() scrollwheel = true;

  /**
   * Color used for the background of the Map div. This color will be visible when tiles have not
   * yet loaded as the user pans. This option can only be set when the map is initialized.
   */
  @Input() backgroundColor: string;

  /**
   * The name or url of the cursor to display when mousing over a draggable map. This property uses
   * the css  * cursor attribute to change the icon. As with the css property, you must specify at
   * least one fallback cursor that is not a URL. For example:
   * [draggableCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  @Input() draggableCursor: string;

  /**
   * The name or url of the cursor to display when the map is being dragged. This property uses the
   * css cursor attribute to change the icon. As with the css property, you must specify at least
   * one fallback cursor that is not a URL. For example:
   * [draggingCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  @Input() draggingCursor: string;

  /**
   * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
   * enabled by default.
   */
  @Input() keyboardShortcuts = true;

  /**
   * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
   * modes, these styles will only apply to labels and geometry.
   */
  @Input() styles: google.maps.MapTypeStyle[] = [];

  /**
   * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
   * used to
   * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
   */
  @Input() usePanning = false;

  /**
   * Sets the viewport to contain the given bounds.
   * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
   */
  @Input() fitBounds: google.maps.LatLngBoundsLiteral | google.maps.LatLngBounds | boolean = false;

  /**
   * Padding amount for the bounds.
   */
  @Input() fitBoundsPadding: number | google.maps.Padding;

  /**
   * The map mapTypeId. Defaults to 'roadmap'.
   */
  @Input() mapTypeId: keyof typeof google.maps.MapTypeId = 'ROADMAP';

  /**
   * When false, map icons are not clickable. A map icon represents a point of interest,
   * also known as a POI. By default map icons are clickable.
   */
  @Input() clickableIcons = true;

  /**
   * A map icon represents a point of interest, also known as a POI.
   * When map icons are clickable by default, an info window is displayed.
   * When this property is set to false, the info window will not be shown but the click event
   * will still fire
   */
  @Input() showDefaultInfoWindow = true;

  /**
   * This setting controls how gestures on the map are handled.
   * Allowed values:
   * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
   * - 'greedy'      (All touch gestures pan or zoom the map.)
   * - 'none'        (The map cannot be panned or zoomed by user gestures.)
   * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
   */
  @Input() gestureHandling: google.maps.GestureHandlingOptions = 'auto';

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
  @Input() tilt = 0;

  /**
   * Options for restricting the bounds of the map.
   * User cannot pan or zoom away from restricted area.
   */
  @Input() restriction: google.maps.MapRestriction;

  private _observableSubscriptions: Subscription[] = [];
  private _fitBoundsSubscription: Subscription;

  /**
   * This event emitter gets emitted when the user clicks on the map (but not when they click on a
   * marker or infoWindow).
   */
  // tslint:disable-next-line: max-line-length
  @Output() mapClick: EventEmitter<google.maps.MouseEvent | google.maps.IconMouseEvent> = new EventEmitter<google.maps.MouseEvent | google.maps.IconMouseEvent>();

  /**
   * This event emitter gets emitted when the user right-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output() mapRightClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event emitter gets emitted when the user double-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output() mapDblClick: EventEmitter<google.maps.MouseEvent> = new EventEmitter<google.maps.MouseEvent>();

  /**
   * This event emitter is fired when the map center changes.
   */
  @Output() centerChange: EventEmitter<google.maps.LatLngLiteral> = new EventEmitter<google.maps.LatLngLiteral>();

  /**
   * This event is fired when the viewport bounds have changed.
   */
  @Output() boundsChange: EventEmitter<google.maps.LatLngBounds> = new EventEmitter<google.maps.LatLngBounds>();

  /**
   * This event is fired when the mapTypeId property changes.
   */
  @Output() mapTypeIdChange: EventEmitter<google.maps.MapTypeId> = new EventEmitter<google.maps.MapTypeId>();

  /**
   * This event is fired when the map becomes idle after panning or zooming.
   */
  @Output() idle: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This event is fired when the zoom level has changed.
   */
  @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * This event is fired when the google map is fully initialized.
   * You get the google.maps.Map instance as a result of this EventEmitter.
   */
  @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();

  /**
   * This event is fired when the visible tiles have finished loading.
   */
  @Output() tilesLoaded: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(AgmMapControl) mapControls: QueryList<AgmMapControl>;

  constructor(
    private _elem: ElementRef,
    private _mapsWrapper: GoogleMapsAPIWrapper,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private _platformId: Object,
    protected _fitBoundsService: FitBoundsService,
    private _zone: NgZone
  ) {}

  /** @internal */
  ngAfterContentInit() {
    if (isPlatformServer(this._platformId)) {
      // The code is running on the server, do nothing
      return;
    }
    // todo: this should be solved with a new component and a viewChild decorator
    const container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.createMap(el, {
      center: {lat: this.latitude || 0, lng: this.longitude || 0},
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
      mapTypeId: this.mapTypeId.toLocaleLowerCase(),
      clickableIcons: this.clickableIcons,
      gestureHandling: this.gestureHandling,
      tilt: this.tilt,
      restriction: this.restriction,
    })
      .then(() => this._mapsWrapper.getNativeMap())
      .then(map => this.mapReady.emit(map));

    // register event listeners
    this._handleMapCenterChange();
    this._handleMapZoomChange();
    this._handleMapMouseEvents();
    this._handleBoundsChange();
    this._handleMapTypeIdChange();
    this._handleTilesLoadedEvent();
    this._handleIdleEvent();
    this._handleControlChange();
  }

  /** @internal */
  ngOnDestroy() {
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach((s) => s.unsubscribe());

    // remove all listeners from the map instance
    this._mapsWrapper.clearInstanceListeners();
    if (this._fitBoundsSubscription) {
      this._fitBoundsSubscription.unsubscribe();
    }
  }

  /* @internal */
  ngOnChanges(changes: SimpleChanges) {
    this._updateMapOptionsChanges(changes);
    this._updatePosition(changes);
  }

  private _updateMapOptionsChanges(changes: SimpleChanges) {
    const options: {[propName: string]: any} = {};
    const optionKeys =
      Object.keys(changes).filter(k => AgmMap._mapOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    this._mapsWrapper.setMapOptions(options);
  }

  /**
   * Triggers a resize event on the google map instance.
   * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
   * Returns a promise that gets resolved after the event was triggered.
   */
  triggerResize(recenter: boolean = true): Promise<void> {
    // Note: When we would trigger the resize event and show the map in the same turn (which is a
    // common case for triggering a resize event), then the resize event would not
    // work (to show the map), so we trigger the event in a timeout.
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        return this._mapsWrapper.triggerMapEvent('resize').then(() => {
          if (recenter) {
            this.fitBounds != null ? this._fitBounds() : this._setCenter();
          }
          resolve();
        });
      });
    });
  }

  private _updatePosition(changes: SimpleChanges) {
    // tslint:disable: no-string-literal
    if (changes['latitude'] == null && changes['longitude'] == null &&
        !changes['fitBounds']) {
      // no position update needed
      return;
    }
    // tslint:enable: no-string-literal

    // we prefer fitBounds in changes
    if ('fitBounds' in changes) {
      this._fitBounds();
      return;
    }

    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }
    this._setCenter();
  }

  private _setCenter() {
    const newCenter = {
      lat: this.latitude,
      lng: this.longitude,
    };
    if (this.usePanning) {
      this._mapsWrapper.panTo(newCenter);
    } else {
      this._mapsWrapper.setCenter(newCenter);
    }
  }

  private _fitBounds() {
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
        if (this._fitBoundsSubscription) {
          this._fitBoundsSubscription.unsubscribe();
        }
        this._updateBounds(this.fitBounds, this.fitBoundsPadding);
    }
  }

  private _subscribeToFitBoundsUpdates() {
    this._zone.runOutsideAngular(() => {
      this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe(b => {
        this._zone.run(() => this._updateBounds(b, this.fitBoundsPadding));
      });
    });
  }

  protected _updateBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding) {
    if (!bounds) {
      return;
    }
    if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
      const newBounds = new google.maps.LatLngBounds();
      newBounds.union(bounds);
      bounds = newBounds;
    }
    if (this.usePanning) {
      this._mapsWrapper.panToBounds(bounds, padding);
      return;
    }
    this._mapsWrapper.fitBounds(bounds, padding);
  }

  private _isLatLngBoundsLiteral(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): boolean {
    return bounds != null && (bounds as any).extend === undefined;
  }

  private _handleMapCenterChange() {
    const s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(() => {
      this._mapsWrapper.getCenter().then((center: google.maps.LatLng) => {
        this.latitude = center.lat();
        this.longitude = center.lng();
        this.centerChange.emit({lat: this.latitude, lng: this.longitude} as google.maps.LatLngLiteral);
      });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleBoundsChange() {
    const s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(() => {
      this._mapsWrapper.getBounds().then(
        (bounds: google.maps.LatLngBounds) => { this.boundsChange.emit(bounds); });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleMapTypeIdChange() {
    const s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(() => {
      this._mapsWrapper.getMapTypeId().then(
        (mapTypeId: google.maps.MapTypeId) => { this.mapTypeIdChange.emit(mapTypeId); });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleMapZoomChange() {
    const s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(() => {
      this._mapsWrapper.getZoom().then((z: number) => {
        this.zoom = z;
        this.zoomChange.emit(z);
      });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleIdleEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(
      () => { this.idle.emit(void 0); });
    this._observableSubscriptions.push(s);
  }

  private _handleTilesLoadedEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(
      () => this.tilesLoaded.emit(void 0),
    );
    this._observableSubscriptions.push(s);
  }

  private _handleMapMouseEvents() {
    type Event = { name: 'rightclick' | 'click' | 'dblclick', emitter: EventEmitter<google.maps.MouseEvent> };

    const events: Event[] = [
      {name: 'click', emitter: this.mapClick},
      {name: 'rightclick', emitter: this.mapRightClick},
      {name: 'dblclick', emitter: this.mapDblClick},
    ];

    events.forEach(e => {
      const s = this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(
        ([event]) => {
          // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
          if ( (event as google.maps.IconMouseEvent).placeId && !this.showDefaultInfoWindow) {
            event.stop();
          }
          e.emitter.emit(event);
        });
      this._observableSubscriptions.push(s);
    });
  }

  _handleControlChange() {
    this._setControls();
    this.mapControls.changes.subscribe(() => this._setControls());
  }

  _setControls() {
    const controlOptions: Partial<google.maps.MapOptions> = {
      fullscreenControl: !this.disableDefaultUI,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: !this.disableDefaultUI,
      zoomControl: !this.disableDefaultUI,
    };
    this.mapControls.forEach(control => Object.assign(controlOptions, control.getOptions()));
    this._mapsWrapper.setMapOptions(controlOptions);
  }
}
