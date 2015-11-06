import {Directive, Input, provide, Host, Inject, SkipSelf, SimpleChange} from 'angular2/angular2';
import {GoogleMapsAPIWrapper} from '../services/google_maps_api_wrapper';
import {MarkerManager} from '../services/marker_manager';
import {SebmGoogleMap} from './google_map';

let markerId = 0;

@Directive({
  selector: 'sebm-google-map-marker'
})
export class SebmGoogleMapMarker {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() title: string;

  private _markerAddedToManger: boolean = false;
  private _id: string;

  constructor(@Host() @SkipSelf() private _map: SebmGoogleMap, private _markerManager: MarkerManager) {
    this._id = (markerId++).toString();
  }

  onChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._markerAddedToManger && this.latitude && this.longitude) {
      this._markerManager.addMarker(this);
      this._markerAddedToManger = true;
      return;
    }
    if (changes['latitude'] || changes['logitude']) {
      this._markerManager.updateMarkerPosition(this);
    }
    if (changes['title']) {
      this._markerManager.updateTitle(this);
    }
  }

  id(): string {
    return this._id;
  }

  toString(): string {
    return 'SebmGoogleMapMarker-' + this._id.toString();
  }

  onDestroy() {
    this._markerManager.deleteMarker(this);
  }
}
