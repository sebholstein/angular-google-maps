import {
  Component,
  Directive,
  Provider,
  Input,
  Output,
  Renderer,
  ContentChildren,
  ElementRef,
  SimpleChange,
  NgZone,
  EventEmitter,
  QueryList,
  provide
} from 'angular2/angular2';
import {
  GoogleMapsAPIWrapper,
  GoogleMapsAPIWrapperFactory
} from '../services/google_maps_api_wrapper';
import {SebmGoogleMapMarker} from './google_map_marker';
import {MarkerManager} from '../services/marker_manager';

/**
 * Todo: add docs
 */
@Component({
  selector: 'sebm-google-map',
  providers: [GoogleMapsAPIWrapperFactory, MarkerManager],
  viewProviders: [MarkerManager],
  styles: [
    `
    .sebm-google-map-container-inner {
      width: inherit;
      height: inherit;
      display: block;
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

  constructor(
      private elem: ElementRef, private _zone: NgZone, mapsFactory: GoogleMapsAPIWrapperFactory,
      renderer: Renderer) {
    renderer.setElementClass(elem, 'sebm-google-map-container', true);
    this._initMapInstance(
        elem.nativeElement.querySelector('.sebm-google-map-container-inner'), mapsFactory);
  }

  private _initMapInstance(el: HTMLElement, mapsFactory: GoogleMapsAPIWrapperFactory) {
    this._mapsWrapper = mapsFactory.create(el, this._latitude, this._longitude);
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
    this._mapsWrapper.getCenterChangeObservable().subscribe((latLng: google.maps.LatLngLiteral) => {
      this._latitude = latLng.lat;
      this._longitude = latLng.lng;
    });
  }

  private _handleZoomChanged() {
    this._mapsWrapper.getZoomChangeObserable().subscribe((zoom: number) => this._zoom = zoom);
  }
}
