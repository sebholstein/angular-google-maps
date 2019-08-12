import {NgZone} from '@angular/core';
import {TestBed, async, inject} from '@angular/core/testing';

import {AgmMarker, GoogleMapsAPIWrapper} from '@agm/core';
import {AgmMarkerCluster} from '../../directives/marker-cluster';
import {ClusterManager} from './cluster-manager';
import {MarkerClustererInstance} from '../google-clusterer-types';

describe('ClusterManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        ClusterManager, {
          provide: GoogleMapsAPIWrapper,
          useValue: {
            createMarker: jest.fn()
          }
        }
      ]
    });
  });

  describe('Create a new marker', () => {
    it('should call the mapsApiWrapper when creating a new marker',
       inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (clusterManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(clusterManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';
             clusterManager.addMarker(newMarker);

             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               opacity: 1,
               visible: true,
               zIndex: 1,
               title: undefined,
               clickable: true
             }, false);
           }));
  });

  describe('Delete a marker', () => {
    it('should set the map to null when deleting a existing marker',
       inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (clusterManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(clusterManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';

             const markerInstance: any = {
              setMap: jest.fn(),
             };
             (<jest.Mock>apiWrapper.createMarker).mockReturnValue(Promise.resolve(markerInstance));

             clusterManager.addMarker(newMarker);
             clusterManager.deleteMarker(newMarker).then(
                 () => { expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
           }));
  });

  describe('set marker icon', () => {
    it('should update that marker via setIcon method when the markerUrl changes',
       async(inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (markerManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';

             const markerInstance: any = {
              setMap: jest.fn(),
              setIcon: jest.fn()
             };
             (<jest.Mock>apiWrapper.createMarker).mockReturnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               opacity: 1,
               visible: true,
               zIndex: 1,
               title: undefined,
               clickable: true
             }, false);
             const iconUrl = 'http://angular-maps.com/icon.png';
             newMarker.iconUrl = iconUrl;
             return markerManager.updateIcon(newMarker).then(
                 () => { expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
           })));
  });

  describe('set marker opacity', () => {
    it('should update that marker via setOpacity method when the markerOpacity changes',
       async(inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (markerManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';

             const markerInstance: any = {
              setMap: jest.fn(),
              setOpacity: jest.fn()
             };
             (<jest.Mock>apiWrapper.createMarker).mockReturnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: true,
               opacity: 1,
               zIndex: 1,
               title: undefined,
               clickable: true
             }, false);
             const opacity = 0.4;
             newMarker.opacity = opacity;
             return markerManager.updateOpacity(newMarker).then(
                 () => { expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity); });
           })));
  });

  describe('set visible option', () => {
    it('should update that marker via setVisible method when the visible changes',
       async(inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (markerManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';
             newMarker.visible = false;

             const markerInstance: any = {
               setMap: jest.fn(),
               setVisible: jest.fn()
             };
             (<jest.Mock>apiWrapper.createMarker).mockReturnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: false,
               opacity: 1,
               zIndex: 1,
               title: undefined,
               clickable: true
             }, false);
             newMarker.visible = true;
             return markerManager.updateVisible(newMarker).then(
                 () => { expect(markerInstance.setVisible).toHaveBeenCalledWith(true); });
           })));
  });

  describe('set zIndex option', () => {
    it('should update that marker via setZIndex method when the zIndex changes',
       async(inject(
           [ClusterManager, GoogleMapsAPIWrapper],
           (markerManager: ClusterManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newMarker = new AgmMarker(markerManager);
             newMarker.latitude = 34.4;
             newMarker.longitude = 22.3;
             newMarker.label = 'A';
             newMarker.visible = false;

             const markerInstance = {
               setMap: jest.fn(),
               setZIndex: jest.fn()
             };
             (<jest.Mock>apiWrapper.createMarker).mockReturnValue(Promise.resolve(markerInstance));

             markerManager.addMarker(newMarker);
             expect(apiWrapper.createMarker).toHaveBeenCalledWith({
               position: {lat: 34.4, lng: 22.3},
               label: 'A',
               draggable: false,
               icon: undefined,
               visible: false,
               opacity: 1,
               zIndex: 1,
               title: undefined,
               clickable: true
             }, false);
             const zIndex = 10;
             newMarker.zIndex = zIndex;
             return markerManager.updateZIndex(newMarker).then(
                 () => { expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex); });
           })));
  });

  describe('set calculator', () => {
    it('should call the setCalculator method when the calculator changes and is a function',
      inject(
        [ClusterManager],
        async (markerManager: ClusterManager) => {

          const mockClusterer: Partial<MarkerClustererInstance> = { setCalculator: jest.fn() };
          const instancePromise = Promise.resolve(mockClusterer as MarkerClustererInstance);

          const spy = jest.spyOn(markerManager, 'getClustererInstance')
                          .mockImplementation(() => instancePromise);

          const markerCluster: Partial<AgmMarkerCluster> = {};

          // negative case
          markerCluster.calculator = null;
          markerManager.setCalculator(markerCluster as AgmMarkerCluster);
          await instancePromise;
          expect(mockClusterer.setCalculator).not.toHaveBeenCalled();

          // positive case
          markerCluster.calculator = jest.fn();
          markerManager.setCalculator(markerCluster as AgmMarkerCluster);
          await instancePromise;
          expect(mockClusterer.setCalculator).toHaveBeenCalledTimes(1);

          spy.mockReset();
        }));
  });
});
