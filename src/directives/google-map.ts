import {Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange} from 'angular2/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {MarkerManager} from '../services/marker-manager';
import {LatLng} from '../services/google-maps-types';
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
  inputs: ['longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI'],
  outputs: ['mapClick', 'mapRightClick', 'mapDblClick'],
  template: `
    <div class="sebm-google-map-container"></div>
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
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = ['disableDoubleClickZoom'];

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

  constructor(private _elem: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper) {}

  /** @internal */
  ngOnInit() {
    const container = this._elem.nativeElement.querySelector('.sebm-google-map-container');
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

  private static _containsMapOptionsChange(changesKeys: string[]): boolean {
    return changesKeys.every(
        (key: string) => { return SebmGoogleMap._mapOptionsAttributes.indexOf(key) !== 1; });
  }

  /** @internal */
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (SebmGoogleMap._containsMapOptionsChange(Object.keys(changes))) {
      this._mapsWrapper.setMapOptions({disableDoubleClickZoom: this.disableDoubleClickZoom});
    }
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
