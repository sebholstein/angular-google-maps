import {Directive, Input, OnDestroy, OnChanges, OnInit, SimpleChange} from '@angular/core';

import {ClusterManager} from '../services/managers/cluster-manager';
import {MarkerManager, InfoWindowManager} from '@agm/core';

import {ClusterOptions, ClusterStyle} from '../services/google-clusterer-types';

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
    {provide: MarkerManager, useExisting: ClusterManager},
    InfoWindowManager,
  ]
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
  @Input() styles: ClusterStyle;

  @Input() imagePath: string;
  @Input() imageExtension: string;

  constructor(private _clusterManager: ClusterManager) {}

  /** @internal */
  ngOnDestroy() {
    this._clusterManager.clearMarkers();
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange }) {
    if (changes['gridSize']) {
      this._clusterManager.setGridSize(this);
    }
    if (changes['maxZoom']) {
      this._clusterManager.setMaxZoom(this);
    }
    if (changes['styles']) {
      this._clusterManager.setStyles(this);
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
    if (changes['styles']) {
      this._clusterManager.setStyles(this);
    }
    if (changes['imagePath']) {
      this._clusterManager.setImagePath(this);
    }
    if (changes['imageExtension']) {
      this._clusterManager.setImageExtension(this);
    }
  }

  /** @internal */
  ngOnInit() {
    this._clusterManager.init({
      gridSize: this.gridSize,
      maxZoom: this.maxZoom,
      zoomOnClick: this.zoomOnClick,
      averageCenter: this.averageCenter,
      minimumClusterSize: this.minimumClusterSize,
      styles: this.styles,
      imagePath: this.imagePath,
      imageExtension: this.imageExtension,
    });
  }
}
