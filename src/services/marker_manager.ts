import {Injectable} from 'angular2/angular2';
import {SebmGoogleMapMarker} from '../components/google_map_marker';
import {GoogleMapsAPIWrapper} from './google_maps_api_wrapper';

@Injectable()
export class MarkerManager {
  private _markers: Map<SebmGoogleMapMarker, Promise<google.maps.Marker>> =
      new Map<SebmGoogleMapMarker, Promise<google.maps.Marker>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper) {}

  deleteMarker(marker: SebmGoogleMapMarker): Promise<void> {
    let promise = this._markers.get(marker).then((m: google.maps.Marker) => m.setMap(null));
    this._markers.delete(marker);
    return promise;
  }

  updateMarkerPosition(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then(
        (m: google.maps.Marker) => m.setPosition({lat: marker.latitude, lng: marker.longitude}));
  }

  updateTitle(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => m.setTitle(marker.title));
  }

  addMarker(marker: SebmGoogleMapMarker) {
    const markerPromise =
        this._mapsWrapper.createMarker({position: {lat: marker.latitude, lng: marker.longitude}});
    this._markers.set(marker, markerPromise);
  }
}
