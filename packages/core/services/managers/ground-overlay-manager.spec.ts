import {NgZone} from '@angular/core';
import {async, inject, TestBed} from '@angular/core/testing';

import {AgmGroundOverlay} from './../../directives/ground-overlay';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {GroundOverlay, GroundOverlayOptions} from './../google-maps-types';
import {GroundOverlayManager} from './../managers/ground-overlay-manager';

describe('GroundOverlayManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        GroundOverlayManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createGroundOverlay'])
        }
      ]
    });
  });

  describe('Create a new ground overlay', () => {
    it('should call the mapsApiWrapper when creating a new ground overlay',
       inject(
           [GroundOverlayManager, GoogleMapsAPIWrapper],
           (groundOverlayManager: GroundOverlayManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newGroundOverlay = new AgmGroundOverlay(groundOverlayManager);
             newGroundOverlay.imageUrl =
                 'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
             newGroundOverlay.bounds =
                 {north: 40.773941, south: 40.712216, east: -74.12544, west: -74.22655};
             groundOverlayManager.addGroundOverlay(newGroundOverlay);

             expect(apiWrapper.createGroundOverlay)
                 .toHaveBeenCalledWith(
                     'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
                     {north: 40.773941, south: 40.712216, east: -74.12544, west: -74.22655},
                     {opacity: 1, clickable: true});
           }));
  });

  describe('Delete a ground overlay', () => {
    it('should set the map to null when deleting a existing ground overlay',
       inject(
           [GroundOverlayManager, GoogleMapsAPIWrapper],
           (groundOverlayManager: GroundOverlayManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newGroundOverlay = new AgmGroundOverlay(groundOverlayManager);
             newGroundOverlay.imageUrl =
                 'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
             newGroundOverlay.bounds =
                 {north: 40.773941, south: 40.712216, east: -74.12544, west: -74.22655};

             const groundOverlayInstance: GroundOverlay =
                 jasmine.createSpyObj('GroundOverlay', ['setMap']);
             (<any>apiWrapper.createGroundOverlay)
                 .and.returnValue(Promise.resolve(groundOverlayInstance));

             groundOverlayManager.addGroundOverlay(newGroundOverlay);
             groundOverlayManager.deleteGroundOverlay(newGroundOverlay).then(() => {
               expect(groundOverlayInstance.setMap).toHaveBeenCalledWith(null);
             });
           }));
  });

  describe('set groundOverlay opacity', () => {
    it('should update the groundOverlay opacity via setOpacity method when the groundOverlayOpacity changes',
       async(inject(
           [GroundOverlayManager, GoogleMapsAPIWrapper],
           (groundOverlayManager: GroundOverlayManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newGroundOverlay = new AgmGroundOverlay(groundOverlayManager);
             newGroundOverlay.imageUrl =
                 'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
             newGroundOverlay.bounds =
                 {north: 40.773941, south: 40.712216, east: -74.12544, west: -74.22655};

             const groundOverlayInstance: GroundOverlay =
                 jasmine.createSpyObj('GroundOverlay', ['setMap', 'setOpacity']);
             (<any>apiWrapper.createGroundOverlay)
                 .and.returnValue(Promise.resolve(groundOverlayInstance));

             groundOverlayManager.addGroundOverlay(newGroundOverlay);
             expect(apiWrapper.createGroundOverlay)
                 .toHaveBeenCalledWith(
                     'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
                     {north: 40.773941, south: 40.712216, east: -74.12544, west: -74.22655},
                     {opacity: 1, clickable: true});
             const opacity = 0.4;
             newGroundOverlay.opacity = opacity;
             var groundOverlayOptions: GroundOverlayOptions = {opacity: opacity};

             return groundOverlayManager.setOptions(newGroundOverlay, groundOverlayOptions)
                 .then(() => {
                   expect(groundOverlayInstance.setOpacity).toHaveBeenCalledWith(opacity);
                 });
           })));
  });
});
