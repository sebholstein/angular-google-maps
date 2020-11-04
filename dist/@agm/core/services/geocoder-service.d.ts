import { Observable } from 'rxjs';
import { Geocoder, GeocoderRequest, GeocoderResult } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
export declare class AgmGeocoder {
    protected readonly geocoder$: Observable<Geocoder>;
    constructor(loader: MapsAPILoader);
    geocode(request: GeocoderRequest): Observable<GeocoderResult[]>;
    private _getGoogleResults;
    private _createGeocoder;
}
