import { Directive, OnInit, Self, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FitBoundsService, FitBoundsAccessor, FitBoundsDetails } from '../services/fit-bounds';
import { Subscription, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LatLng, LatLngLiteral } from '@agm/core';

/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
@Directive({
  selector: '[agmFitBounds]'
})
export class AgmFitBounds implements OnInit, OnDestroy, OnChanges {
  /**
   * If the value is true, the element gets added to the bounds of the map.
   * Default: true.
   */
  @Input() agmFitBounds: boolean = true;

  private _destroyed$: Subject<void> = new Subject<void>();
  private _latestFitBoundsDetails: FitBoundsDetails | null = null;

  constructor(
    @Self() private readonly _fitBoundsAccessor: FitBoundsAccessor,
    private readonly _fitBoundsService: FitBoundsService
  ) {}

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    this._updateBounds();
  }

  /**
   * @internal
   */
  ngOnInit() {
    this._fitBoundsAccessor
      .getFitBoundsDetails$()
      .pipe(
        distinctUntilChanged(
          (x: FitBoundsDetails, y: FitBoundsDetails) =>
            x.latLng.lat === y.latLng.lng
        ),
        takeUntil(this._destroyed$)
      )
      .subscribe(details => this._updateBounds(details));
  }

  private _updateBounds(newFitBoundsDetails?: FitBoundsDetails) {
    if (newFitBoundsDetails) {
      this._latestFitBoundsDetails = newFitBoundsDetails;
    }
    if (!this._latestFitBoundsDetails) {
      return;
    }
    if (this.agmFitBounds) {
      this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
    } else {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
    if (this._latestFitBoundsDetails !== null) {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
  }
}
