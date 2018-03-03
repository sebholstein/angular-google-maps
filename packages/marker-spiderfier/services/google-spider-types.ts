import {LegColorOptions, SpiderOptions} from 'ts-overlapping-marker-spiderfier';
import {Marker} from '@agm/core/services/google-maps-types';

export interface MarkerSpiderInstance extends SpiderOptions {
  legColors: LegColorOptions;
  new(map: google.maps.Map, options: SpiderOptions): MarkerSpiderInstance;
  trackMarker(marker: google.maps.Marker, listener?: Function): MarkerSpiderInstance;
  addMarker(marker: google.maps.Marker, listener?: Function): MarkerSpiderInstance;
  forgetMarker(marker: google.maps.Marker): MarkerSpiderInstance;
  removeMarker(marker: google.maps.Marker): MarkerSpiderInstance;
  forgetAllMarkers(): MarkerSpiderInstance;
  removeAllMarkers(): MarkerSpiderInstance;
  getMarkers(): google.maps.Marker[];
  addListener(event: 'click' | 'format' | 'spiderfy' | 'unspiderfy', listener: Function): MarkerSpiderInstance;
  removeListener(event: 'click' | 'format' | 'spiderfy' | 'unspiderfy', listener: Function): MarkerSpiderInstance;
  clearListeners(event: 'click' | 'format' | 'spiderfy' | 'unspiderfy'): MarkerSpiderInstance;
  unspiderfy(): MarkerSpiderInstance;
  markersNearMarker(marker: google.maps.Marker, firstOnly?: boolean): google.maps.Marker[];
  markersNearAnyOtherMarker(): google.maps.Marker[];
}

export interface FormatEvent {
  marker: Marker;
  status: string;
}

export interface SpiderfyEvent {
  changedMarkers: Marker[];
  unchangedMarkers: Marker[];
}

export {SpiderOptions, LegColorOptions} from 'ts-overlapping-marker-spiderfier';
