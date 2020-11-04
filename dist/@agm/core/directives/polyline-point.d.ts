import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { LatLngLiteral } from '../../core/services/google-maps-types';
import { FitBoundsAccessor, FitBoundsDetails } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
export declare class AgmPolylinePoint implements OnChanges, FitBoundsAccessor {
    /**
     * The latitude position of the point.
     */
    latitude: number;
    /**
     * The longitude position of the point;
     */
    longitude: number;
    /**
     * This event emitter gets emitted when the position of the point changed.
     */
    positionChanged: EventEmitter<LatLngLiteral>;
    constructor();
    ngOnChanges(changes: SimpleChanges): any;
    /** @internal */
    getFitBoundsDetails$(): Observable<FitBoundsDetails>;
}
