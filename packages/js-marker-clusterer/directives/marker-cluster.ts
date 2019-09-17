import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';

import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterManager } from '../services/managers/cluster-manager';

import { CalculateFunction, ClusterOptions, ClusterStyle } from '../services/google-clusterer-types';

import { Subscription } from 'rxjs';

/**
 * AgmMarkerCluster clusters map marker if they are near together
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
 *      <agm-marker-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-marker-cluster',
  providers: [
    ClusterManager,
    { provide: MarkerManager, useExisting: ClusterManager },
    InfoWindowManager,
  ],
})
export class AgmMarkerCluster implements OnDestroy, OnChanges, OnInit, ClusterOptions {
  /**
   * The grid size of a cluster in pixels
   */
  @Input() gridSize: number;

  /**
   * The maximum zoom level that a marker can be part of a cluster.
   */
  @Input() maxZoom: number;

  /**
   * Whether the default behaviour of clicking on a cluster is to zoom into it.
   */
  @Input() zoomOnClick: boolean;

  /**
   * Whether the center of each cluster should be the average of all markers in the cluster.
   */
  @Input() averageCenter: boolean;

  /**
   * The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
   */
  @Input() minimumClusterSize: number;

  /**
   * An object that has style properties.
   */
  @Input() styles: ClusterStyle[];

  /**
   * A function that calculates the cluster style and text based on the markers in the cluster.
   */
  @Input() calculator: CalculateFunction;

  @Input() imagePath: string;
  @Input() imageExtension: string;

  @Output() clusterClick: EventEmitter<void> = new EventEmitter<void>();

  private _observableSubscriptions: Subscription[] = [];
  constructor(private _clusterManager: ClusterManager) { }

  /** @internal */
  ngOnDestroy() {
    this._clusterManager.clearMarkers();
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  /** @internal */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['gridSize']) {
      this._clusterManager.setGridSize(this);
    }
    if (changes['maxZoom']) {
      this._clusterManager.setMaxZoom(this);
    }
    if (changes['zoomOnClick']) {
      this._clusterManager.setZoomOnClick(this);
    }
    if (changes['averageCenter']) {
      this._clusterManager.setAverageCenter(this);
    }
    if (changes['minimumClusterSize']) {
      this._clusterManager.setMinimumClusterSize(this);
    }
    if (changes['imagePath']) {
      this._clusterManager.setImagePath(this);
    }
    if (changes['imageExtension']) {
      this._clusterManager.setImageExtension(this);
    }
    if (changes['calculator']) {
      this._clusterManager.setCalculator(this);
    }
    if (changes['styles']) {
      this._clusterManager.setStyles(this);
    }
  }

  private _addEventListeners() {
    const handlers = [
      {
        name: 'clusterclick',
        handler: () => this.clusterClick.emit(),
      },
    ];
    handlers.forEach((obj) => {
      const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
      this._observableSubscriptions.push(os);
    });
  }

  /** @internal */
  ngOnInit() {
    this._addEventListeners();
    this._clusterManager.init({
      gridSize: this.gridSize,
      maxZoom: this.maxZoom,
      zoomOnClick: this.zoomOnClick,
      averageCenter: this.averageCenter,
      minimumClusterSize: this.minimumClusterSize,
      styles: this.styles,
      imagePath: this.imagePath,
      imageExtension: this.imageExtension,
      calculator: this.calculator,
    });
  }
}
