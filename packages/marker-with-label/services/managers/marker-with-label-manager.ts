import { Injectable, NgZone } from '@angular/core';
import { MarkerManager } from '../../../core/services/managers/marker-manager';
import { Marker } from '../../../core/services/google-maps-types';
import { AgmMarkerWithLabel } from '../../directives/marker-with-label';
import { MarkerWithLabel } from '../google-marker-with-label-types';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { Observable, Observer } from 'rxjs';

declare var require: any;
declare var google: any;

@Injectable()
export class MarkerWithLabelManager extends MarkerManager {

    private _markerInstance: Promise<any>;
    constructor(protected _mapsWrapper: GoogleMapsAPIWrapper, protected _zone: NgZone) {
        super(_mapsWrapper, _zone);
        this._markerInstance = new Promise<any>((resolver) => {
            this._mapsWrapper.getNativeMap().then(map => {
                const markerWithLabel = require('markerwithlabel')(google.maps);
                resolver({ markerWithLabel, map });
            });
        });
    }

    addMarker(marker: AgmMarkerWithLabel): void {
        const markerPromise = this._markerInstance.then(({ markerWithLabel, map }) => {
            const newMarker: MarkerWithLabel = new markerWithLabel({
                position: { lat: marker.latitude, lng: marker.longitude },
                labelContent: marker.labelContent,
                labelClass: marker.labelClass,
                labelAnchor: marker.labelAnchor,
                labelInBackground: marker.labelInBackground,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
                map: map,
                animation: (typeof marker.animation === 'string') ? google.maps.Animation[marker.animation] : marker.animation
            });

            return newMarker;
        });

        this._markers.set(marker, markerPromise);
    }

    updateLabelContent(marker: AgmMarkerWithLabel): Promise<void> {
        return this._markers.get(marker).then((m: MarkerWithLabel) => { m.setOptions({ labelContent: marker.labelContent }); });
    }

    updateLabelClass(marker: AgmMarkerWithLabel): Promise<void> {
        return this._markers.get(marker).then((m: MarkerWithLabel) => { m.setOptions({ labelClass: marker.labelClass }); });
    }

    createEventObservable<T>(eventName: string, marker: AgmMarkerWithLabel): Observable<T> {
        return new Observable((observer: Observer<T>) => {
          this._markers.get(marker).then((m: MarkerWithLabel) => {
            google.maps.event.addListener(m, eventName, (e: T) => {
                (<any>e).latLng = m.getPosition();
                this._zone.run(() => observer.next(e));
            });
          });
        });
      }
}
