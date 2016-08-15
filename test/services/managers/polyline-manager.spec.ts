import {NgZone} from '@angular/core';
import {addProviders, inject} from '@angular/core/testing';

import {SebmGoogleMapPolyline} from '../../../src/core/directives/google-map-polyline';
import {GoogleMapsAPIWrapper} from '../../../src/core/services/google-maps-api-wrapper';
import {Polyline} from '../../../src/core/services/google-maps-types';
import {PolylineManager} from '../../../src/core/services/managers/polyline-manager';

export function main() {
  describe('PolylineManager', () => {
    beforeEach(() => {
      addProviders([
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        PolylineManager, SebmGoogleMapPolyline, {
          provide: GoogleMapsAPIWrapper,
          useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createPolyline'])
        }
      ]);
    });

    describe('Create a new polyline', () => {
      it('should call the mapsApiWrapper when creating a new polyline',
         inject(
             [PolylineManager, GoogleMapsAPIWrapper],
             (polylineManager: PolylineManager, apiWrapper: GoogleMapsAPIWrapper) => {
               const newPolyline = new SebmGoogleMapPolyline(polylineManager);
               polylineManager.addPolyline(newPolyline);

               expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
                 clickable: true,
                 draggable: false,
                 editable: false,
                 geodesic: false,
                 strokeColor: undefined,
                 strokeOpacity: undefined,
                 strokeWeight: undefined,
                 visible: true,
                 zIndex: undefined,
                 path: []
               });
             }));
    });

    describe('Delete a polyline', () => {
      it('should set the map to null when deleting a existing polyline',
         inject(
             [PolylineManager, GoogleMapsAPIWrapper],
             (polylineManager: PolylineManager, apiWrapper: GoogleMapsAPIWrapper) => {
               const newPolyline = new SebmGoogleMapPolyline(polylineManager);

               const polylineInstance: Polyline = jasmine.createSpyObj('Polyline', ['setMap']);
               (<any>apiWrapper.createPolyline).and.returnValue(Promise.resolve(polylineInstance));

               polylineManager.addPolyline(newPolyline);
               polylineManager.deletePolyline(newPolyline).then(() => {
                 expect(polylineInstance.setMap).toHaveBeenCalledWith(null);
               });
             }));
    });
  });
}
