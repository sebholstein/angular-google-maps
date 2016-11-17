import {NgZone} from '@angular/core';
import {TestBed, async, inject} from '@angular/core/testing';

import {SebmGoogleMapMarker} from './../../directives/google-map-marker';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {Marker} from './../google-maps-types';
import {MarkerManager} from './../managers/marker-manager';

describe('MarkerManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        MarkerManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
        }
      ]
    });
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
               icon: undefined,
               opacity: 1,
               visible: true,
               zIndex: 1,
               title: undefined
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
               icon: undefined,
               opacity: 1,
               visible: true,
               zIndex: 1,
               title: undefined
             });
             const iconUrl = 'http://angular-maps.com/icon.png';
             newMarker.iconUrl = iconUrl;
             return markerManager.updateIcon(newMarker).then(
                 () => { expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
           })));
  });

  describe('set marker opacity', () => {
    it('should update that marker via setOpacity method when the markerOpacity changes',
       async(inject(
           [MarkerManager, GoogleMapsAPIWrapper],
           (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new SebmGoogleMapMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';

             const markerInstance: Marker =
                 jasmine.createSpyObj('Marker', ['setMap', 'setOpacity']);
             (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: true,
               opacity: 1,
               zIndex: 1,
               title: undefined
             });
             const opacity = 0.4;
             newMarker.opacity = opacity;
             return markerManager.updateOpacity(newMarker).then(
                 () => { expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity); });
           })));
  });

  describe('set visible option', () => {
    it('should update that marker via setVisible method when the visible changes',
       async(inject(
           [MarkerManager, GoogleMapsAPIWrapper],
           (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new SebmGoogleMapMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';
             newMarker.visible = false;

             const markerInstance: Marker =
                 jasmine.createSpyObj('Marker', ['setMap', 'setVisible']);
             (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: false,
               opacity: 1,
               zIndex: 1,
               title: undefined
             });
             newMarker.visible = true;
             return markerManager.updateVisible(newMarker).then(
                 () => { expect(markerInstance.setVisible).toHaveBeenCalledWith(true); });
           })));
  });

  describe('set zIndex option', () => {
    it('should update that marker via setZIndex method when the zIndex changes',
       async(inject(
           [MarkerManager, GoogleMapsAPIWrapper],
           (markerManager: MarkerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new SebmGoogleMapMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';
             newMarker.visible = false;

             const markerInstance: Marker = jasmine.createSpyObj('Marker', ['setMap', 'setZIndex']);
             (<any>apiWrapper.createMarker).and.returnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: false,
               opacity: 1,
               zIndex: 1,
               title: undefined
             });
             const zIndex = 10;
             newMarker.zIndex = zIndex;
             return markerManager.updateZIndex(newMarker).then(
                 () => { expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex); });
           })));
  });
});
