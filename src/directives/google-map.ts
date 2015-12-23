import {Component, Input, Renderer, ElementRef} from 'angular2/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {MarkerManager} from '../services/marker-manager';
import {LatLng} from '../services/google-maps-types';

/**
 * Todo: add docs
 */
@Component({
  selector: 'sebm-google-map',
  providers: [GoogleMapsAPIWrapper, MarkerManager],
  styles: [
    `
    .sebm-google-map-container-inner {
      width: inherit;
      height: inherit;
    }
  `
  ],
  template: `
    <div class="sebm-google-map-container-inner"></div>
    <ng-content></ng-content>
  `
})
export class SebmGoogleMap {
  private _longitude: number = 0;
  private _latitude: number = 0;
  private _zoom: number = 8;
  private _mapsWrapper: GoogleMapsAPIWrapper;

  constructor(elem: ElementRef, _mapsWrapper: GoogleMapsAPIWrapper, renderer: Renderer) {
    this._mapsWrapper = _mapsWrapper;
    renderer.setElementClass(elem, 'sebm-google-map-container', true);
    const container = elem.nativeElement.querySelector('.sebm-google-map-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.createMap(el, this._latitude, this._longitude);
    this._handleMapCenterChange();
    this._handleMapZoomChange();
  }

  @Input()
  set zoom(value: number | string) {
    this._zoom = this._convertToDecimal(value);
    if (typeof this._zoom === 'number') {
      this._mapsWrapper.setZoom(this._zoom);
    }
  }

  @Input()
  set longitude(value: number | string) {
    this._longitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  @Input()
  set latitude(value: number | string) {
    this._latitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  private _convertToDecimal(value: string | number): number {
    if (typeof value === 'string') {
      return parseFloat(value);
    } else if (typeof value === 'number') {
      return <number>value;
    }
    return null;
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
    this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed')
        .subscribe(() => { this._mapsWrapper.getZoom().then((z: number) => this._zoom = z); });
  }
}
