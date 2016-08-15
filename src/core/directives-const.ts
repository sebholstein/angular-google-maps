import {SebmGoogleMap} from './directives/google-map';
import {SebmGoogleMapCircle} from './directives/google-map-circle';
import {SebmGoogleMapInfoWindow} from './directives/google-map-info-window';
import {SebmGoogleMapMarker} from './directives/google-map-marker';
import {SebmGoogleMapPolyline} from './directives/google-map-polyline';
import {SebmGoogleMapPolylinePoint} from './directives/google-map-polyline-point';

/** @deprecated */
export const GOOGLE_MAPS_DIRECTIVES: any[] = [
  SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
  SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
];
