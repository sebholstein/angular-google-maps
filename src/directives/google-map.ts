import {Component, Input, Renderer, ElementRef, NgZone} from 'angular2/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {MarkerManager} from '../services/marker-manager';
import {LatLngLiteral} from '../services/google-maps-types';

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
  private _zone: NgZone;

  constructor(
      elem: ElementRef, _mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone, renderer: Renderer) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    renderer.setElementClass(elem, 'sebm-google-map-container', true);
    const container = elem.nativeElement.querySelector('.sebm-google-map-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.createMap(el, this._latitude, this._longitude);
    this._handleMapsCenterChanged();
    this._handleZoomChanged();
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

  private _handleMapsCenterChanged() {
    this._mapsWrapper.getCenterChangeObservable().subscribe((latLng: LatLngLiteral) => {
      this._latitude = latLng.lat;
      this._longitude = latLng.lng;
    });
  }

  private _handleZoomChanged() {
    this._mapsWrapper.getZoomChangeObserable().subscribe((zoom: number) => this._zoom = zoom);
  }
}
