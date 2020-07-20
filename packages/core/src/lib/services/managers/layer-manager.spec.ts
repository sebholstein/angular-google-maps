import { NgZone } from '@angular/core';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { AgmBicyclingLayer } from '../../directives/bicycling-layer';
import { AgmTransitLayer } from '../../directives/transit-layer';
import { GoogleMapsAPIWrapper } from '../../services/google-maps-api-wrapper';
import { LayerManager } from './layer-manager';

describe('LayerManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgZone, useFactory: () => new NgZone({ enableLongStackTrace: true }) },
        {
          provide: GoogleMapsAPIWrapper,
          useValue: {
            getNativeMap: () => Promise.resolve(),
            createTransitLayer: jest.fn(),
            createBicyclingLayer: jest.fn(),

          },
        },
        LayerManager,

      ],
    });
  }); // end beforeEach

  describe('Create a new transit layer', () => {

    it('should call mapsApiWrapper when creating a new transit layer',
      fakeAsync(inject(
        [LayerManager, GoogleMapsAPIWrapper],
        (layerManager: LayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const transitLayer = new AgmTransitLayer(layerManager);
          layerManager.addTransitLayer(transitLayer);
          expect(apiWrapper.createTransitLayer).toHaveBeenCalled();
        }),
      ),
    );
  });

  describe('Create a new bicycling layer', () => {

    it('should call mapsApiWrapper when creating a new bicycling layer',
      fakeAsync(inject(
        [LayerManager, GoogleMapsAPIWrapper],
        (layerManager: LayerManager, apiWrapper: GoogleMapsAPIWrapper) => {
          const bicyclingLayer = new AgmBicyclingLayer(layerManager);
          layerManager.addBicyclingLayer(bicyclingLayer);
          expect(apiWrapper.createBicyclingLayer).toHaveBeenCalled();
        }),
      ),
    );
  });

});
