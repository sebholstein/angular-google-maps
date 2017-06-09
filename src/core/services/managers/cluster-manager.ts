import {Injectable, NgZone} from '@angular/core';

import 'js-marker-clusterer';
declare var MarkerClusterer:any;
declare var google:any;

import {MarkerManager} from './marker-manager';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {AgmMarker} from './../../directives/marker';
import {AgmCluster} from './../../directives/cluster';
import {Marker} from '../google-maps-types';

@Injectable()
export class ClusterManager extends MarkerManager {
  private _promise:Promise<any>;
  private _resolve:any;

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {
    super(_mapsWrapper, _zone);
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
    });
  }

  init(options:{}) {
    this._mapsWrapper.getNativeMap().then(map => {
      this._resolve(new MarkerClusterer(map, [], options));
    })
  }

  addMarker(marker: AgmMarker) {
    const markerPromise =
      this._promise.then(cluster => {
        return cluster.addMarker(new google.maps.Marker({
          position: {lat: marker.latitude, lng: marker.longitude},
          label: marker.label,
          draggable: marker.draggable,
          icon: marker.iconUrl,
          opacity: marker.opacity,
          visible: marker.visible,
          zIndex: marker.zIndex,
          title: marker.title
        }));
      });
    this._markers.set(marker, markerPromise);
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    const m = this._markers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve()
    }
    return m.then((m:Marker) => {
      this._zone.run(() => {
        this._promise.then(cluster => {
          cluster.removeMarker(m)
          this._markers.delete(marker);
        });
      });
    });
  }

  clearMarkers() {
    this._promise.then(cluster => {
      cluster.clearMarkers();
    })
  }

  setGridSize(c:AgmCluster) {
    this._promise.then(cluster => {
      cluster.setGridSize(c.gridSize);
    });
  }

  setMaxZoom(c:AgmCluster) {
    this._promise.then(cluster => {
      cluster.setMaxZoom(c.maxZoom);
    });
  }

  setStyles(c:AgmCluster) {
    this._promise.then(cluster => {
      cluster.setStyles(c.styles);
    });
  }

  setZoomOnClick(c:AgmCluster) {
    this._promise.then(cluster => {
      if (c.zoomOnClick != undefined) {
        cluster.zoomOnClick_ = c.zoomOnClick;
      }
    });
  }

  setAverageCenter(c:AgmCluster) {
    this._promise.then(cluster => {
      if (c.averageCenter != undefined) {
        cluster.averageCenter_ = c.averageCenter;
      }
    })
  }

  setImagePath(c:AgmCluster) {
    this._promise.then(cluster => {
      if (c.imagePath != undefined) {
        cluster.imagePath_ = c.imagePath;
      }
    })
  }

  setMinimumClusterSize(c:AgmCluster) {
    this._promise.then(cluster => {
      if (c.minimumClusterSize != undefined) {
        cluster.minimumClusterSize_ = c.minimumClusterSize;
      }
    });
  }

  setImageExtension(c:AgmCluster) {
    this._promise.then(cluster => {
      if (c.imageExtension != undefined) {
        cluster.imageExtension_ = c.imageExtension;
      }
    })
  }
}
