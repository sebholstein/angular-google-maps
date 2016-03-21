import {Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange} from 'angular2/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {MarkerManager} from '../services/marker-manager';
import {LatLng, LatLngLiteral} from '../services/google-maps-types';
import {MouseEvent} from '../events';

/**
 * SebMGoogleMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `sebm-google-map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
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
  selector: 'sebm-google-map',
  providers: [GoogleMapsAPIWrapper, MarkerManager],
  inputs: [
    'longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel'
  ],
  outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'centerChange'],
  host: {'[class.sebm-google-map-container]': 'true'},
  styles: [`
    .sebm-google-map-container-inner {
      width: inherit;
      height: inherit;
    }
  `],
  template: `
    <div class='sebm-google-map-container-inner'></div>
    <ng-content></ng-content>
  `
})
export class SebmGoogleMap implements OnChanges,
    OnInit {
  private _longitude: number = 0;
  private _latitude: number = 0;
  private _zoom: number = 8;
  /**
   * Enables/disables zoom and center on double click. Enabled by default.
   */
  disableDoubleClickZoom: boolean = false;

  /**
   * Enables/disables all default UI of the Google map. Please note: When the map is created, this
   * value cannot get updated.
   */
  disableDefaultUI: boolean = false;

  /**
   * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
   */
  scrollwheel: boolean = true;

  /**
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = ['disableDoubleClickZoom', 'scrollwheel'];

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
   * This event emitter is fired when the map center changes.
   */
  centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  constructor(private _elem: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper) {}

  /** @internal */
  ngOnInit() {
    const container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.createMap(el, {
      center: {lat: this._latitude, lng: this._longitude},
      zoom: this._zoom,
      disableDefaultUI: this.disableDefaultUI
    });
    this._handleMapCenterChange();
    this._handleMapZoomChange();
    this._handleMapMouseEvents();
  }

  /* @internal */
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this._updateMapOptionsChanges(changes);
  }

  private _updateMapOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys =
        Object.keys(changes).filter(k => SebmGoogleMap._mapOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    this._mapsWrapper.setMapOptions(options);
  }

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
          () => { return this._mapsWrapper.triggerMapEvent('resize').then(() => resolve()); });
    });
  }

  /**
   * Sets the zoom level of the map. The default value is `8`.
   */
  set zoom(value: number | string) {
    this._zoom = this._convertToDecimal(value, 8);
    if (typeof this._zoom === 'number') {
      this._mapsWrapper.setZoom(this._zoom);
    }
  }

  /**
   * The longitude that sets the center of the map.
   */
  set longitude(value: number | string) {
    this._longitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  /**
   * The latitude that sets the center of the map.
   */
  set latitude(value: number | string) {
    this._latitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  private _convertToDecimal(value: string | number, defaultValue: number = null): number {
    if (typeof value === 'string') {
      return parseFloat(value);
    } else if (typeof value === 'number') {
      return <number>value;
    }
    return defaultValue;
  }

  private _updateCenter() {
    if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
      return;
    }
    this._mapsWrapper.setCenter({
      lat: this._latitude,
      lng: this._longitude,
    });
  }

  private _handleMapCenterChange() {
    this._mapsWrapper.subscribeToMapEvent<void>('center_changed').subscribe(() => {
      this._mapsWrapper.getCenter().then((center: LatLng) => {
        this._latitude = center.lat();
        this._longitude = center.lng();
        this.centerChange.emit(<LatLngLiteral>{lat: this._latitude, lng: this._longitude});
      });
    });
  }

  private _handleMapZoomChange() {
    this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe(() => {
      this._mapsWrapper.getZoom().then((z: number) => this._zoom = z);
    });
  }

  private _handleMapMouseEvents() {
    interface Emitter {
      emit(value: any): void;
    }
    type Event = {name: string, emitter: Emitter};

    const events: Event[] = [
      {name: 'click', emitter: this.mapClick}, {name: 'rightclick', emitter: this.mapRightClick},
      {name: 'dblclick', emitter: this.mapDblClick}
    ];

    events.forEach((e: Event) => {
      this._mapsWrapper.subscribeToMapEvent<{latLng: LatLng}>(e.name).subscribe(
          (event: {latLng: LatLng}) => {
            const value = <MouseEvent>{coords: {lat: event.latLng.lat(), lng: event.latLng.lng()}};
            e.emitter.emit(value);
          });
    });
  }
}
