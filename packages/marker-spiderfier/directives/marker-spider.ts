import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {InfoWindowManager, MarkerManager} from '@agm/core';
import {Marker} from '@agm/core/services/google-maps-types';
import {SpiderManager} from '../services/managers/spider-manager';

import {FormatEvent, LegColorOptions, SpiderfyEvent, SpiderOptions} from '../services/google-spider-types';

/**
 * AgmMarkerSpider spiderfies map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker-spider>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-spider>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-marker-spider',
  providers: [
    SpiderManager,
    {provide: MarkerManager, useExisting: SpiderManager},
    InfoWindowManager,
  ]
})
export class AgmMarkerSpider implements OnDestroy, OnChanges, OnInit, SpiderOptions {
  /**
   * The colors of the legs
   */
  @Input() legColors: LegColorOptions;

  /**
   * Disable listening for marker move events (in case markers won't be dragged/moved)
   */
  @Input() markersWontMove: boolean;

  /**
   * Disable listening for visibility events (in case markers won't be hidden)
   */
  @Input() markersWontHide: boolean;

  /**
   * Disable the OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE event
   */
  @Input() basicFormatEvents: boolean;

  /**
   * Do not unspiderify the markers when one of them is clicked
   */
  @Input() keepSpiderfied: boolean;

  /**
   * Do not unspiderify when the map is clicked
   */
  @Input() ignoreMapClick: boolean;

  /**
   * The pixel radius within which a marker is considered overlapping
   */
  @Input() nearbyDistance: number;

  /**
   * The amount of markers before the spiderfier switches to spiral mode
   */
  @Input() circleSpiralSwitchover: number;

  /**
   * The distance for the spiderfied markers from the center (circle mode)
   */
  @Input() circleFootSeparation: number;

  /**
   * The starting angle for the spiderfied markers (circle mode)
   */
  @Input() circleStartAngle: number;

  /**
   * The distance for the spiderfied markers from the center (spiral mode)
   */
  @Input() spiralFootSeparation: number;

  /**
   * The distance between the spiderfied markers from the first to the second (spiral mode)
   */
  @Input() spiralLengthStart: number;

  /**
   * The increment to the distance for each consecutive marker (spiral mode)
   */
  @Input() spiralLengthFactor: number;

  /**
   * The thickness of the marker lines
   */
  @Input() legWeight: number;

  /**
   * Triggers when a marker is formatted, can be used to style the icon
   */
  @Output() format: EventEmitter<FormatEvent> = new EventEmitter<FormatEvent>();

  /**
   * Triggers when markers are spiderfied (expanded)
   */
  @Output() spiderfy: EventEmitter<SpiderfyEvent> = new EventEmitter<SpiderfyEvent>();

  /**
   * Triggers when markers are unspiderfied (collapsed)
   */
  @Output() unspiderfy: EventEmitter<SpiderfyEvent> = new EventEmitter<SpiderfyEvent>();

  constructor(private _spiderManager: SpiderManager, private _ngZone: NgZone) {
  }

  /** @internal */
  ngOnDestroy() {
    this._spiderManager.clearMarkers();
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['legColors']) {
      this._spiderManager.setLegColors(this);
    }
    if (changes['markersWontMove']) {
      this._spiderManager.setMarkersWontMove(this);
    }
    if (changes['markersWontHide']) {
      this._spiderManager.setMarkersWontHide(this);
    }
    if (changes['basicFormatEvents']) {
      this._spiderManager.setBasicFormatEvents(this);
    }
    if (changes['keepSpiderfied']) {
      this._spiderManager.setKeepSpiderfied(this);
    }
    if (changes['ignoreMapClick']) {
      this._spiderManager.setIgnoreMapClick(this);
    }
    if (changes['nearbyDistance']) {
      this._spiderManager.setNearbyDistance(this);
    }
    if (changes['circleSpiralSwitchover']) {
      this._spiderManager.setCircleSpiralSwitchover(this);
    }
    if (changes['circleFootSeparation']) {
      this._spiderManager.setCircleFootSeparation(this);
    }
    if (changes['circleStartAngle']) {
      this._spiderManager.setCircleStartAngle(this);
    }
    if (changes['spiralFootSeparation']) {
      this._spiderManager.setSpiralFootSeparation(this);
    }
    if (changes['spiralLengthStart']) {
      this._spiderManager.setSpiralLengthStart(this);
    }
    if (changes['spiralLengthFactor']) {
      this._spiderManager.setSpiralLengthFactor(this);
    }
    if (changes['legWeight']) {
      this._spiderManager.setLegWeight(this);
    }
  }

  /** @internal */
  ngOnInit() {
    this._spiderManager.init({
      markersWontMove: this.markersWontMove,
      markersWontHide: this.markersWontHide,
      basicFormatEvents: this.basicFormatEvents,
      keepSpiderfied: this.keepSpiderfied,
      ignoreMapClick: this.ignoreMapClick,
      nearbyDistance: this.nearbyDistance,
      circleSpiralSwitchover: this.circleSpiralSwitchover,
      circleFootSeparation: this.circleFootSeparation,
      circleStartAngle: this.circleStartAngle,
      spiralFootSeparation: this.spiralFootSeparation,
      spiralLengthStart: this.spiralLengthStart,
      spiralLengthFactor: this.spiralLengthFactor,
      legWeight: this.legWeight,
    });

    this._spiderManager.instance.then(spiderfier => {
      spiderfier.addListener('format', (marker: Marker, status: string) => this._ngZone.run(() => this.format.emit({
        marker,
        status,
        spiderfier
      })));
      spiderfier.addListener('spiderfy', (changedMarkers: Marker[], unchangedMarkers: Marker[]) => this._ngZone.run(() => this.spiderfy.emit({
        changedMarkers,
        unchangedMarkers,
        spiderfier
      })));
      spiderfier.addListener('unspiderfy', (changedMarkers: Marker[], unchangedMarkers: Marker[]) => this._ngZone.run(() => this.unspiderfy.emit({
        changedMarkers,
        unchangedMarkers,
        spiderfier
      })));
    });
  }
}
