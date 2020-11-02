import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';

import { Subscription } from 'rxjs';

import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterIconStyle, MarkerClustererOptions } from '@google/markerclustererplus';
import { Calculator } from '@google/markerclustererplus/dist/markerclusterer';
import { ClusterManager } from '../services/managers/cluster-manager';
import { Cluster } from '@google/markerclustererplus/dist/cluster';

// tslint:disable: jsdoc-format
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
```typescript
import { Component } from '@angular/core';

@Component({
 selector: 'my-map-cmp',
 styles: [`
   agm-map {
     height: 300px;
   }
 `],
 template: `
   <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     <agm-marker-cluster>
       <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
       </agm-marker>
       <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
       </agm-marker>
     </agm-marker-cluster>
   </agm-map>
 `
})
```
 */
// tslint:enable: jsdoc-format
@Directive({
  selector: 'agm-marker-cluster',
  providers: [
    ClusterManager,
    { provide: MarkerManager, useExisting: ClusterManager },
    InfoWindowManager,
  ],
})
export class AgmMarkerCluster implements OnDestroy, OnChanges, OnInit, MarkerClustererOptions {
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
  @Input() styles: ClusterIconStyle[];

  /**
   * A function that calculates the cluster style and text based on the markers in the cluster.
   */
  @Input() calculator: Calculator;

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

  @Output() clusterClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() mouseOver: EventEmitter<Cluster> = new EventEmitter<Cluster>();
  @Output() mouseOut: EventEmitter<Cluster> = new EventEmitter<Cluster>();

  private _observableSubscriptions: Subscription[] = [];

  constructor(private _clusterManager: ClusterManager) { }

  /** @internal */
  ngOnDestroy() {
    this._clusterManager.clearMarkers();
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  /** @internal */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    // tslint:disable: no-string-literal
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
    // tslint:enable: no-string-literal

  }

  private _addEventListeners() {
    const handlers = [
      {
        name: 'clusterclick',
        handler: () => this.clusterClick.emit(),
      },
      {
        name: 'mouseover',
        handler: (cluster) => this.mouseOver.emit(cluster),
      },
      {
        name: 'mouseout',
        handler: (cluster) => this.mouseOut.emit(cluster),
      }
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
      averageCenter: this.averageCenter,
      calculator: this.calculator,
      clusterClass: this.clusterClass,
      enableRetinaIcons: this.enableRetinaIcons,
      gridSize: this.gridSize,
      ignoreHidden: this.ignoreHidden,
      imageExtension: this.imageExtension,
      imagePath: this.imagePath,
      imageSizes: this.imageSizes,
      maxZoom: this.maxZoom,
      minimumClusterSize: this.minimumClusterSize,
      styles: this.styles,
      title: this.title,
      zoomOnClick: this.zoomOnClick,
    });
  }
}
