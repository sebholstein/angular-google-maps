import {Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LatLngLiteral} from '../../core/services/google-maps-types';

/**
 * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
@Directive({selector: 'sebm-google-map-polyline-point'})
export class SebmGoogleMapPolylinePoint implements OnChanges {
  /**
   * The latitude position of the point.
   */
  @Input() public latitude: number;

  /**
   * The longitude position of the point;
   */
  @Input() public longitude: number;

  /**
   * This event emitter gets emitted when the position of the point changed.
   */
  @Output() positionChanged: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): any {
    if (changes['latitude'] || changes['longitude']) {
      const position: LatLngLiteral = <LatLngLiteral>{
        lat: changes['latitude'].currentValue,
        lng: changes['longitude'].currentValue
      };
      this.positionChanged.emit(position);
    }
  }
}
