import {Component, Directive, Input, ContentChild, ViewEncapsulation, ElementRef, ViewChild, SimpleChange, NgZone} from 'angular2/angular2';
import {GoogleMapsAPIWrapper} from '../services/google_maps_api_wrapper';

/**
 * Container directive to create the Google Maps instance on a child element.
 */
@Directive({
  selector: '[sebm-google-map-container]',
})
class SebmGoogleMapContainer {
  constructor(private _el: ElementRef) {}

  getNativeElement(): HTMLElement {
    return this._el.nativeElement;
  }
}
/**
 * Todo: add docs
 */
@Component({
  selector: 'sebm-google-map',
  directives: [SebmGoogleMapContainer],
  providers: [GoogleMapsAPIWrapper],
  styles: [`
    sebm-google-map-container {
      width: 100%;
      display: block;
    }
  `],
  template: `
    <div sebm-google-map-container class="sebm-google-map-container"></div>
    <ng-content></ng-content>
  `
})
export class SebmGoogleMap {
  @ViewChild(SebmGoogleMapContainer) private _container: SebmGoogleMapContainer;
  @Input() longitude: number = 0;
  @Input() latitude: number = 0;
  @Input() zoom: number = 8;

  constructor(private _zone: NgZone, private _mapsWrapper: GoogleMapsAPIWrapper) {}

  afterViewInit() {
    this._initMapInstance(this._container.getNativeElement());
  }

  onChanges(changes: {[key:string]: SimpleChange}) {
    if (!this._mapsWrapper.isInitialized()) {
      return;
    }
    this._updateLatLng(changes);
  }

  private _updateLatLng(changes: {[key:string]: SimpleChange}) {
    if (changes['latitude'] || changes['longitude']) {
      this._mapsWrapper.panTo({
        lat: this.latitude,
        lng: this.longitude,
      });
    }
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.initialize(el, this.latitude, this.longitude, this.zoom);
    this._handleMapsCenterChanged();
    this._handleZoomChanged();
  }

  private _handleMapsCenterChanged() {
    this._mapsWrapper.getCenterChangeObservable().subscribe((latLng: google.maps.LatLngOptions) => {
      this.latitude = latLng.lat;
      this.longitude = latLng.lng;
    });
  }

  private _handleZoomChanged() {
    this._mapsWrapper.getZoomChangeObserable().subscribe((zoom: number) => this.zoom = zoom);
  }
}
