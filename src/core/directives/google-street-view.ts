import {Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {MouseEvent} from '../map-types';
import {Subscription} from 'rxjs/Subscription';
import {GoogleStreetViewAPIWrapper} from '../services/google-street-view-api-wrapper';
import {LatLng, LatLngLiteral, StreetViewPanoramaOptions, StreetViewPov} from '../services/google-maps-types';
import {LatLngBounds, LatLngBoundsLiteral} from '../services/google-maps-types';
import {CircleManager} from '../services/managers/circle-manager';
import {InfoWindowManager} from '../services/managers/info-window-manager';
import {MarkerManager} from '../services/managers/marker-manager';
import {PolylineManager} from '../services/managers/polyline-manager';

/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {SebmGoogleMap} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Component({
  selector: 'sebm-google-street-view',
  providers:
      [GoogleStreetViewAPIWrapper, MarkerManager, InfoWindowManager, CircleManager, PolylineManager],
  inputs: [
    'longitude', 'latitude', 'heading', 'pitch', 'zoom', 'draggable: mapDraggable',
    'disableDoubleClickZoom', 'backgroundColor', 'zoomControl',
  ],
  outputs: [
    'mapClick', 'mapRightClick', 'mapDblClick', 'positionChange', 'povChange', 'idle'
  ],
  host: {'[class.sebm-google-street-view]': 'true'},
  styles: [`
    .sebm-google-street-view-container-inner {
      width: inherit;
      height: inherit;
    }
    .sebm-google-street-view-content {
      display:none;
    }
  `],
  template: `
    <div class='sebm-google-street-view-container-inner'></div>
    <div class='sebm-google-street-view-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class SebmGoogleStreetView implements OnChanges, OnInit, OnDestroy {
  /**
   * The longitude that defines the center of the map.
   */
  longitude: number = 0;

  /**
   * The latitude that defines the center of the map.
   */
  latitude: number = 0;

  /**
   * the heading that defines the horizontal angle of the view
   */
  heading: number = 0;

  /**
   * the pitch that defins the vetical angle of the view
   */
  pitch: number = 0;

  /**
   * The zoom level of the view. The default zoom level is 0.
   */
  zoom: number = 0;

  /**
   * Enables/disables zoom and center on double click. Enabled by default.
   */
  disableDoubleClickZoom: boolean = false;

  /**
   * Enables/disables close button.
   */
  enableCloseButton: boolean = true;

  /**
   * Enables/disables the links control
   * @type {boolean}
   */
  linksControl: boolean = true;

  /**
   * The options for pan control if it is enabled
   */
  linkControlOptions: any = null;

  /**
   * Enables/disables the ability to pan the view
   * @type {boolean}
   */
  panControl: boolean = true;

  /**
   * The options for pan control if it is enabled
   */
  panControlOptions: any = null;

  /**
   * The enabled/disabled state of the Zoom control.
   * @type {boolean}
   */
  zoomControl: boolean = true;

  /**
   * The options for zoom control if it is enabled
   */
  zoomControlOptions: any = null;

  /**
   * Color used for the background of the Map div. This color will be visible when tiles have not
   * yet loaded as the user pans. This option can only be set when the map is initialized.
   */
  backgroundColor: string;
 
  /**
   * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
   * used to
   * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
   */
  usePanning: boolean = false;

  /**
   * The initial enabled/disabled state of the Street View Pegman control.
   * This control is part of the default UI, and should be set to false when displaying a map type
   * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
   */
  streetViewControl: boolean = true;

  /**
   * Sets the viewport to contain the given bounds.
   */
  fitBounds: LatLngBoundsLiteral|LatLngBounds = null;

  /**
   * The initial enabled/disabled state of the Scale control. This is disabled by default.
   */
  scaleControl: boolean = false;

  /**
   * The initial enabled/disabled state of the Map type control.
   */
  mapTypeControl: boolean = false;

  /**
   * Map option attributes that can change over time
   */
  // private static _mapOptionsAttributes: string[] = [
  //   'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
  //   'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl'
  // ];

  private _observableSubscriptions: Subscription[] = [];

  /**
   * This event emitter gets emitted when the user clicks on the map (but not when they click on a
   * marker or infoWindow).
   */
  mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user right-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user double-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  mapDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter is fired when the view position changes.
   */
  positionChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  /**
   * This event is fired when the viewport pov has changed.
   */
  povChange: EventEmitter<StreetViewPov> = new EventEmitter<StreetViewPov>();

  /**
   * This event is fired when the map becomes idle after panning or zooming.
   */
  idle: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();

  /**
   * This event is fired when the zoom level has changed.
   */
  zoomChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _elem: ElementRef, private _viewsWrapper: GoogleStreetViewAPIWrapper) {}

  /** @internal */
  ngOnInit() {
    // todo: this should be solved with a new component and a viewChild decorator
    const container = this._elem.nativeElement.querySelector('.sebm-google-street-view-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._viewsWrapper.createView(el, <StreetViewPanoramaOptions>{
      position: {lat: this.latitude || 0, lng: this.longitude || 0},
      pov: {heading: this.heading || 0, pitch: this.pitch || 0, zoom: this.zoom || 0},
      backgroundColor: this.backgroundColor,
      enableCloseButton: this.enableCloseButton,
      disableDoubleClickZoom: this.disableDoubleClickZoom,
      panControl: this.panControl,
      zoomControl: this.zoomControl,
      zoomControlOptions: this.zoomControlOptions,
      linksControl: this.linksControl,
      scaleControl: this.scaleControl,
      mapTypeControl: this.mapTypeControl
    });

    // register event listeners
    this._handleViewPositionChange();
    this._handleViewPovChange();
    this._handleViewMouseEvents();
    // this._handleIdleEvent();
  }

  /** @internal */
  ngOnDestroy() {
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  /** @internal */
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    // this._updateMapOptionsChanges(changes);
    this._updatePosition(changes);
    this._updatePov(changes);
  }

  // private _updateMapOptionsChanges(changes: {[propName: string]: SimpleChange}) {
  //   let options: {[propName: string]: any} = {};
  //   let optionKeys =
  //       Object.keys(changes).filter(k => SebmGoogleStreetView._mapOptionsAttributes.indexOf(k) !== -1);
  //   optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
  //   this._viewWrapper.setMapOptions(options);
  // }

  /**
   * Triggers a resize event on the google map instance.
   * Returns a promise that gets resolved after the event was triggered.
   */
  triggerResize(): Promise<void> {
    // Note: When we would trigger the resize event and show the map in the same turn (which is a
    // common case for triggering a resize event), then the resize event would not
    // work (to show the map), so we trigger the event in a timeout.
    return new Promise<void>((resolve) => {
      setTimeout(
          () => { return this._viewsWrapper.triggerMapEvent('resize').then(() => resolve()); });
    });
  }

  private _updatePosition(changes: {[propName: string]: SimpleChange}) {
    if (changes['latitude'] == null && changes['longitude'] == null) {
      // no position update needed
      return;
    }

    // // we prefer fitBounds in changes
    // if (changes['fitBounds'] && this.fitBounds != null) {
    //   this._fitBounds();
    //   return;
    // }

    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }
    let newCenter = {
      lat: this.latitude,
      lng: this.longitude,
    };

      this._viewsWrapper.setPosition(newCenter);
  }

  private _updatePov(changes: {[propName: string]: SimpleChange}) {
    if (changes['heading'] == null && changes['pitch'] == null) {
      // no povupdate needed
      return;
    }
    if (typeof this.pitch !== 'number' || typeof this.heading !== 'number') {
      return;
    }
    let newPov: StreetViewPov = <StreetViewPov>{
      heading: this.heading,
      pitch: this.pitch,
      zoom: this.zoom
    };

    this._viewsWrapper.setPov(newPov);
  }

  // private _fitBounds() {
  //   if (this.usePanning) {
  //     this._mapsWrapper.panToBounds(this.fitBounds);
  //     return;
  //   }
  //   this._mapsWrapper.fitBounds(this.fitBounds);
  // }

  private _handleViewPositionChange() {
    const s = this._viewsWrapper.subscribeToViewEvent<void>('position_changed').subscribe(() => {
      this._viewsWrapper.getPosition().then((position: LatLng) => {
        this.latitude = position.lat();
        this.longitude = position.lng();
        this.positionChange.emit(<LatLngLiteral>{lat: this.latitude, lng: this.longitude});
      });
    });
    this._observableSubscriptions.push(s);
  }

  private _handleViewPovChange() {
    const s = this._viewsWrapper.subscribeToViewEvent<void>('pov_changed').subscribe(() => {
      this._viewsWrapper.getPov().then((pov: StreetViewPov) => {

        this.heading = pov.heading;
        this.pitch = pov.pitch;
        this.zoom = pov.zoom;

        this.povChange.emit(<StreetViewPov>{heading: this.heading, pitch: this.pitch, zoom: this.zoom});
      });
    });
    this._observableSubscriptions.push(s);
  }

  // private _handleBoundsChange() {
  //   const s = this._mapsWrapper.subscribeToMapEvent<void>('bounds_changed').subscribe(() => {
  //     this._mapsWrapper.getBounds().then(
  //         (bounds: LatLngBounds) => { this.boundsChange.emit(bounds); });
  //   });
  //   this._observableSubscriptions.push(s);
  // }
  //
  // private _handleMapZoomChange() {
  //   const s = this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe(() => {
  //     this._mapsWrapper.getZoom().then((z: number) => {
  //       this.zoom = z;
  //       this.zoomChange.emit(z);
  //     });
  //   });
  //   this._observableSubscriptions.push(s);
  // }

  // private _handleIdleEvent() {
  //   const s = this._mapsWrapper.subscribeToMapEvent<void>('idle').subscribe(() => {
  //     this._mapsWrapper.getBounds().then(
  //       (bounds: LatLngBounds) => { this.idle.emit(bounds); });
  //   });
  //   this._observableSubscriptions.push(s);
  // }

  private _handleViewMouseEvents() {
    interface Emitter {
      emit(value: any): void;
    }
    type Event = {name: string, emitter: Emitter};

    const events: Event[] = [
      {name: 'click', emitter: this.mapClick},
      {name: 'rightclick', emitter: this.mapRightClick},
    ];

    events.forEach((e: Event) => {
      const s = this._viewsWrapper.subscribeToViewEvent<{pov: StreetViewPov}>(e.name).subscribe(
          (event: {pov: StreetViewPov}) => {
            const value = <MouseEvent>{coords: {heading: event.pov.heading, pitch: event.pov.pitch, zoom: event.pov.zoom}};
            e.emitter.emit(value);
          });
      this._observableSubscriptions.push(s);
    });
  }
}
