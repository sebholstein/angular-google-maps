import {NgZone} from '@angular/core';
import {addProviders, async, describe, inject, it} from '@angular/core/testing';

import {SebmGoogleMapMarker} from '../../../src/core/directives/google-map-marker';
import {GoogleMapsAPIWrapper} from '../../../src/core/services/google-maps-api-wrapper';
import {Marker} from '../../../src/core/services/google-maps-types';
import {MarkerManager} from '../../../src/core/services/managers/marker-manager';

export function main() {
  describe('MarkerManager', () => {
    beforeEach(() => {
      addProviders([
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        MarkerManager, SebmGoogleMapMarker, {
          provide: GoogleMapsAPIWrapper,
          useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
        }
      ]);
    });

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

               expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                 position: {lat: 34.4, lng: 22.3},
                 label: 'A',
                 draggable: false,
                 icon: undefined
               });
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

               const markerInstance: Marker = jasmine.createSpyObj('Marker', ['setMap']);
               (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

               markerManager.addMarker(newMarker);
               markerManager.deleteMarker(newMarker).then(
                   () => { expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
             }));
    });

    describe('set marker icon', () => {
      it('should update that marker via setIcon method when the markerUrl changes',
         async(inject(
             [MarkerManager, GoogleMapsAPIWrapper],
             (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
               const newMarker = new SebmGoogleMapMarker(markerManager);
               newMarker.latitude = 34.4;
               newMarker.longitude = 22.3;
               newMarker.label = 'A';

               const markerInstance: Marker = jasmine.createSpyObj('Marker', ['setMap', 'setIcon']);
               (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

               markerManager.addMarker(newMarker);
               expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                 position: {lat: 34.4, lng: 22.3},
                 label: 'A',
                 draggable: false,
                 icon: undefined
               });
               const iconUrl = 'http://angular-maps.com/icon.png';
               newMarker.iconUrl = iconUrl;
               return markerManager.updateIcon(newMarker).then(
                   () => { expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
             })));
    });
  });
}
