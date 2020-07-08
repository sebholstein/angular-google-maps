import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import { MarkerClustererOptions } from '@google/markerclustererplus';
import MarkerClusterer from '@google/markerclustererplus';
import { Observable, Subscriber } from 'rxjs';
import { AgmMarkerCluster } from '../../directives/marker-cluster';

@Injectable()
export class ClusterManager extends MarkerManager {
  private _clustererInstance: Promise<MarkerClusterer>;
  private _resolver: (cluster: MarkerClusterer) => void;

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {
    super(_mapsWrapper, _zone);
    this._clustererInstance = new Promise<MarkerClusterer>((resolver) => {
      this._resolver = resolver;
    });
  }

  init(options: MarkerClustererOptions): void {
    this._mapsWrapper.getNativeMap().then(map => {
      const clusterer = new MarkerClusterer(map, [], options);
      this._resolver(clusterer);
    });
  }

  getClustererInstance(): Promise<MarkerClusterer> {
    return this._clustererInstance;
  }

  addMarker(markerDirective: AgmMarker): void {
    const clusterPromise: Promise<MarkerClusterer> = this.getClustererInstance();
    const markerPromise = this._mapsWrapper
      .createMarker({
        position: {
          lat: markerDirective.latitude,
          lng: markerDirective.longitude,
        },
        label: markerDirective.label,
        draggable: markerDirective.draggable,
        icon: markerDirective.iconUrl,
        opacity: markerDirective.opacity,
        visible: markerDirective.visible,
        zIndex: markerDirective.zIndex,
        title: markerDirective.title,
        clickable: markerDirective.clickable,
      }, false);

    Promise
      .all([clusterPromise, markerPromise])
      .then(([cluster, marker]) => cluster.addMarker(marker));
    this._markers.set(markerDirective, markerPromise);
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    const markerPromise = this._markers.get(marker);
    if (markerPromise == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return markerPromise.then((m: google.maps.Marker) => {
      this._zone.run(() => {
        m.setMap(null);
        this.getClustererInstance().then(cluster => {
          cluster.removeMarker(m);
          this._markers.delete(marker);
        });
      });
    });
  }

  clearMarkers(): Promise<void> {
    return this.getClustererInstance().then(cluster => {
      cluster.clearMarkers();
    });
  }

  setGridSize(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      cluster.setGridSize(c.gridSize);
    });
  }

  setMaxZoom(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      cluster.setMaxZoom(c.maxZoom);
    });
  }

  setStyles(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      cluster.setStyles(c.styles);
    });
  }

  setZoomOnClick(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (c.zoomOnClick !== undefined) {
        cluster.setZoomOnClick(c.zoomOnClick);
      }
    });
  }

  setAverageCenter(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (c.averageCenter !== undefined) {
        cluster.setAverageCenter(c.averageCenter);
      }
    });
  }

  setImagePath(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (c.imagePath !== undefined) {
        cluster.setImagePath(c.imagePath);
      }
    });
  }

  setMinimumClusterSize(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (c.minimumClusterSize !== undefined) {
        cluster.setMinimumClusterSize(c.minimumClusterSize);
      }
    });
  }

  setImageExtension(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (c.imageExtension !== undefined) {
        cluster.setImageExtension(c.imageExtension);
      }
    });
  }

  createClusterEventObservable<T>(eventName: string): Observable<T> {
    return new Observable((subscriber: Subscriber<T>) => {
      this._zone.runOutsideAngular(() => {
        this._clustererInstance.then((m: MarkerClusterer) => {
          m.addListener(eventName, (e: T) => this._zone.run(() => subscriber.next(e)));
        });
      });
    });
  }

  setCalculator(c: AgmMarkerCluster): void {
    this.getClustererInstance().then(cluster => {
      if (typeof c.calculator === 'function') {
        cluster.setCalculator(c.calculator);
      }
    });
  }

  async setClusterClass(c: AgmMarkerCluster) {
    if (typeof c.clusterClass !== 'undefined') {
      const instance = await this.getClustererInstance();
      instance.setClusterClass(c.clusterClass);
    }
  }

  async setEnableRetinaIcons(c: AgmMarkerCluster) {
    if (typeof c.enableRetinaIcons !== 'undefined') {
      const instance = await this.getClustererInstance();
      instance.setEnableRetinaIcons(c.enableRetinaIcons);
    }
  }

  async setIgnoreHidden(c: AgmMarkerCluster) {
    if (typeof c.ignoreHidden !== 'undefined') {
      const instance = await this.getClustererInstance();
      instance.setIgnoreHidden(c.ignoreHidden);
    }
  }

  async setImageSizes(c: AgmMarkerCluster) {
    if (typeof c.imageSizes !== 'undefined') {
      const instance = await this.getClustererInstance();
      instance.setImageSizes(c.imageSizes);
    }
  }

  async setTitle(c: AgmMarkerCluster) {
    if (typeof c.title !== 'undefined') {
      const instance = await this.getClustererInstance();
      instance.setTitle(c.title);
    }
  }
}
