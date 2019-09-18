import { Directive, Input, OnChanges, OnDestroy, OnInit, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FitBoundsAccessor, FitBoundsDetails, FitBoundsService } from '../services/fit-bounds';

/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
@Directive({
  selector: '[agmFitBounds]',
})
export class AgmFitBounds implements OnInit, OnDestroy, OnChanges {
  /**
   * If the value is true, the element gets added to the bounds of the map.
   * Default: true.
   */
  @Input() agmFitBounds = true;

  private _destroyed$: Subject<void> = new Subject<void>();
  private _latestFitBoundsDetails: FitBoundsDetails | null = null;

  constructor(
    @Self() private readonly _fitBoundsAccessor: FitBoundsAccessor,
    private readonly _fitBoundsService: FitBoundsService,
  ) {}

  /**
   * @internal
   */
  ngOnChanges() {
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
            x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng,
        ),
        takeUntil(this._destroyed$),
      )
      .subscribe(details => this._updateBounds(details));
  }

  /*
   Either the location changed, or visible status changed.
   Possible state changes are
   invisible -> visible
   visible -> invisible
   visible -> visible (new location)
  */
  private _updateBounds(newFitBoundsDetails?: FitBoundsDetails) {
    // either visibility will change, or location, so remove the old one anyway
    if (this._latestFitBoundsDetails) {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
      // don't set latestFitBoundsDetails to null, because we can toggle visibility from
      // true -> false -> true, in which case we still need old value cached here
    }

    if (newFitBoundsDetails) {
      this._latestFitBoundsDetails = newFitBoundsDetails;
    }
    if (!this._latestFitBoundsDetails) {
      return;
    }
    if (this.agmFitBounds === true) {
      this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
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
