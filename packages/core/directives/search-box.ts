import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  ViewChild
} from '@angular/core';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import * as mapTypes from '../services/google-maps-types';
import {SearchBoxManager} from '../services/managers/search-box-manager';

declare var google: any;

/**
 * AgmSearchBox allows to add a search box to the map
 *
 * ### Example
 *
 * ```
 * <agm-search-box [placeholder]="'Search'" [position]="ControlPosition.TOP_LEFT"
 *   (placesChange)="updateRef($event)"></agm-search-box>
 * ```
 *
 */
@Component({
  selector: 'agm-search-box',
  template: '<input type="text" class="search-box" #panel placeholder="{{placeholder}}">',
  styles: [
    `.search-box {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 300px;
        margin-top: 10px;
        height: 26px;
      }

      .search-box:focus {
        border-color: #4d90fe;
      }`
  ]
})
export class AgmSearchBox implements OnInit, OnChanges {
  private searchBox: mapTypes.SearchBox;
  /**
   * @internal
   */
  @ViewChild('panel') panel: ElementRef;
  /**
   * Placeholder for the search box input
   */
  @Input() placeholder: string;
  /**
   * Position in which the control is going to placed
   * This input is required otherwise the box won't be added to the map
   */
  @Input() position: mapTypes.ControlPosition;
  /**
   * Will automatically center the map to the clicked result
   */
  @Input() autoBoundResults: boolean = true;
  /**
   * The area towards which to bias query predictions. Predictions are biased towards, but not restricted to, queries targeting these bounds.
   */
  @Input() bounds: mapTypes.LatLngBounds | mapTypes.LatLngBoundsLiteral;
  /**
   * This event is fired when the user selects a query, will return the places matching that query.
   */
  @Output() placesChange: EventEmitter<Array<mapTypes.PlaceResult>> = new EventEmitter<Array<mapTypes.PlaceResult>>();

  constructor(private gmapsApi: GoogleMapsAPIWrapper, private _manager: SearchBoxManager) {}

  /** @internal */
  ngOnInit(): void {
    this.gmapsApi.getNativeMap().then(map => {
      this._manager.createEventObservable(this).subscribe(() => {
        this.placesChange.emit(this.getSearchBoxEl().getPlaces());
        if (this.autoBoundResults) {
          this.autoBound();
        }
      });
    });
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    this.gmapsApi.getNativeMap().then(map => {
      if (changes['bounds']) {
        this.getSearchBoxEl().setBounds(this.bounds);
      }
      if (changes['position']) {
        this.updatePosition(this.position);
      }
    });
  }

  /** @internal */
  getSearchBoxEl(): mapTypes.SearchBox {
    if (this.searchBox === undefined) {
      this.searchBox = new google.maps.places.SearchBox(this.panel.nativeElement, {
        bounds: this.bounds
      });
    }
    return this.searchBox;
  }

  /** @internal */
  updatePosition(position: mapTypes.ControlPosition) {
    if (position) {
      this.gmapsApi.getControls().then((controls: mapTypes.MVCArray<Node>[]) => {
        controls[position].push(this.panel.nativeElement);
      });
    }
  }

  /** @internal */
  autoBound() {
    const places = this.getSearchBoxEl().getPlaces();

    if (places.length === 0) {
      return;
    }

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place: mapTypes.PlaceResult) => {
      if (!place.geometry) {
        console.log('Place does not contain a geometry');
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.gmapsApi.fitBounds(bounds);
  }

}
