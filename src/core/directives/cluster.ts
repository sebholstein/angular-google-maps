import {Directive, Input, OnDestroy, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ClusterManager} from '../services/managers/cluster-manager';
import {MarkerManager} from '../services/managers/marker-manager';

@Directive({
  selector: 'agm-cluster',
  providers: [ClusterManager, {provide: MarkerManager, useExisting: ClusterManager}]
})
export class AgmCluster implements OnDestroy, OnChanges, OnInit {
  @Input() gridSize: number;
  @Input() maxZoom: number;
  @Input() zoomOnClick: boolean;
  @Input() averageCenter: boolean;
  @Input() minimumClusterSize: number;
  @Input() styles: Object;
  @Input() imagePath: string;
  @Input() imageExtension: string;

  constructor(private cluster: ClusterManager) {}

  ngOnDestroy() {
    this.cluster.clearMarkers();
  }

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
