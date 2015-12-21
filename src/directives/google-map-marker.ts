import {
  Directive,
  Input,
  SimpleChange,
  OnDestroy,
  OnChanges,
  EventEmitter,
  Output
} from 'angular2/core';
import {MarkerManager} from '../services/marker-manager';

let markerId = 0;

@Directive({selector: 'sebm-google-map-marker'})
export class SebmGoogleMapMarker implements OnDestroy, OnChanges {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() title: string;
  @Input() label: string;
  @Output() markerClick: EventEmitter<void> = new EventEmitter<void>();

  private _markerAddedToManger: boolean = false;
  private _id: string;

  constructor(private _markerManager: MarkerManager) { this._id = (markerId++).toString(); }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._markerAddedToManger && this.latitude && this.longitude) {
      this._markerManager.addMarker(this);
      this._markerAddedToManger = true;
      this._markerManager.createClickObserable(this)
          .subscribe(() => { this.markerClick.next(null); });
      return;
    }
    if (changes['latitude'] || changes['logitude']) {
      this._markerManager.updateMarkerPosition(this);
    }
    if (changes['title']) {
      this._markerManager.updateTitle(this);
    }
    if (changes['label']) {
      this._markerManager.updateLabel(this);
    }
  }

  id(): string { return this._id; }

  toString(): string { return 'SebmGoogleMapMarker-' + this._id.toString(); }

  ngOnDestroy() { this._markerManager.deleteMarker(this); }
}
