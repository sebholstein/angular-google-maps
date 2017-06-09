import {Directive, Input, OnDestroy, OnChanges, OnInit, SimpleChange} from '@angular/core';

import {ClusterManager} from '../services/managers/cluster-manager';
import {MarkerManager} from '../services/managers/marker-manager';

export interface IClusterStyle {
  /**
   * The image url.
   */
  url:string

  /**
   * The image height.
   */
  height:number

  /**
   * The image width.
   */
  width:number

  /**
   * The anchor position of the label text.
   */
  anchor:number[]

  /**
   * The text color.
   */
  textColor:string

  /**
   * The text size.
   */
  textSize:number

  /**
   * The position of the backgound x, y.
   */
  backgroundPosition:string

  /**
   * The anchor position of the icon x, y.
   */
  iconAnchor:number[]
}

/**
 * AgmCluster clusters map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'agm-cluster',
  providers: [ClusterManager, {provide: MarkerManager, useExisting: ClusterManager}]
})
export class AgmCluster implements OnDestroy, OnChanges, OnInit {
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
  @Input() styles: IClusterStyle;

  @Input() imagePath: string;
  @Input() imageExtension: string;

  constructor(private cluster: ClusterManager) {}

  /** @internal */
  ngOnDestroy() {
    this.cluster.clearMarkers();
  }

  /** @internal */
  ngOnChanges(changes:{[key: string]: SimpleChange}) {
    if(changes['gridSize']) {
      this.cluster.setGridSize(this);
    }
    if (changes['maxZoom']) {
      this.cluster.setMaxZoom(this);
    }
    if (changes['styles']) {
      this.cluster.setStyles(this);
    }
    if (changes['zoomOnClick']) {
      this.cluster.setZoomOnClick(this);
    }
    if (changes['averageCenter']) {
      this.cluster.setAverageCenter(this);
    }
    if (changes['minimumClusterSize']) {
      this.cluster.setMinimumClusterSize(this);
    }
    if (changes['styles']) {
      this.cluster.setStyles(this);
    }
    if (changes['imagePath']) {
      this.cluster.setImagePath(this);
    }
    if (changes['imageExtension']) {
      this.cluster.setImageExtension(this);
    }
  }

  /** @internal */
  ngOnInit() {
    this.cluster.init({
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
