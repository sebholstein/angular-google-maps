import { Directive, Input, OnDestroy, OnChanges, OnInit, SimpleChange } from '@angular/core';

import { ClusterManager } from '../services/managers/cluster-manager';
import { MarkerManager, InfoWindowManager } from '@agm/core';

import { CalculateFunction, ClusterOptions, ClusterStyle } from '../services/google-clusterer-types';

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
  @Input() styles: ClusterStyle[];

  /**
   * A function that calculates the cluster style and text based on the markers in the cluster.
   */
  @Input() calculator: CalculateFunction;

  @Input() imagePath: string;
  @Input() imageExtension: string;

  /**
   * The name of the CSS class defining general styles for the cluster markers.
   * Use this class to define CSS styles that are not set up by the code that
   * processes the `styles` array.
   *
   * @defaultValue 'cluster'
   */
  @Input() clusterClass: string;

  /**
   * Whether to allow the use of cluster icons that have sizes that are some
   * multiple (typically double) of their actual display size. Icons such as
   * these look better when viewed on high-resolution monitors such as Apple's
   * Retina displays. Note: if this property is `true`, sprites cannot be used
   * as cluster icons.
   *
   * @defaultValue false
   */
  @Input() enableRetinaIcons: boolean;

  /**
   * Whether to ignore hidden markers in clusters. You may want to set this to
   * `true` to ensure that hidden markers are not included in the marker count
   * that appears on a cluster marker (this count is the value of the `text`
   * property of the result returned by the default `calculator`). If set to
   * `true` and you change the visibility of a marker being clustered, be sure
   * to also call `MarkerClusterer.repaint()`.
   *
   * @defaultValue false
   */
  @Input() ignoreHidden: boolean;

  /**
   * An array of numbers containing the widths of the group of
   * `<imagePath><n>.<imageExtension>` image files. (The images are assumed to
   * be square.)
   *
   * @defaultValue [53, 56, 66, 78, 90]
   */
  @Input() imageSizes: number[];

  /**
   * The tooltip to display when the mouse moves over a cluster marker.
   * (Alternatively, you can use a custom `calculator` function to specify a
   * different tooltip for each cluster marker.)
   *
   * @defaultValue ''
   */
  @Input() title: string;

  constructor(private _clusterManager: ClusterManager) { }

  /** @internal */
  ngOnDestroy() {
    this._clusterManager.clearMarkers();
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
    if (changes['clusterClass']) {
      this._clusterManager.setClusterClass(this);
    }
    if (changes['enableRetinaIcons']) {
      this._clusterManager.setEnableRetinaIcons(this);
    }
    if (changes['ignoreHidden']) {
      this._clusterManager.setIgnoreHidden(this);
    }
    if (changes['imageSizes']) {
      this._clusterManager.setImageSizes(this);
    }
    if (changes['title']) {
      this._clusterManager.setTitle(this);
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
      calculator: this.calculator,
      clusterClass: this.clusterClass,
      enableRetinaIcons: this.enableRetinaIcons,
      ignoreHidden: this.ignoreHidden,
      imageSizes: this.imageSizes,
      title: this.title,
    });
  }
}
