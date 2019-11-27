import { Injectable, NgZone, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier';

import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { AgmMarkerSpider } from '../../directives/marker-spider';
import { MarkerSpiderInstance, SpiderOptions } from '../google-spider-types';

@Injectable()
export class SpiderManager extends MarkerManager {
  private _spiderInstance: Promise<MarkerSpiderInstance>;
  private _resolver: Function;

  constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone, @SkipSelf() protected _markerManager: MarkerManager) {
    super(_mapsWrapper, _zone);
    this._spiderInstance = new Promise<MarkerSpiderInstance>((resolver) => {
      this._resolver = resolver;
    });
  }

  get instance() {
    return this._spiderInstance;
  }

  init(options: SpiderOptions): void {
    this._mapsWrapper.getNativeMap().then(map => {
      const spider = new OverlappingMarkerSpiderfier(map as any, options);
      this._resolver(spider);
    });
  }

  addMarker(marker: AgmMarker): void {
    this._markerManager.addMarker(marker);

    const markerPromise = this._markerManager.getNativeMarker(marker);

    this._markers.set(marker, markerPromise);

    Promise.all([
      this._spiderInstance,
      markerPromise,
    ]).then(([spider, nativeMarker]) => {
      spider.addMarker(nativeMarker as any);
    });
  }

  deleteMarker(marker: AgmMarker): Promise<void> {
    return Promise.all([
      this._spiderInstance,
      this._markerManager.getNativeMarker(marker),
    ]).then(([spider, nativeMarker]) => {
      if (this._markers.has(marker)) {
        spider.removeMarker(nativeMarker as any);

        this._markers.delete(marker);

        return this._markerManager.deleteMarker(marker);
      }
    });
  }

  clearMarkers(): Promise<void> {
    return this._spiderInstance.then(spider => {
      spider.removeAllMarkers();

      const markers = Array.from(this._markers.keys());
      this._markers.clear();

      return Promise.all(markers.map(marker => this._markerManager.deleteMarker(marker))).then(() => { });
    });
  }

  setLegColors(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      if (c.legColors) {
        if (typeof c.legColors.usual === 'object') {
          Object.assign(spider.legColors.usual, c.legColors.usual);
        }

        if (typeof c.legColors.highlighted === 'object') {
          Object.assign(spider.legColors.highlighted, c.legColors.highlighted);
        }
      }
    });
  }

  setMarkersWontMove(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.markersWontMove = typeof c.markersWontMove !== 'undefined' ? c.markersWontMove : false;
    });
  }

  setMarkersWontHide(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.markersWontHide = typeof c.markersWontHide !== 'undefined' ? c.markersWontHide : false;
    });
  }

  setBasicFormatEvents(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.basicFormatEvents = typeof c.basicFormatEvents !== 'undefined' ? c.basicFormatEvents : false;
    });
  }

  setKeepSpiderfied(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.keepSpiderfied = typeof c.keepSpiderfied !== 'undefined' ? c.keepSpiderfied : false;
    });
  }

  setIgnoreMapClick(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.ignoreMapClick = typeof c.ignoreMapClick !== 'undefined' ? c.ignoreMapClick : false;
    });
  }

  setNearbyDistance(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.nearbyDistance = typeof c.nearbyDistance === 'number' ? c.nearbyDistance : 20;
    });
  }

  setCircleSpiralSwitchover(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.circleSpiralSwitchover = typeof c.circleSpiralSwitchover === 'number' ? c.circleSpiralSwitchover : 9;
    });
  }

  setCircleFootSeparation(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.circleFootSeparation = typeof c.circleSpiralSwitchover === 'number' ? c.circleFootSeparation : 23;
    });
  }

  setCircleStartAngle(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.circleStartAngle = typeof c.circleSpiralSwitchover === 'number' ? c.circleStartAngle : Math.PI / 6;
    });
  }

  setSpiralFootSeparation(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.spiralFootSeparation = typeof c.circleSpiralSwitchover === 'number' ? c.spiralFootSeparation : 26;
    });
  }

  setSpiralLengthStart(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.spiralLengthStart = typeof c.circleSpiralSwitchover === 'number' ? c.spiralLengthStart : 11;
    });
  }

  setSpiralLengthFactor(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.spiralLengthFactor = typeof c.circleSpiralSwitchover === 'number' ? c.spiralLengthFactor : 4;
    });
  }

  setLegWeight(c: AgmMarkerSpider): void {
    this._spiderInstance.then(spider => {
      spider.legWeight = typeof c.circleSpiralSwitchover === 'number' ? c.legWeight : 1;
    });
  }

  createEventObservable<T>(eventName: string, marker: AgmMarker): Observable<T> {
    // Override the default "click" event with "spider_click"
    if (eventName === 'click') {
      eventName = 'spider_click';
    }

    return super.createEventObservable(eventName, marker);
  }
}
