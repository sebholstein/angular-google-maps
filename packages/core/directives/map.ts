import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { MouseEvent } from '../map-types';
import { FitBoundsService } from '../services/fit-bounds';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import {
  FullscreenControlOptions, LatLng, LatLngBounds, LatLngBoundsLiteral, LatLngLiteral,
  MapRestriction, MapTypeControlOptions, MapTypeId, MapTypeStyle, Padding, PanControlOptions,
  RotateControlOptions, ScaleControlOptions, StreetViewControlOptions, ZoomControlOptions,
} from '../services/google-maps-types';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { LayerManager } from '../services/managers/layer-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
import { RectangleManager } from '../services/managers/rectangle-manager';
import { DataLayerManager } from './../services/managers/data-layer-manager';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';

declare var google: any;

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
  host: {
    // todo: deprecated - we will remove it with the next version
    '[class.sebm-google-map-container]': 'true',
  },
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
export class AgmMap implements OnChanges, OnInit, OnDestroy {
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
   * The enabled/disabled state of the Zoom control.
   */
  @Input() zoomControl: boolean;

  /**
   * Options for the Zoom control.
   */
  @Input() zoomControlOptions: ZoomControlOptions;

  /**
   * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
   * modes, these styles will only apply to labels and geometry.
   */
  @Input() styles: MapTypeStyle[] = [];

  /**
   * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
   * used to
   * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
   */
  @Input() usePanning = false;

  /**
   * The initial enabled/disabled state of the Street View Pegman control.
   * This control is part of the default UI, and should be set to false when displaying a map type
   * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
   */
  @Input() streetViewControl: boolean;

  /**
   * Options for the Street View control.
   */
  @Input() streetViewControlOptions: StreetViewControlOptions;

  /**
   * Sets the viewport to contain the given bounds.
   * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
   */
  @Input() fitBounds: LatLngBoundsLiteral | LatLngBounds | boolean = false;

  /**
   * Padding amount for the bounds.
   */
  @Input() fitBoundsPadding: number | Padding;

  /**
   * The initial enabled/disabled state of the Scale control. This is disabled by default.
   */
  @Input() scaleControl = false;

  /**
   * Options for the scale control.
   */
  @Input() scaleControlOptions: ScaleControlOptions;

  /**
   * The initial enabled/disabled state of the Map type control.
   */
  @Input() mapTypeControl = false;

  /**
   * Options for the Map type control.
   */
  @Input() mapTypeControlOptions: MapTypeControlOptions;

  /**
   * The initial enabled/disabled state of the Pan control.
   */
  @Input() panControl  = false;

  /**
   * Options for the Pan control.
   */
  @Input() panControlOptions: PanControlOptions;

  /**
   * The initial enabled/disabled state of the Rotate control.
   */
  @Input() rotateControl = false;

  /**
   * Options for the Rotate control.
   */
  @Input() rotateControlOptions: RotateControlOptions;

  /**
   * The initial enabled/disabled state of the Fullscreen control.
   */
  @Input() fullscreenControl  = false;

  /**
   * Options for the Fullscreen control.
   */
  @Input() fullscreenControlOptions: FullscreenControlOptions;

  /**
   * The map mapTypeId. Defaults to 'roadmap'.
   */
  @Input() mapTypeId: 'roadmap' | 'hybrid' | 'satellite' | 'terrain' | string = 'roadmap';

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
  @Input() gestureHandling: 'cooperative' | 'greedy' | 'none' | 'auto' = 'auto';

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
  @Input() restriction: MapRestriction;
  /**
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = [
    'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
    'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
    'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
    'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
    'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
    'mapTypeId', 'clickableIcons', 'gestureHandling', 'tilt', 'restriction',
  ];

  private _observableSubscriptions: Subscription[] = [];
  private _fitBoundsSubscription: Subscription;

  /**
   * This event emitter gets emitted when the user clicks on the map (but not when they click on a
   * marker or infoWindow).
   */
  @Output() mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user right-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output() mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user double-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  @Output() mapDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter is fired when the map center changes.
   */
  @Output() centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  /**
   * This event is fired when the viewport bounds have changed.
   */
  @Output() boundsChange: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();

  /**
   * This event is fired when the mapTypeId property changes.
   */
  @Output() mapTypeIdChange: EventEmitter<MapTypeId> = new EventEmitter<MapTypeId>();

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

  constructor(
    private _elem: ElementRef,
    private _mapsWrapper: GoogleMapsAPIWrapper,
    @Inject(PLATFORM_ID) private _platformId: Object,
    protected _fitBoundsService: FitBoundsService,
    private _zone: NgZone
  ) {}

  /** @internal */
  ngOnInit() {
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
    let options: {[propName: string]: any} = {};
    let optionKeys =
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
  }

  private _setCenter() {
    let newCenter = {
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

  protected _updateBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding) {
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

  private _isLatLngBoundsLiteral(bounds: LatLngBounds | LatLngBoundsLiteral): bounds is LatLngBoundsLiteral {
    return bounds != null && (bounds as any).extend === undefined;
  }

  private _handleMapCenterChange() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('center_changed').subscribe(() => {
      this._mapsWrapper.getCenter().then((center: LatLng) => {
        this.latitude = center.lat();
        this.longitude = center.lng();
        this.centerChange.emit({lat: this.latitude, lng: this.longitude} as LatLngLiteral);
      });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleBoundsChange() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('bounds_changed').subscribe(() => {
      this._mapsWrapper.getBounds().then(
        (bounds: LatLngBounds) => { this.boundsChange.emit(bounds); });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleMapTypeIdChange() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('maptypeid_changed').subscribe(() => {
      this._mapsWrapper.getMapTypeId().then(
        (mapTypeId: MapTypeId) => { this.mapTypeIdChange.emit(mapTypeId); });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleMapZoomChange() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe(() => {
      this._mapsWrapper.getZoom().then((z: number) => {
        this.zoom = z;
        this.zoomChange.emit(z);
      });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleIdleEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('idle').subscribe(
      () => { this.idle.emit(void 0); });
    this._observableSubscriptions.push(s);
  }

  private _handleTilesLoadedEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent<void>('tilesloaded').subscribe(
      () => this.tilesLoaded.emit(void 0),
    );
    this._observableSubscriptions.push(s);
  }

  private _handleMapMouseEvents() {
    interface Emitter {
      emit(value: any): void;
    }

    type Event = { name: string, emitter: Emitter };

    const events: Event[] = [
      {name: 'click', emitter: this.mapClick},
      {name: 'rightclick', emitter: this.mapRightClick},
      {name: 'dblclick', emitter: this.mapDblClick},
    ];

    events.forEach((e: Event) => {
      const s = this._mapsWrapper.subscribeToMapEvent<{latLng: LatLng}>(e.name).subscribe(
        (event: {latLng: LatLng}) => {
          let value: MouseEvent = {
            coords: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
            placeId: (event as {latLng: LatLng, placeId: string}).placeId,
          };
          // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
          if (value.placeId && !this.showDefaultInfoWindow) {
            (event as any).stop();
          }
          e.emitter.emit(value);
        });
      this._observableSubscriptions.push(s);
    });
  }
}
