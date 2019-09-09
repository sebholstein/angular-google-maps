import { Directive, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LatLngLiteral } from '../../core/services/google-maps-types';
import { FitBoundsAccessor, FitBoundsDetails } from '../services/fit-bounds';

/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
@Directive({
  selector: 'agm-polyline-point',
  providers: [
    {provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint)},
  ],
})
export class AgmPolylinePoint implements OnChanges, FitBoundsAccessor {
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
      const position: LatLngLiteral = {
        lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
        lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
      } as LatLngLiteral;
      this.positionChanged.emit(position);
    }
  }

  /** @internal */
  getFitBoundsDetails$(): Observable<FitBoundsDetails> {
    return this.positionChanged.pipe(
      startWith({lat: this.latitude, lng: this.longitude}),
      map(position => ({latLng: position}))
    );
  }
}
