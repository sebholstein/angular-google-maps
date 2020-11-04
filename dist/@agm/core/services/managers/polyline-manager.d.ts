import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AgmPolyline, PathEvent } from '../../directives/polyline';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { LatLng } from '../google-maps-types';
export declare class PolylineManager {
    private _mapsWrapper;
    private _zone;
    private _polylines;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    private static _convertPoints;
    private static _convertPath;
    private static _convertIcons;
    addPolyline(line: AgmPolyline): void;
    updatePolylinePoints(line: AgmPolyline): Promise<void>;
    updateIconSequences(line: AgmPolyline): Promise<void>;
    setPolylineOptions(line: AgmPolyline, options: {
        [propName: string]: any;
    }): Promise<void>;
    deletePolyline(line: AgmPolyline): Promise<void>;
    private getMVCPath;
    getPath(agmPolyline: AgmPolyline): Promise<Array<LatLng>>;
    createEventObservable<T>(eventName: string, line: AgmPolyline): Observable<T>;
    createPathEventObservable(line: AgmPolyline): Promise<Observable<PathEvent>>;
}
