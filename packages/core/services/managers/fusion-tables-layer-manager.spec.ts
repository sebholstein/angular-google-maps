import {NgZone} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

import {AgmFusionTablesLayer} from './../../directives/fusion-tables-layer';
import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';
import {FusionTablesLayerManager} from './../managers/fusion-tables-layer-manager';

describe('FusionTablesLayerManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgZone, useFactory: () => new NgZone({enableLongStackTrace: true})},
        FusionTablesLayerManager,
        {provide: GoogleMapsAPIWrapper, useValue: {createFusionTablesLayer: jest.fn()}}
      ]
    });
  });

  describe('Create a fusion table layer', () => {
    it('should call the mapsApiWrapper when creating a new fusion tables layer',
       inject(
           [FusionTablesLayerManager, GoogleMapsAPIWrapper],
           (manager: FusionTablesLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newLayer = new AgmFusionTablesLayer(manager);
             newLayer.options = {
               query: {
                 select: 'geometry',
                 from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
               },
             };
             manager.addFusionTablesLayer(newLayer);

             expect(apiWrapper.createFusionTablesLayer).toHaveBeenCalledWith({
               query: {
                 select: 'geometry',
                 from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
               },
             });
           }));
  });

  describe('Delete a fusion table layer', () => {
    it('should set the map to null when deleting an existing layer',
       inject(
           [FusionTablesLayerManager, GoogleMapsAPIWrapper],
           (manager: FusionTablesLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newLayer = new AgmFusionTablesLayer(manager);
             newLayer.options = {
               query: {
                 from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
               },
               styles: [
                 {polygonOptions: {fillColor: '#00FF00', fillOpacity: 0.3}},
               ],
             };
             const layerInstance: any = {setMap: jest.fn()};
             (<jest.Mock>apiWrapper.createFusionTablesLayer)
                 .mockReturnValue(Promise.resolve(layerInstance));

             manager.addFusionTablesLayer(newLayer);
             manager.deleteFusionTablesLayer(newLayer).then(() => {
               expect(layerInstance.setMap).toHaveBeenCalledWith(null);
             });
           }));
  });

  describe('Updates options for an existing fusion table layer', () => {
    it('should setOptions on the layer',
       inject(
           [FusionTablesLayerManager, GoogleMapsAPIWrapper],
           (manager: FusionTablesLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newLayer = new AgmFusionTablesLayer(manager);
             newLayer.options = {
               query: {
                 from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
               },
             };
             const layerInstance: any = {setOptions: jest.fn()};
             (<jest.Mock>apiWrapper.createFusionTablesLayer)
                 .mockReturnValue(Promise.resolve(layerInstance));

             manager.addFusionTablesLayer(newLayer);
             manager
                 .updateFusionTablesLayerOptions(newLayer, {
                   query: {from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ'},
                   styles: [
                     {polygonOptions: {fillColor: '#00FF00', fillOpacity: 0.3}},
                   ],
                 })
                 .then(() => {
                   expect(layerInstance.setOptions).toHaveBeenCalledWith({
                     query: {from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ'},
                     styles: [
                       {polygonOptions: {fillColor: '#00FF00', fillOpacity: 0.3}},
                     ],
                   });
                 });
           }));
  });

  describe('Create event listener for a layer', () => {
    it('should add a listener on the layer',
       inject(
           [FusionTablesLayerManager, GoogleMapsAPIWrapper],
           (manager: FusionTablesLayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
             const newLayer = new AgmFusionTablesLayer(manager);
             newLayer.options = {
               query: {
                 from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
               },
             };
             const layerInstance: any = {addListener: jest.fn()};
             (<jest.Mock>apiWrapper.createFusionTablesLayer)
                 .mockReturnValue(Promise.resolve(layerInstance));

             manager.addFusionTablesLayer(newLayer);
             manager.createEventObservable('click', newLayer).subscribe(() => {
               expect(layerInstance.addListener).toBeCalledWith('click');
             });
           }));
  });
});
