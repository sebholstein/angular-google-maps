import {Injectable, Observable} from 'angular2/angular2';
import {Observer} from 'rxjs/Observer';
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

  updateLabel(marker: SebmGoogleMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: google.maps.Marker) => {
      const label = m.getLabel();
      label.text = marker.label;
      m.setLabel(label);
    });
  }

  addMarker(marker: SebmGoogleMapMarker) {
    const markerPromise = this._mapsWrapper.createMarker(
        {position: {lat: marker.latitude, lng: marker.longitude}, label: marker.label});
    this._markers.set(marker, markerPromise);
  }

  createClickObserable(marker: SebmGoogleMapMarker): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
      this._markers.get(marker).then(
          (m: google.maps.Marker) => { m.addListener('click', () => { observer.next(null); }); });
    });
  }
}
