import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AgmPolygon, PolygonPathEvent } from '../../directives/polygon';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { LatLng } from '../google-maps-types';
export declare class PolygonManager {
    private _mapsWrapper;
    private _zone;
    private _polygons;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    addPolygon(path: AgmPolygon): void;
    updatePolygon(polygon: AgmPolygon): Promise<void>;
    setPolygonOptions(path: AgmPolygon, options: {
        [propName: string]: any;
    }): Promise<void>;
    deletePolygon(paths: AgmPolygon): Promise<void>;
    getPath(polygon: AgmPolygon): Promise<Array<LatLng>>;
    getPaths(polygon: AgmPolygon): Promise<Array<Array<LatLng>>>;
    createEventObservable<T>(eventName: string, path: AgmPolygon): Observable<T>;
    createPathEventObservable(agmPolygon: AgmPolygon): Promise<Observable<PolygonPathEvent<any>>>;
}
