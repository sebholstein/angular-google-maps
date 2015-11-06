import {Injectable} from 'angular2/angular2';
import {SebmGoogleMapMarker} from '../components/google_map_marker';
import {GoogleMapsAPIWrapperFactory, GoogleMapsAPIWrapper} from './google_maps_api_wrapper';

@Injectable()
export class MarkerManager {
  private _markers: Map<SebmGoogleMapMarker, google.maps.Marker> =
      new Map<SebmGoogleMapMarker, google.maps.Marker>();
  private _mapsAPI: GoogleMapsAPIWrapper;

  constructor(f: GoogleMapsAPIWrapperFactory) { this._mapsAPI = f.getInstance(); }

  deleteMarker(marker: SebmGoogleMapMarker) {
    console.log(this._markers.values());
    this._markers.get(marker).setMap(null);
    this._markers.delete(marker);
  }

  updateMarkerPosition(marker: SebmGoogleMapMarker) {
    this._markers.get(marker).setPosition({lat: marker.latitude, lng: marker.longitude});
  }

  updateTitle(marker: SebmGoogleMapMarker) { this._markers.get(marker).setTitle(marker.title); }

  addMarker(marker: SebmGoogleMapMarker) {
    let newMarker: google.maps.Marker =
        this._mapsAPI.createMarker({position: {lat: marker.latitude, lng: marker.longitude}});
    this._markers.set(marker, newMarker);
  }
}
