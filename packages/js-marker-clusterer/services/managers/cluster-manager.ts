import {Injectable, NgZone, SkipSelf} from '@angular/core';

import 'js-marker-clusterer';

import {MarkerManager} from '../../../core/services/managers/marker-manager';
import {GoogleMapsAPIWrapper} from '../../../core/services/google-maps-api-wrapper';
import {AgmMarker} from '../../../core/directives/marker';
import {AgmMarkerCluster} from './../../directives/marker-cluster';
import {ClusterOptions, MarkerClustererInstance} from '../google-clusterer-types';

declare var MarkerClusterer: any;

@Injectable()
export class ClusterManager extends MarkerManager {
  private _clustererInstance: Promise<MarkerClustererInstance>;
  private _resolver: Function;

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone, @SkipSelf() protected _markerManager: MarkerManager) {
    super(_mapsWrapper, _zone, _markerManager);
    this._clustererInstance = new Promise<MarkerClustererInstance>((resolver) => {
      this._resolver = resolver;
    });
  }

  init(options: ClusterOptions): void {
    this._mapsWrapper.getNativeMap().then(map => {
      const clusterer = new MarkerClusterer(map, [], options);
      this._resolver(clusterer);
    });
  }

  addMarker(marker: AgmMarker): void {
    this._markerManager.addMarker(marker, false);

    const markerPromise = this._markerManager.getNativeMarker(marker);

    this._markers.set(marker, markerPromise);

    Promise.all([
      this._clustererInstance,
      markerPromise,
    ]).then(([cluster, nativeMarker]) => {
      cluster.addMarker(nativeMarker);
    });
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    return Promise.all([
      this._clustererInstance,
      this._markerManager.getNativeMarker(marker),
    ]).then(([cluster, nativeMarker]) => {
      if (this._markers.has(marker)) {
        cluster.removeMarker(nativeMarker);

        this._markers.delete(marker);

        return this._markerManager.deleteMarker(marker);
      }
    });
  }

  clearMarkers(): Promise<void> {
    return this._clustererInstance.then(cluster => {
      cluster.clearMarkers();

      const markers = Array.from(this._markers.keys());
      this._markers.clear();

      return this._markerManager.deleteMarkers(markers);
    });
  }

  setGridSize(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      cluster.setGridSize(c.gridSize);
    });
  }

  setMaxZoom(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      cluster.setMaxZoom(c.maxZoom);
    });
  }

  setStyles(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      cluster.setStyles(c.styles);
    });
  }

  setZoomOnClick(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      if (c.zoomOnClick !== undefined) {
        cluster.zoomOnClick_ = c.zoomOnClick;
      }
    });
  }

  setAverageCenter(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      if (c.averageCenter !== undefined) {
        cluster.averageCenter_ = c.averageCenter;
      }
    });
  }

  setImagePath(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      if (c.imagePath !== undefined) {
        cluster.imagePath_ = c.imagePath;
      }
    });
  }

  setMinimumClusterSize(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      if (c.minimumClusterSize !== undefined) {
        cluster.minimumClusterSize_ = c.minimumClusterSize;
      }
    });
  }

  setImageExtension(c: AgmMarkerCluster): void {
    this._clustererInstance.then(cluster => {
      if (c.imageExtension !== undefined) {
        cluster.imageExtension_ = c.imageExtension;
      }
    });
  }
}
