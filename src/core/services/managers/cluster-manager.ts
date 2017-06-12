import {Injectable, NgZone} from '@angular/core';

import 'js-marker-clusterer';

import {MarkerManager} from './marker-manager';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {AgmMarker} from './../../directives/marker';
import {AgmCluster} from './../../directives/cluster';
// tslint:disable-next-line: no-use-before-declare
import {Marker, MarkerClusterer, IClusterOptions} from '../google-maps-types';

declare var MarkerClusterer: MarkerClusterer;

class Deferred<T> {
  private _promise: Promise<T>;
  private fate: 'resolved' | 'unresolved';
  private state: 'pending' | 'fulfilled' | 'rejected';
  private _resolve: Function;
  private _reject: Function;

  constructor() {
    this.state = 'pending';
    this.fate = 'unresolved';
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this.promise.then(
      () => this.state = 'fulfilled',
      () => this.state = 'rejected',
    );
  }

  get promise(): Promise<T> {
    return this._promise;
  }

  resolve(value?: any) {
    if (this.fate === 'resolved') {
      throw 'Deferred cannot be resolved twice';
    }
    this.fate = 'resolved';
    this._resolve(value);
  }

  reject(reason?: any) {
    if (this.fate === 'resolved') {
      throw 'Deferred cannot be resolved twice';
    }
    this.fate = 'resolved';
    this._reject(reason);
  }

  isResolved() {
    return this.fate === 'resolved';
  }

  isPending() {
    return this.state === 'pending';
  }

  isFulfilled() {
    return this.state === 'fulfilled';
  }

  isRejected() {
    return this.state === 'rejected';
  }
}

@Injectable()
export class ClusterManager extends MarkerManager {
  private _deferred: Deferred<MarkerClusterer>;

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {
    super(_mapsWrapper, _zone);
    this._deferred = new Deferred<MarkerClusterer>();
  }

  init(options: IClusterOptions): void {
    this._mapsWrapper.getNativeMap().then(map => {
      const clusterer = new MarkerClusterer(map, [], options);
      this._deferred.resolve(clusterer);
      return clusterer;
    });
  }

  addMarker(marker: AgmMarker): void {
    const clusterPromise: Promise<MarkerClusterer> = this._deferred.promise;
    const markerPromise = this._mapsWrapper
      .createMarker({
        position: {
          lat: marker.latitude,
          lng: marker.longitude
        },
        label: marker.label,
        draggable: marker.draggable,
        icon: marker.iconUrl,
        opacity: marker.opacity,
        visible: marker.visible,
        zIndex: marker.zIndex,
        title: marker.title
      }, false);

    Promise
      .all([clusterPromise, markerPromise])
      .then(([cluster, marker]) => {
        return cluster.addMarker(marker);
      });
    this._markers.set(marker, markerPromise);
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    const m = this._markers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return m.then((m: Marker) => {
      this._zone.run(() => {
        this._deferred.promise.then(cluster => {
          cluster.removeMarker(m);
          this._markers.delete(marker);
        });
      });
    });
  }

  clearMarkers(): Promise<void> {
    return this._deferred.promise.then(cluster => {
      cluster.clearMarkers();
    });
  }

  setGridSize(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      cluster.setGridSize(c.gridSize);
    });
  }

  setMaxZoom(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      cluster.setMaxZoom(c.maxZoom);
    });
  }

  setStyles(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      cluster.setStyles(c.styles);
    });
  }

  setZoomOnClick(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      if (c.zoomOnClick !== undefined) {
        cluster.zoomOnClick_ = c.zoomOnClick;
      }
    });
  }

  setAverageCenter(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      if (c.averageCenter !== undefined) {
        cluster.averageCenter_ = c.averageCenter;
      }
    });
  }

  setImagePath(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      if (c.imagePath !== undefined) {
        cluster.imagePath_ = c.imagePath;
      }
    });
  }

  setMinimumClusterSize(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      if (c.minimumClusterSize !== undefined) {
        cluster.minimumClusterSize_ = c.minimumClusterSize;
      }
    });
  }

  setImageExtension(c: AgmCluster): void {
    this._deferred.promise.then(cluster => {
      if (c.imageExtension !== undefined) {
        cluster.imageExtension_ = c.imageExtension;
      }
    });
  }
}
