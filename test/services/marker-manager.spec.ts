import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {provide, NgZone} from 'angular2/core';

import {MarkerManager} from '../../src/services/marker-manager';
import {GoogleMapsAPIWrapper} from '../../src/services/google-maps-api-wrapper';
import {SebmGoogleMapMarker} from '../../src/directives/google-map-marker';

export function main() {
  describe('MarkerManager', () => {
    beforeEachProviders(() => [
      provide(NgZone, {useFactory: () => new NgZone({enableLongStackTrace: true})}),
      MarkerManager,
      SebmGoogleMapMarker,
      provide(
          GoogleMapsAPIWrapper,
          {useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])})
    ]);

    describe('Create a new marker', () => {
      it('should call the mapsApiWrapper when creating a new marker',
         inject(
             [MarkerManager, GoogleMapsAPIWrapper],
             (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
               const newMarker = new SebmGoogleMapMarker(markerManager);
               newMarker.latitude = 34.4;
               newMarker.longitude = 22.3;
               newMarker.label = 'A';
               markerManager.addMarker(newMarker);

               expect(apiWrapper.createMarker)
                   .toHaveBeenCalledWith({position: {lat: 34.4, lng: 22.3}, label: 'A', draggable: false});
             }));
    });

    describe('Delete a marker', () => {
      it('should set the map to null when deleting a existing marker',
         inject(
             [MarkerManager, GoogleMapsAPIWrapper],
             (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
               const newMarker = new SebmGoogleMapMarker(markerManager);
               newMarker.latitude = 34.4;
               newMarker.longitude = 22.3;
               newMarker.label = 'A';

               const markerInstance = jasmine.createSpyObj('Marker', ['setMap']);
               (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

               markerManager.addMarker(newMarker);
               markerManager.deleteMarker(newMarker)
                   .then(() => { expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
             }));
    });
  });
}
